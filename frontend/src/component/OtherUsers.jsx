import React from 'react'
import OtherUser from './OtherUser'
import UserGetOtherUsers from '../hooks/userGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  UserGetOtherUsers();
  const {otherUsers} = useSelector(store => store.user);
 
  if(!otherUsers){
    console.log("otherUsers not available")
  }
  return (
    <div className='flex-1 overflow-auto'>
      {
       
       otherUsers.map((user) =>{
            return (
              <OtherUser key={user._id} user={user} />
            )
          })
       
      }
    </div>
  )
}

export default OtherUsers
