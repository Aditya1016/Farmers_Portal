import express from 'express'

import { CORS_ORIGIN, PORT } from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'

import cors from 'cors'

import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import cookieParser from 'cookie-parser'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
const app = express()

import helmet from 'helmet';
app.use(helmet());

const allowedOrigins = CORS_ORIGIN.split(',');

console.log("Allowed Origins: ", allowedOrigins)

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

import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined')); // better for production
}


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.set('trust proxy', 1);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(errorMiddleware);
app.use(arcjetMiddleware)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    connectToDatabase()
})

export default app