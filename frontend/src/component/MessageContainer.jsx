import React, { useEffect } from "react";
import "../App.css";
import SendInput from "./SendInput";

import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";

const MessageContainer = () => {
   const { selectedUser, authUser, onlineUsers } = useSelector(
      (store) => store.user
   );
   const dispatch = useDispatch();

   const isOnline = onlineUsers.includes(selectedUser?._id);
   return (
      <div className="flex flex-col flex-1 h-full  p-4 bg-gray-900 text-white md:max-w-[60%]">
         {selectedUser ? (
            <>
               <div className="flex items-center gap-4 py-2 bg-gray-800 rounded-lg shadow-lg px-9 md:p-2">
                  <div className={`avatar ${isOnline ? "online" : ""}`}>
                     <div className="w-12 h-12 overflow-hidden rounded-full">
                        <img src={selectedUser?.profilePhoto} alt="User" />
                     </div>
                  </div>
                  <p className="text-lg font-semibold">
                     {selectedUser?.fullName}
                  </p>
               </div>
               <div className="h-px my-2 bg-gray-700"></div>
               <Messages />
               <SendInput />
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
               <h1 className="text-3xl font-bold">Hi, {authUser?.fullName}</h1>
               <p className="text-lg">Let's start a conversation!</p>
            </div>
         )}
      </div>
   );
};

export default MessageContainer;
