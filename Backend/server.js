// server.js
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { PORT } from './config/env.js';
import { initializeSocket } from './socket.js';

const port = PORT || 3000;

import http from 'http';

const server = http.createServer(app)

initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})