import React, { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
   const [search, setSearch] = useState("");
   const { otherUsers } = useSelector((store) => store.user);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState(false);

   const logoutHandler = async () => {
      try {
         axios.defaults.withCredentials = true;
         const res = await axios.get(`http://localhost:5000/api/v1/user/logout`);
         navigate("/login");
         toast.success(res.data.message);
         dispatch(setAuthUser(null));
      } catch (e) {
         console.log(e);
      }
   };

   const searchSubmitHandler = (e) => {
      e.preventDefault();
      const conversationUser = otherUsers?.find((user) =>
         user.fullName.toLowerCase().includes(search.toLowerCase())
      );

      if (conversationUser) {
         dispatch(setOtherUsers([conversationUser]));
      } else {
         toast.error("User not found!");
      }
   };

   return (
      <>
         <button className="fixed z-50 p-2 ml-2 text-white bg-gray-600 rounded-lg md:hidden top-7 left-4" onClick={() => setIsOpen(!isOpen)}>
   <FiArrowLeft className="w-6 h-6" />
</button>

         <div
            className={`fixed z-50 flex flex-col w-64 md:w-1/3 lg:w-1/4 h-full p-4 border-r border-gray-700 bg-gray-600 transition-transform ${
               isOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0`}
         >
            <button className="self-end p-2 text-white bg-gray-600 rounded-lg md:hidden" onClick={() => setIsOpen(false)}>
               Close
            </button>
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-2 mt-2">
               <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-2 text-white placeholder-gray-400 bg-gray-700 rounded-lg"
                  type="text"
                  placeholder="Search..."
               />
               <button type="submit" className="p-2 bg-gray-600 rounded-lg">
                  <SlMagnifier className="w-6 h-6 text-white" />
               </button>
            </form>
            <div className="my-4 border-t border-gray-600"></div>
            <OtherUsers />
            <button onClick={logoutHandler} className="p-2 mt-auto text-white bg-red-600 rounded-lg">Log Out</button>
         </div>
      </>
   );
};

export default Sidebar;
