import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FreePlan API is running' });
});

// Routes (à brancher au fur et à mesure)
// import authRoutes from './routes/auth.routes.js';
// app.use('/api/auth', authRoutes);

export default app;