import React from 'react'
import UserGetMessages from '../hooks/UserGetMessages'
import { useSelector } from 'react-redux';
import Message from './Message';
import useGetRealTimeMessage from '../hooks/getRealTimeMessage';

const Messages = () => {
  UserGetMessages();
  useGetRealTimeMessage();
  const{messages} = useSelector(store => store.message);
  console.log("Redux messages:", messages); // Check if messages is an array

  if (!Array.isArray(messages)) return null;
  return (
    <div className='flex-1 p-4 overflow-auto'>
     {
      messages && messages.map((message) => {
        return(
          <Message key={message._id} message={message} />
        )
      })
     }
    </div>
  )
}

export default Messages;
