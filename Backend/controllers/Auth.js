const bcrypt = require('bcrypt');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User"); // Import the User model
const OTP = require("../models/OTP"); // 


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            confirmPassword,
            location,
            otp
        } = req.body;

        // Check if all required fields are filled
        if (!userName || !email || !password || !confirmPassword || !location) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Image upload (Cloudinary)
        const image = req.files.Profilepic;
        let imageUrl = '';

        if (image) {
            imageUrl = await uploadImageToCloudinary(image, "Recipes");
            if (!imageUrl) {
                return res.status(400).json({ message: 'Error uploading image' });
            }
        }

        // Check OTP validation
        const otpResponse = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (otpResponse.length === 0 || otp !== otpResponse[0].otp) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            userName: userName,
            email: email,
            ProfilePic: imageUrl.secure_url,
            password: hashedPassword,
            location: location,
            bio: null,
            contactNumber: null,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error('Error during signup:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.login = async (req, res) => {

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if all required fields are filled
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Find user with provided email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User is not registered with us. Please sign up to continue.",
                });
            }

            // Compare the password with bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password",
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { email: user.email, id: user._id, role: user.role },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            );

            // Remove the password from the user object before returning
            user.password = undefined;

            // Set the cookie and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
                token,
                role: user.role,
            });

        } catch (error) {
            console.error('Error during login:', error.message);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

}
