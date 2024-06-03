import React, { useContext } from 'react'
import { FaHome } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { HiUserAdd } from "react-icons/hi";
import { AppContext } from '../../App';

const NavigationBar = () => {
  const {handleAddAuthorPanel} = useContext(AppContext);
  const {handleAddBookPanel} = useContext(AppContext);
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const getNavItemClass = (path) => (
    `navigation-list-item ${currentRoute.pathname.startsWith(path)?'navigation-list-item-active':'hover:bg-white hover:bg-opacity-40'}`
  );

  return (
    <div className='px-3 py-16'>
        <ul className='flex flex-col gap-4'>
            <li className={getNavItemClass('/home')} onClick={() => navigate('/home')}><FaHome />Home</li>
            <li className={getNavItemClass('/authors')} onClick={() => navigate('/authors')}><MdSupervisorAccount />Authors</li>
            {currentRoute.pathname.startsWith("/authors")?<li className='navigation-list-item hover:bg-white hover:bg-opacity-40' onClick={()=>{
              handleAddAuthorPanel(true);
              handleAddBookPanel(false)}} ><HiUserAdd /> Add Author</li>:null}
            <li className={getNavItemClass('/books')} onClick={() => navigate('/books')}><IoBookSharp />Books</li>
        </ul>
    </div>
  )
}

export default NavigationBar