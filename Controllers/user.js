import bcrypt from 'bcryptjs';
import { User } from '../Models/User.js';
import jwt from 'jsonwebtoken';

// User Registration Controller
export const userRegisterController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const isExists = await User.findOne({ email });
    if (isExists) {
        return res.status(400).json({ message: 'User already exists', success: false, user: req.body.email, error: 'User already exists', isExists: true });
    }
    try {
        // Hash the password before saving //? library bcryptjs
        // Note: bcrypt.hash method is used to hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword; // Store the hashed password in the request body
        // Create a new user
        let user = await User.create(req.body);
        return res.status(201).json({ message: 'User registered successfully', success: true, user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
    }

}

// User Login Controller
export const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // 2. Check if user exists
        const isExists = await User.findOne({ email });
        if (!isExists) {
            return res.status(400).json({
                message: 'Invalid credentials',
                success: false,
            });
        }

        // 3. Compare password //?library bcryptjs
        // Note: The password in the database is hashed, so we need to compare the plain text password with the hashed password
        // using bcrypt.compare method.
        const isMatch = await bcrypt.compare(password, isExists.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials',
                success: false
            });
        }

        // 4. Generate JWT token //? library jsonwebtoken
        // Note: The JWT_SECRET is a secret key used to sign the token. It should be kept secret and not exposed in the code.
        // Note: The token is set to expire in 1 day (24 hours). if you want to change the expiration time from 1 day to 1 hour, you can change the expiresIn value to '1h'
        const token = jwt.sign({ id: isExists._id },process.env.JWT_SECRET, { expiresIn: '1d' });

        // 5. set cookie with token
        // Note: The token is set as a cookie in the response. The cookie is set to expire in 1 day (24 hours).
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production //? this ensures that the cookie is only sent over HTTPS
            // comman values:- 'development', 'production', 'test'
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day)
        });

        // 6 Success response
        return res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            user: {
                name: isExists.name,
                email: isExists.email,
            },
            token, // Include the generated token in the response
        });


    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error.message,
        });
    }
};
