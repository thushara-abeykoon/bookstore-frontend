import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdSupervisorAccount } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";

const NavigationBar = () => {
  return (
    <div className='px-3 py-16'>
        <ul className='flex flex-col gap-4'>
            <li className='navigation-list-item bg-black text-white'><FaHome />Home</li>
            <li className='navigation-list-item'><MdSupervisorAccount />Authors</li>
            <li className='navigation-list-item'><IoBookSharp />Books</li>
            <li></li>
        </ul>
    </div>
  )
}

export default NavigationBar