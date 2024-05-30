import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TiUserAdd } from "react-icons/ti";

const NavigationBar = () => {

  const navigate = useNavigate();

  const currentRoute = useLocation();

  const getNavItemClass = (path) => (
    `navigation-list-item ${currentRoute.pathname===path?'navigation-list-item-active':'hover:bg-white hover:bg-opacity-40'}`
  );

  return (
    <div className='px-3 py-16'>
        <ul className='flex flex-col gap-4'>
            <li className={getNavItemClass('/')} onClick={() => navigate('/')}><FaHome />Home</li>
            <li className={getNavItemClass('/authors')} onClick={() => navigate('/authors')}><MdSupervisorAccount />Authors</li>
            <li className={getNavItemClass('/books')} onClick={() => navigate('/books')}><IoBookSharp />Books</li>
            <li></li>
        </ul>
    </div>
  )
}

export default NavigationBar