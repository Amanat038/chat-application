import { useEffect, useState } from "react";
import Homepage from "./component/Homepage";
import Login from "./component/Login";
import Signup from "./component/Signup";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Homepage />
  },
  {
    path:'/singup',
    element:<Signup/>
  },
  {
    path:"/Login",
    element:<Login/>
  }
])
function App() {
  const {authUser} = useSelector(store => store.user)
  const {socket} = useSelector(store => store.socket)

  const dispatch  = useDispatch()
  useEffect(() => {
    if(authUser){
      const socket = io('http://localhost:5000', { query: { userId: authUser._id } });

      dispatch(setSocket(socket))

      socket.on('getOnlineUser',(onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      return() => socket.close();
      
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
    
  },[authUser, dispatch])
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <RouterProvider router={router} />
      
    </div>
  )
}

export default App
