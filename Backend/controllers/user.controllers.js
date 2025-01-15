const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");

module.exports.registerUser = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure user data from request body
        const { fullname, email, password } = req.body;

        if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new user with the plain password (password will be hashed in the model)
        const user = new UserModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,  // Plain password, hashing is handled in the model
        });

        // Save the user to the database
        await user.save();

        // Generate auth token
        const token = user.generateAuthToken();

        // Send the response
        res.status(201).json({ user, token });
    } catch (err) {
        // Handle any unexpected errors
        next(err);
    }
};
