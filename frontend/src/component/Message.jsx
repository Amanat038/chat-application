

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Message = ({ message, onUpdateMessage }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message?.message);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleEditClick = () => {
    if (authUser?._id === message?.senderId) {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    setEditedMessage(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/message/editMessage/${message._id}`,
        { newMessage: editedMessage }, 
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        onUpdateMessage(message._id, editedMessage); 
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating message:", error.response?.data || error.message);
    }
  };

  const handleCancel = () => {
    setEditedMessage(message?.message);
    setIsEditing(false);
  };

  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="ml-2 text-xs opacity-50">{formatTime(message?.createdAt)}</time>
      </div>
      <div
        className={`chat-bubble ${authUser?._id === message?.senderId ? 'bg-white' : 'bg-red-900'}`}
        onClick={handleEditClick}
      >
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedMessage}
              onChange={handleInputChange}
              className="p-1 text-white border border-gray-300 rounded-md"
            />
            <button onClick={handleSave} className="px-2 py-1 text-white bg-green-500 rounded">Save</button>
            <button onClick={handleCancel} className="px-2 py-1 text-white bg-gray-400 rounded">Cancel</button>
          </div>
        ) : (
          <p className={`${authUser?._id === message?.senderId ? 'text-black' : 'text-white'}`}>{message?.message}</p>
        )}
      </div>
    </div>
  );
};

export default Message;





 