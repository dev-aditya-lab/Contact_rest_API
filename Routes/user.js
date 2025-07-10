import express from 'express';
import { userLoginController, userRegisterController } from '../Controllers/user.js';
const router = express.Router();

// User Register Route
// @api dsc :- user Register
// @api method :- POST
// @api endPoint :- /api/user/register
router.post('/register',userRegisterController);

// User Register Route
// @api dsc :- user Login
// @api method :- GET
// @api endPoint :- /api/user/login
router.get('/login',userLoginController);


export default router;