import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
   const dispatch = useDispatch();
   const {selectedUser,onlineUsers} = useSelector(store => store.user);
   const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

   const selectedUserHandler = (user) => {
      dispatch(setSelectedUser(user));
   };
   return (
      <>
         <div
            onClick={() => selectedUserHandler(user)}
            className={`${
              selectedUser?._id === user?._id ? "bg-zinc-200" : ""
            } flex items-center gap-2 p-2 rounded cursor-pointer text-black`}
          >
            <div className={`avatar ${isOnline ? 'online' :""}`}>
               <div className="w-10 rounded-full">
                  <img src={user.profilePhoto} alt="" />
               </div>
            </div>

            <div className="flex flex-col flex-1">
               <div className="flex justify-between gap-2 ">
                  <p className="">{user.fullName}</p>
               </div>
            </div>
         </div>
         <div className="h-1 py-0 my-0 divider"></div>
      </>
   );
};

export default OtherUser;
