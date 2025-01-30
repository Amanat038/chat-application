import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const UserGetOtherUsers = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const fetchOtherUsers = async () => {
         try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`http://localhost:5000/api/v1/user/`);
            console.log("responser other users",res)
            
            dispatch(setOtherUsers(res.data.otherUsers));
         } catch (error) {
            console.log(error);
         }
      };
      fetchOtherUsers();
   }, [dispatch]); 
};

export default UserGetOtherUsers;
