const express = require('express');
const route = express.Router();
const UserCtrl = require('../controllers/user');
const BookingCtrl = require('../controllers/booking');


route.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);

route.get('/manage', UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = route;