const User = require('../models/user');
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const Payment = require('../models/payment');

const { normalizeError } = require('../helpers/mongoose');

const config = require('../config');
const stripe = require('stripe')(config.STRIPE_SK);

exports.getPendingPayments = function(req, res) {
    const user = res.locals.user;

    Payment
        .where({ toUser: user })
        .populate({
            path: 'booking',
            populate: { path: 'rental' }
        })
        .populate('fromUser')
        .exec((err, foundPayment) => {
            if (err) {
                return res.status(422).send({ errors: normalizeError(err.errors) });
            }
            return res.json(foundPayment);
        })
}

exports.confirmPayment = function(req, res) {
    const payment = req.body;
    const user = res.locals.user;

    debugger;
    Payment.findById(payment._id)
        .populate('toUser')
        .populate('booking')
        .exec(async function(err, foundPayment) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (foundPayment.status === 'pending' && user.id === foundPayment.toUser.id) {

                const booking = foundPayment.booking;
                console.log('booking ' + booking);
                try {
                    var charge = await stripe.charges.create({

                        amount: booking.totalPrice * 100,
                        currency: 'eur',
                        customer: payment.fromStripeCustomerId
                    })
                } catch (e) {
                    console.log('err' + e);
                }
                if (charge) {
                    Booking.update({ _id: booking }, { status: 'active' }, function() {});

                    foundPayment.charge = charge;
                    foundPayment.status = 'paid';

                    foundPayment.save(function(err) {
                        if (err) {
                            return res.status(422).send({ errors: normalizeErrors(err.errors) });
                        }


                        User.update({ _id: foundPayment.toUser }, { $inc: { revenue: foundPayment.amount } }, function(err, user) {
                            if (err) {
                                return res.status(422).send({ errors: normalizeErrors(err.errors) });
                            }

                            return res.json({ status: 'paid' });
                        })
                    })
                }
            }
        });
}


exports.declinePayment = function(req, res) {
    const payment = req.body;
    console.log('payment' + payment);
    const { booking } = payment;

    Booking.deleteOne({ _id: booking._id }, (err, deleteBooking) => {
        if (err) {
            return res.status(422).send({ errors: normalizeError(err.erros) });
        }
        Payment.update({ _id: payment._id }, { status: 'declined' }, function() {});
        Rental.update({ _id: booking.rental._id }, { $pull: { bookings: booking._id } }, () => {});
    })
    return res.json({ status: 'deleted' });

}