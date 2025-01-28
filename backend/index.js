import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import useRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { Server } from "socket.io";
// import http from "http";
import { app,server } from "./socket/socket.js";

dotenv.config();
// const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", useRoute);
app.use("/api/v1/message", messageRoute);

// // Create HTTP Server
// const server = http.createServer(app);

// Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// Socket.IO Connection
// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   const userId = socket.handshake.query.userId;

//   if (userId) {
//    userSocketMap[userId] = socket.id;
//    io.emit('getOnlineUser', Object.keys(userSocketMap));
//  }
 

//  socket.on('disconnect', () => {
//    if (userId) {
//      delete userSocketMap[userId];
//      io.emit('getOnlineUser', Object.keys(userSocketMap));
//    }
//  });
 
// });

// Start the Server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
