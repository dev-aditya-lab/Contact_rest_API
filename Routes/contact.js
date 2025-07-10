import express from 'express';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact, userContacts } from './../Controllers/contact.js';
import { isAuthenticated } from '../middlewares/Auth.js';
const router = express.Router();

// Route to create a new contact
// @api POST /api/contact/new
// @desc Create a new contact
router.post('/new',isAuthenticated, createContact);

// Route to get all contacts
// @api GET /api/contact/all
// @desc Get all contacts
router.get('/all', getAllContacts); 

// Route to get a contact by ID
// @api GET /api/contact/:id
// @desc Get contact by ID
router.get('/:id',getContactById )

// Route to update a contact by ID
// @api PUT /api/contact/:id
// @desc Update contact by ID
router.put('/:id',isAuthenticated, updateContact)

// Route to delete a contact by ID
// @api DELETE /api/contact/:id
// @desc Delete contact by ID
router.delete('/:id',isAuthenticated, deleteContact)

//user specific contact
// @api GET /api/contact/user/:id
// @desc Get user specific contacts
router.get('/user/:id',isAuthenticated, userContacts);



export default router;