import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";

const Login = () => {
   const [user, setUser] = useState({
      username: "",
      password: "",
   });
      const dispatch = useDispatch();
   const navigate = useNavigate();
   const token = localStorage.getItem("token");
   console.log(token);
   const onSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(user);
      try {
         const res = await axios.post(
            `http://localhost:5000/api/v1/user/login`,
            user,
            {
              
                  headers: {
                     "Content-Type": "application/json",
                  },
                  withCredentials: true, 
            }
         );
         localStorage.setItem("token", res.data.token);
        
         if (res.data.success) {
            dispatch(setAuthUser(res.data));
            toast.success(res.data.message || "Login successful");
            setUser({
              username: "",
              password: "",
              
            });
            navigate("/home");
         } else {
            toast.error(res.data.message); // Show toast for error messages like "User already exists"
         }
      } catch (error) {
         console.error("Error:", error.response?.data || error.message);
         toast.error(error.response?.data?.message || "Something went wrong");
      }
   };

   return (
      <div className="m-auto min-w-96">
         <h1 className="m-5 text-4xl font-bold text-center "><span className="text-green-600">V</span><samp>A</samp></h1>
         <div className="w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-filter bg-opacity-10 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-center text-gray-300 ">
               Login
            </h1>
            <form action="" onSubmit={onSubmitHandler}>
               {" "}
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">User Name</span>
                  </label>
                  <input
                     value={user.username}
                     type="text"
                     onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                     }
                     className="w-full h-10 text-gray-800 bg-gray-200 input input-bordered"
                     placeholder="User Name"
                  />
               </div>
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">Password</span>
                  </label>
                  <input
                     value={user.password}
                     onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                     }
                     type="text"
                     className="w-full h-10 text-gray-800 bg-gray-200 input input-bordered"
                     placeholder="Password"
                  />
               </div>
               <p className="mt-10 text-center text-black">
                  You don't Have an account?{" "}
                  <Link className="text-blue-500" to="/singup">
                     SignUp
                  </Link>
               </p>
               <div>
                  <button
                     type="submit"
                     className="mt-2 text-xl text-white bg-green-600 border btn btn-block btn-sn border-slate-700"
                  >
                     Login
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
