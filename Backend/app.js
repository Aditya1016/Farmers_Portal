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

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())


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