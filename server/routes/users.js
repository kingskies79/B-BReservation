const express = require('express');
const User = require('../controllers/user');
const route = express.Router();



route.get('/:id', User.authMiddleware, User.getUser);

route.post('/auth', User.auth);

route.post('/register', User.register);

module.exports = route;