import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Dynamic origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId] || null; 
};

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    
    if (userSocketMap[userId]) {
      console.log(`User ${userId} reconnected. Cleaning up old socket ID.`);
    }

    userSocketMap[userId] = socket.id; 
    io.emit("getOnlineUser", Object.keys(userSocketMap)); 
  } else {
    console.warn("User connected without a userId");
  }

  // Handle user disconnection
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId]; 
      io.emit("getOnlineUser", Object.keys(userSocketMap)); 
    }
    console.log(`User disconnected: ${socket.id}`);
  });
});

export { app, io, server };
