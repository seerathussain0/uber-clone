const express = require('express');
const { registerUser } = require('../controllers/user.controllers');
const { body } = require('express-validator');

const router = express.Router();

// Define validation rules
router.post(
    '/register',
    [
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    registerUser
);

module.exports = router;
