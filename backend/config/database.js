

import mongoose from  "mongoose";


const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Connected to MongoDB");
  } catch (err) {
     console.log("Error connecting to Mongo",err);
  }
};

export default connectDB;