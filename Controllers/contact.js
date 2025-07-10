import { Contact } from "../Models/Contact.js";

// get all contacts function to retrieve all contacts
// @api GET /api/contact/all
// @desc Get all contacts
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found", success: false });
        }
        return res.status(200).json({ message: "Contacts retrieved successfully", success: true, contacts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

// createContact function to handle the creation of a new contact
// @api POST /api/contact/new
// @desc Create a new contact
export const createContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if (!name || !email || !phone || !type) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        let saveContact = await Contact.create({ name, email, phone, type,user: req.user });
        return res.status(201).json({ message: "Contact created successfully", success: true, contact: saveContact });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }

}

// get contact by id function to retrieve a contact by its ID
// @api GET /api/contact/:id
// @desc Get contact by ID
export const getContactById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Contact ID is required", success: false });
    }
    try {
        const contact = await Contact
            .findById(id)
        if (!contact) {
            return res.status(404).json({ message: "Contact not found", success: false });
        }
        return res.status(200).json({ message: "Contact retrieved successfully", success: true, contact });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

//updateContact function to handle the update of an existing contact
// @api PUT /api/contact/:id
// @desc Update contact by ID
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, type } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Contact ID is required", success: false });
    }
    if (!name || !email || !phone || !type) {

        return res.status(400).json({ message: "All fields are required", success: false });
    }
    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone, type }, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found", success: false });
        }
        return res.status(200).json({ message: "Contact updated successfully", success: true, contact: updatedContact });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

// deleteContact function to handle the deletion of a contact
// @api DELETE /api/contact/:id
// @desc Delete contact by ID
export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Contact ID is required", success: false });
    }
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found", success: false });
        }
        return res.status(200).json({ message: "Contact deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}

// userContacts function to retrieve contacts for a specific user
// @api GET /api/contact/user/:id
// @desc Get contacts for a specific user
export const userContacts = async (req, res) => {
    // Assuming user ID is passed in the request params
    const { id } = req.params;
    try {
        const contacts = await Contact.find({ user:id});
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found for this user", success: false });
        }
        return res.status(200).json({ message: "User contacts retrieved successfully", success: true, contacts });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
    }
}
