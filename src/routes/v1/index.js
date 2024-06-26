const express = require('express');

const userRoutes = require('../../controllers/user-controller');
const {AuthRequestValidator} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',
    AuthRequestValidator.validateUserAuth,
     userRoutes.create
    );
router.post('/signin',
    AuthRequestValidator.validateUserAuth,
    userRoutes.signIn);
module.exports = router;

