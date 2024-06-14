import React, { useContext } from 'react'
import { FaHome } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { HiUserAdd } from "react-icons/hi";
import { AppUserContext } from '../../AppUser';

const NavigationBar = () => {
  const {handleAddAuthorPanel, handleAddBookPanel, isAdmin} = useContext(AppUserContext);
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const getNavItemClass = (path) => (
    `navigation-list-item max-lg:h-12 max-lg:text-2xl max-xl:text-sm max-lg:justify-center px-6 ${currentRoute.pathname.startsWith(path)?'navigation-list-item-active':'hover:bg-white hover:bg-opacity-40'}`
  );

  return (
    <div className='px-3 py-16 max-md:hidden'>
        <ul className='flex flex-col gap-4'>
            <li className={getNavItemClass('/home')} onClick={() => navigate('/home')}><FaHome className='lg:hidden' /><span className='max-lg:hidden'>Home</span></li>
            <li className={getNavItemClass('/authors')} onClick={() => navigate('/authors')}><MdSupervisorAccount className='lg:hidden' /><span className='max-lg:hidden' >Authors</span></li>
            {currentRoute.pathname.startsWith("/authors")&&isAdmin?<li className='navigation-list-item hover:bg-white max-xl:text-sm max-lg:text-2xl hover:bg-opacity-40 max-lg:justify-center px-6' onClick={()=>{
              handleAddAuthorPanel(true);
              handleAddBookPanel(false)}} ><HiUserAdd className='lg:hidden' /> <span className='max-lg:hidden' >Add Author</span></li>:null}
            <li className={getNavItemClass('/books')} onClick={() => navigate('/books')}><IoBookSharp className='lg:hidden' /><span className='max-lg:hidden' >Books</span></li>
        </ul>
    </div>
  )
}

export default NavigationBar