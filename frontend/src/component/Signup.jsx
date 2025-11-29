import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"

const Signup = () => {
   const [user, setUser] = useState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "female",
   });

   const navigate = useNavigate()

   const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post(
            "http://localhost:5000/api/v1/user/register",
            user,
            {
               headers: {
                  "Content-Type": "application/json",
               },
               withCredentials: true,
            }
         );

      
         if (res.data.success) {
            toast.success(res.data.message);
            setUser({
               username: "",
               email: "",
               password: "",
            });
            navigate("/");
         } else {
            toast.error(res.data.message); 
         }
      } catch (error) {
         console.error("Error:", error.response?.data || error.message);
         toast.error(error.response?.data?.message || "Something went wrong");
        
      }
      setUser({
         fullName: "",
         username: "",
         password: "",
         confirmPassword: "",
         gender: "",
      });
   };

   const handleCheckbox = (gender) => {
      setUser({ ...user, gender });
   };

   return (
      <div className="m-auto min-w-96">
         <h1 className="m-5 text-4xl font-bold text-center "><span className="text-green-600">V</span><samp>A</samp></h1>
         <div className="w-full p-6 bg-gray-100 border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-filter bg-opacity-10 backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-center text-gray-300 ">
               SignUp
            </h1>
            <form action="" onSubmit={onSubmitHandler}>
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">Full Name</span>
                  </label>
                  <input
                     value={user.fullName}
                     onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                     }
                     type="text"
                     className="w-full h-10 text-gray-800 bg-gray-200 input input-bordered"
                     placeholder="Full Name"
                  />
               </div>
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
               <div>
                  <label className="p-2 label">
                     <span className="text-base label-text">
                        Confirm Password
                     </span>
                  </label>
                  <input
                     value={user.confirmPassword}
                     onChange={(e) =>
                        setUser({ ...user, confirmPassword: e.target.value })
                     }
                     type="password"
                     className="w-full h-10 text-gray-800 bg-gray-200 input input-bordered"
                     placeholder="Confirm Password"
                  />
               </div>
               <div className="flex items-center my-4 text-white">
                  <div className="flex items-center">
                     <p>Male</p>
                     <input
                        value={user.gender}
                        checked={user.gender === "male"}
                        onChange={() => handleCheckbox("male")}
                        type="checkbox"
                        defaultChecked
                        className="mx-2 text-gray-800 border-white checkbox"
                     />
                  </div>
                  <div className="flex items-center">
                     <p>Female</p>
                     <input
                        value={user.gender}
                        checked={user.gender === "female"}
                        onChange={() => handleCheckbox("female")}
                        type="checkbox"
                        defaultChecked
                        className="mx-2 text-gray-800 border-white checkbox"
                     />
                  </div>
               </div>
               <p className="text-center">
                  Already Have an account?{" "}
                  <Link className="text-blue-500" to="/login">
                     Login
                  </Link>
               </p>

               <div>
                  <button
                     type="submit"
                     className="mt-2 text-xl text-white bg-green-600 border btn btn-block btn-sn border-slate-700"
                  >
                     SignUp
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Signup;
