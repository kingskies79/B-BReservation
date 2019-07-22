const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    startAt: { type: Date, required: 'Starting data is required' },
    endAt: { type: Date, required: 'Ending date is required' },
    totalPrice: Number,
    guests: Number,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
    review: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = mongoose.model('Booking', bookingSchema);