import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import useRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app,server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
   origin:["https://chat-application-08060601.netlify.app","http://localhost:5173/"],
   credentials: true,
};
app.use(cors(corsOption));



// Routes
app.use("/api/v1/user", useRoute);
app.use("/api/v1/message", messageRoute);


// Start the Server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
