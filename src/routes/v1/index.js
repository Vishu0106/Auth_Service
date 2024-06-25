const express = require('express');

const userRoutes = require('../../controllers/user-controller');

const router = express.Router();

router.post('/signup', userRoutes.create);

module.exports = router;

