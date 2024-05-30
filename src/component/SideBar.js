import React from 'react'
import Header from './Header'
import NavigationBar from './NavigationBar'
import { IoMdLogOut } from "react-icons/io";

const SideBar = () => {
  return (
    <div className='bg-red-100 w-1/6 px-4 h-screen flex flex-col justify-between pb-20 fixed left-0 top-0'>
        <Header />
        <NavigationBar />
        <button className='bg-black rounded-xl text-white flex items-center justify-start px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'><IoMdLogOut className='text-2xl' />Logout</button>
    </div>
  )
}

export default SideBar