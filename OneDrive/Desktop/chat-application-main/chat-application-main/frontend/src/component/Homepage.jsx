import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const Homepage = () => {
  return (
    <div className='flex flex-col justify-center w-full h-screen overflow-hidden rounded-lg md:flex-row '>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Homepage;