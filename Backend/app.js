// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { CORS_ORIGIN } from './config/env.js';

import userRouter from './routes/user.routes.js';// Correct import
import merchantRouter from './routes/merchant.routes.js';// Correct import

import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

import connectToDatabase  from './database/mongodb.js'; // Ensure this is the correct path

connectToDatabase();

const app = express();

// Security headers
app.use(helmet());

// CORS setup
const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(',') : [];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// Trust proxy (for secure cookies behind proxies like Heroku or Nginx)
app.set('trust proxy', 1);

// Middleware
app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/merchants', merchantRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error middleware (should be last)
app.use(errorMiddleware);

export default app;
