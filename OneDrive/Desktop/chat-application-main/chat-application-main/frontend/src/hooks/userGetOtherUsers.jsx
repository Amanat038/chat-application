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
            const res = await axios.get(`http://localhost:5000/api/v1/user/`,{
               withCredentials : true
            });
            console.log("responser other users",res)
            
            dispatch(setOtherUsers(res.data.otherUsers));
         } catch (error) {
            console.log("UserGetOtherUsers not work",error);
         }
      };
      fetchOtherUsers();
   }, [dispatch]); 
};


// const UserGetOtherUsers = () => {
//    const dispatch = useDispatch();
//    useEffect(() => {
//        (async () => {
//            try {
//                axios.defaults.withCredentials = true;
//                const response = await axios.get("http://localhost:5000/api/v1/user/");
//                console.log("Response: Other users", response);
//                dispatch(setOtherUsers(response.data.otherUsers)); // dispatching data to Redux store
//            } catch (error) {
//                console.error("Error fetching users:", error);
//            }
//        })();
//    }, [dispatch]);
// };
export default UserGetOtherUsers;
