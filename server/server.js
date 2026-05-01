import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import keepAlive from './utils/keepAlive.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);

    // Only ping in production to avoid noise in development
    if (process.env.NODE_ENV === 'production') {
      keepAlive(`https://freeplan-api.onrender.com/api/health`);
    }
  });
});