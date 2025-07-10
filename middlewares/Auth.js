import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
export const isAuthenticated = async(req, res, next) => {
    const token = req.header("Auth")
    // console.log("Token:", token);
    if (!token) {
        return res.status(401).json({ message: "Please login first" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        // console.log("User ID:", userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user._id; // Attach the user to the request object
        return next(); // Proceed to the next middleware or route handler
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    
}