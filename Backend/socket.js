import { Server } from 'socket.io';
import User from './models/user.model.js'; // Assume User model includes location info
import { CORS_ORIGIN } from './config/env.js';

let io;

function initializeSocket(server) {
  const allowedOrigins = CORS_ORIGIN ? CORS_ORIGIN.split(',') : [];

  io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async ({ userId, userType }) => {
      console.log(`User ${userId} joined as ${userType}`);
      try {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
      } catch (err) {
        console.error(`Error updating socket ID for ${userType}:`, err);
      }
    });

    // 🟢 Merchant goes online
    socket.on('merchant-go-online', async ({ userId, latitude, longitude }) => {
      console.log(`Merchant ${userId} is now online`);

      try {
        const merchant = await User.findByIdAndUpdate(
          userId,
          {
            socketId: socket.id,
            isOnline: true,
            location: { latitude, longitude },
          },
          { new: true }
        );

        // Notify all farmers
        socket.broadcast.emit('merchant-online', {
          userId: merchant._id,
          latitude: merchant.location.latitude,
          longitude: merchant.location.longitude,
        });
      } catch (err) {
        console.error('Error setting merchant online:', err);
      }
    });

    // 🔴 Merchant goes offline
    socket.on('merchant-go-offline', async ({ userId }) => {
      console.log(`Merchant ${userId} went offline`);
      try {
        await User.findByIdAndUpdate(userId, {
          isOnline: false,
        });

        // Notify all farmers
        socket.broadcast.emit('merchant-offline', { userId });
      } catch (err) {
        console.error('Error setting merchant offline:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      // Optionally update DB to mark user offline
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`Sending message to ${socketId}:`, messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
};

export { initializeSocket, sendMessageToSocketId };
