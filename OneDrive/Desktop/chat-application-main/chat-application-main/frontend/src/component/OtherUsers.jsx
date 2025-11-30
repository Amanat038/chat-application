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



// import React from 'react';
// import OtherUser from './OtherUser';
// import UserGetOtherUsers from '../hooks/userGetOtherUsers';
// import { useSelector } from 'react-redux';

// const OtherUsers = () => {
//   UserGetOtherUsers();
//   const { otherUsers } = useSelector(store => store.user);

//   if (!otherUsers) {
//     console.log("otherUsers not available");
//     return <p>Loading users...</p>; // Show a loading message if data is not available
//   }

//   return (
//     <div className='flex-1 overflow-auto'>
//       {otherUsers.length > 0 ? (
//         otherUsers.map((user) => <OtherUser key={user._id} user={user} />)
//       ) : (
//         <p>No users found</p> // Handle case when array is empty
//       )}
//     </div>
//   );
// };

// export default OtherUsers;

