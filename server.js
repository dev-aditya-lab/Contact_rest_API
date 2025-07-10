import express from 'express';

const app = express();
import bodyParser from 'express';
app.use(bodyParser.json());
import userRoutes from './Routes/user.js';
import connectDB from './DB/Connection.js';
import contactRoutes from './Routes/contact.js';
import { config } from 'dotenv';
const PORT = process.env.PORT || 3000;
//connecting to the database
connectDB();
import cors from 'cors';    
app.use(cors()); // ✅ Enable CORS for all routes

// .env settings
config({path: './.env'});

// User Routes
app.use('/api/user', userRoutes);
//contact Routes
app.use('/api/contact', contactRoutes);


app.listen(PORT,()=>{
console.log('Server is running on http://localhost:'+PORT);
});