import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationBar = () => {

  const navigate = useNavigate();

  const currentRoute = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  }

  return (
    <div className='px-3 py-16'>
        <ul className='flex flex-col gap-4'>
            <li className={`navigation-list-item ${currentRoute.pathname==='/'?'navigation-list-item-active':''}`} onClick={() => navigate('/')}><FaHome />Home</li>
            <li className={`navigation-list-item ${currentRoute.pathname==='/authors'?'navigation-list-item-active':''}`} onClick={() => navigate('/authors')}><MdSupervisorAccount />Authors</li>
            <li className={`navigation-list-item ${currentRoute.pathname==='/books'?'navigation-list-item-active':''}`} onClick={() => navigate('/books')}><IoBookSharp />Books</li>
            <li></li>
        </ul>
    </div>
  )
}

export default NavigationBar