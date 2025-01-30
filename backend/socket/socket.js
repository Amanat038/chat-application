import { Server } from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);


const allowedSocketOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_ORIGIN
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedSocketOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
