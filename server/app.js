import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user.js';
import sweetRouter from './routes/sweet.js';
import './db/db-connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for cross-origin requests (frontend ↔ backend)
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Health check route
app.get('/api', (_, res) => res.send('Server is live!'));

// Auth routes
app.use('/api/auth', userRouter);

// Sweets routes
app.use('/api/sweets', sweetRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
