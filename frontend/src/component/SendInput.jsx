import React, {  useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
const SendInput = () => {
  
  const [message,setMessage] = useState("");
  const dispatch = useDispatch()

  const {selectedUser} = useSelector(store => store.user)
  const{messages} = useSelector(store => store.message);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try{
      const res = await axios.post(`http://localhost:5000/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers :{
          'Content-Type': 'application/json',
          
        },
        withCredentials : true
      });
      console.log(res)
      dispatch(setMessages([...messages, res?.data?.newMessage]))
    }catch(e){
      console.log(e);
    }
    setMessage("")
  }
  const handleKeyPress = (e) => {
    // Check if the Enter key (key code 13) is pressed
    if (e.key === 'Enter') {
      onSubmitHandler(e); // Trigger the onSubmitHandler function
    }
  };
  return (
    <>
      <form className='px-4 my-3'  onSubmit={onSubmitHandler}>
        <div className='relative w-full'>
          <input type='text' onKeyDown={handleKeyPress} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send a Message" className='block w-full p-3 text-sm text-white bg-gray-600 border rounded-lg border-zinc-500' />
          <button type='submit' className='absolute inset-y-0 flex items-center pr-4 end-0'>
            < IoSend />
          </button>
        </div>
      </form>
    </>
  )
}

export default SendInput