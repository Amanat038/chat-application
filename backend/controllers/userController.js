import { User } from "../models/useModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
   try {
      const { fullName, username, password, confirmPassword, gender } =
         req.body;

      if (!fullName || !username || !password || !confirmPassword || !gender) {
         return res.status(404).json({ message: "All fields  are required",success:false });
      }
      if (password === !confirmPassword) {
         return res.status(400).json({ message: "Password is incorrect",success:false });
      }
      const user = await User.findOne({ username });
      if (user) {
         return res.status(400).json({ message: "User already exists", success: false });      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const maleProfilePhoto = `https://icon-library.com/images/user-icon-png/user-icon-png-17.jpg?username=${username}`;
      const femaleProfilePhoto = `https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993_1280.png?username=${username}`;

      const userinfo = await User.create({
         fullName,
         username,
         password: hashedPassword,
         profilePhoto:
         gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
         gender,
      });

      return res.status(200).json({
         message: "User created successfully",
         success: true,
         userinfo,
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", success: false });
   }
};

export const login = async (req, res) => {
   try {
      const { username, password } = req.body;

      if (!username || !password) {
         return res.status(404).json({ message: "All fields  are required" });
      }

      const user = await User.findOne({ username });
      if (!user) {
         return res.status(200).json({
            message: "incorrect username or password",
            success: false,
         });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res
            .status(404)
            .json({ message: "incorrect password", success: false });
      }

      const tokenData = {
         userId: user._id,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
         expiresIn: "1d",
      });

      res.status(200)
         .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
         })
         .json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,

            message:"User logged in successfully",
            success : true
         });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "An unexpected error occurred",
         success: false,
      });
   }
};

export const logOut = async (req, res) => {
   try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
         message: "User logged out successfully",
      });
   } catch (error) {
      console.log(error);
   }
};

export const getOtherUsers = async (req, res) => {
   try {
      const loggedInUserId = req.id;

      if (!loggedInUserId) {
         return res.status(400).json({
            message: "Invalid request: User ID is required",
            success: false,
         });
      }
      const otherUsers = await User.find({
         _id: { $ne: loggedInUserId },
      }).select("-password");

      return res.status(200).json({ otherUsers });
   } catch (error) {
      console.error("Error fetching other users:", error);
      return res.status(500).json({
         message: "An unexpected error occurred",
         success: false,
      });
   }
};
