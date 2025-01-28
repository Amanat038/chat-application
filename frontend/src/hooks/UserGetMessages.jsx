import axios from "axios";
import React, { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const UserGetMessages = () => {
  const {selectedUser} = useSelector((store) => store.user)
    const dispatch = useDispatch()


   useEffect(() => {
      const fetchMessages = async () => {
        if (!selectedUser?._id) return; // Ensure selectedUser is valid
       
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(`http://localhost:5000/api/v1/message/${selectedUser?._id}`);
          
          console.log("UserGetMessages", res);
          dispatch(setMessages(res.data.messages));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages()
   },[selectedUser, dispatch]);
};

export default UserGetMessages;
