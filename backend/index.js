import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import useRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app,server } from "./socket/socket.js";

dotenv.config();
// const app = express();
const PORT = process.env.PORT || 8080;

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOption = {
//    origin: [
//     "http://localhost:5173", 
//     "https://your-production-frontend.com", 
//   ],
//   credentials: true,
// };
// app.use(cors(corsOption));



// CORS Setup
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_ORIGIN
];

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
