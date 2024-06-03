import React, { useContext } from 'react'
import Header from './Header'
import NavigationBar from './NavigationBar'
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { AppContext } from '../../App';

const SideBar = () => {
  const {login, setLogin} = useContext(AppContext);
  return (
    <div className='bg-red-100 w-1/6 px-4 h-screen flex flex-col justify-between pb-20 fixed left-0 top-0'>
        <div>
          <Header />
          <NavigationBar />
        </div>
        <button onClick={()=>{
          setLogin(!login);
          }} className='bg-black rounded-xl text-white px-[50px] py-[10px] uppercase font-bold text-lg'>
          {login ?<p className='flex gap-4 items-center'>
            <IoMdLogOut className='text-2xl' />Logout
          </p> : <p className='flex gap-4 items-center'>
            <IoMdLogIn className="text-2xl" />Login
          </p> }
        </button>
    </div>
  )
}

export default SideBar