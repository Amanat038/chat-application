import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser,selectedUser} = useSelector(store => store.user);
  useEffect(() =>{
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  },[message]);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  return (
    <>
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end':'chat-start'}`}>
    {/* <div className={`chat ${isSender ? 'chat-start' : 'chat-end'}`}> */}
  <div className="chat-image avatar">
  <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={message.senderId === authUser ?._id? authUser?.profilePhoto: selectedUser?.profilePhoto}
        />
    </div> 
  </div>
  <div className="chat-header">
  <time className="ml-2 text-xs opacity-50">
            {formatTime(message?.createdAt)}
          </time>
  </div>
  <div className={`chat-bubble ${authUser?._id === message?.senderId ? 'bg-white':'bg-black'}`} > <p className={`${authUser?._id === message?.senderId ? 'text-black':'text-white'}`}>{message?.message}</p></div>
  {/* <div className="opacity-50 chat-footer">Delivered</div> */}
</div>

    </>
  )
}

export default Message




 