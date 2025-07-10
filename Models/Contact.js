import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['personal', 'professional'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    }
}, {
    timestamps: true,
});


export const Contact = mongoose.model('Contact', contactSchema);

// This schema defines a Contact model with fields for name, email, phone, type, and user reference.
// The 'Type' field is an enum that restricts the values to 'personal' or 'professional'.
// The 'user' field is a reference to the User model, establishing a relationship between contacts and users.