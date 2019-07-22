const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const rentalRoutes = require('./routes/rentals');
userRoutes = require('./routes/users');
bookingRoutes = require('./routes/bookings');
paymentRoutes = require('./routes/payments');
reviewRoutes = require('./routes/review');
imageUploadRoutes = require('./routes/image-upload');

mongoose.connect(config.DB_URI, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Mongodb is connected!');
})

mongoose.connection.on('error', () => {
    console.log('Mongodb is not connected!');
})

const app = new express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/imageUpload', imageUploadRoutes);

const PORT = 3002;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})