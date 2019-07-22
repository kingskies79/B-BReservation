const express = require('express');
const route = express.Router();

const Rental = require('../models/rental');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');

const userCtrl = require('../controllers/user');

route.get('/secret', userCtrl.authMiddleware, (req, res) => {
    res.json({ 'secret': true });
});


route.get('/manage', userCtrl.authMiddleware, (req, res) => {
    const user = res.locals.user;
    Rental
        .where({ user })
        .populate('bookings')
        .exec(function(err, foundRentals) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } else {
                return res.json(foundRentals);
            }
        });

})

route.get('/:id/verify-user', userCtrl.authMiddleware, function(req, res) {
    const user = res.locals.user;

    Rental
        .findById(req.params.id)
        .populate('user')
        .exec(function(err, foundRental) {
            if (err) {
                return res.status(422).send({ errros: normalizeErrors(err.errors) });
            }
            if (foundRental.user.id != user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: ' You are not rental owner' }] });
            }
            return res.json({ status: 'verified' });
        });
});

route.get('/:id', function(req, res) {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental) {

            if (err || !foundRental) {
                return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }

            return res.json(foundRental);
        });
});
route.post('/:id', userCtrl.authMiddleware, function(req, res) {

    const rentalData = req.body;
    const user = res.locals.user;
    console.log('patch');

    Rental
        .findById(req.params.id)
        .populate('user')
        .exec(function(err, foundRental) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (foundRental.user.id !== user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not rental owner!' }] });
            }

            foundRental.set(rentalData);
            foundRental.save(function(err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.status(200).send(foundRental);
            });
        });
});


route.delete('/:id', userCtrl.authMiddleware, function(req, res) {
    const rentalId = req.params.id;
    const user = user.locals.user;

    Rental
        .findById(rentalId)
        .populate('user')
        .exec((err, foundRental) => {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (foundRental.user.id != user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User', detail: ' You are not rental owner' }] });
            }
            if (foundRental.bookings.length > 0) {
                return res.status(422).send({ errors: [{ title: 'Active Booking!', detail: 'Cannot detail rental with active bookings!' }] });
            }
            foundRental.remove((err) => {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                User.update({ _id: foundRental.user.id }, { $pull: { rentals: foundRental._id } }, () => {});
                return res.json({ 'status': 'deleted' });

            })
        })
});

route.post('', userCtrl.authMiddleware, function(req, res) {
    const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental = new Rental({ title, city, street, category, image, shared, bedrooms, description, dailyRate });
    rental.user = user;
    console.log('rental ' + rental);
    Rental.create(rental, function(err, newRental) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function() {});

        return res.json(newRental);
    });
});

route.get('', function(req, res) {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};

    Rental.find(query)
        .select('-bookings')
        .exec(function(err, foundRentals) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (city && foundRentals.length === 0) {
                return res.status(422).send({ errors: [{ title: 'No Rentals Found!', detail: `There are no rentals for city ${city}` }] });
            }

            return res.json(foundRentals);
        });
});

module.exports = route;