const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ALLOWED_RATINGS = [1, 2, 3, 4, 5];

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental' }
});

module.exports = mongoose.model('Review', reviewSchema);

reviewSchema.pre('save', (next) => {
    if (ALLOWED_RATINGS.indexOf(this.rating) >= 0) {
        next();
    } else {
        const err = new Error({ raiting: 'Invalid Raiting' });
        err.errors = {};
        err.errors.raiting = { message: 'This raiting is not allowed!' }
        next(err);
    }
})