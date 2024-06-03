import React, { useContext, useState } from 'react'
import Header from './Header'
import NavigationBar from './NavigationBar'
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { AppContext } from '../../App';
import { GiHamburgerMenu } from 'react-icons/gi';
import Hamburuger from './Hamburuger';

const SideBar = () => {
  const {login, setLogin} = useContext(AppContext);
  const [hamburgurActive, setHamburgurActive] = useState(false);
  return (
    <div className='bg-red-100 md:w-1/6 px-4 md:h-screen max-md:items-center flex md:flex-col justify-between max-md:pb-10 md:pb-20 md:fixed md:left-0 md:top-0'>
        <div className='max-md:w-full max-md:flex max-md:justify-between max-md:items-center'>
          <Header />
          <NavigationBar />
          <GiHamburgerMenu onClick={()=>{setHamburgurActive(true)}} className="md:hidden text-3xl relative top-5 cursor-pointer" />
          {hamburgurActive?<Hamburuger setHamburgurActive={setHamburgurActive} />:null}
        </div>
        <button onClick={()=>{
          setLogin(!login);
          }} className='bg-black rounded-xl text-white py-[8px] uppercase font-bold text-lg max-md:hidden'>
          {login ?<p className='flex gap-4 items-center   justify-center'>
            <IoMdLogOut className='text-2xl max-xl:hidden' /><span className="max-lg:hidden">Logout</span>
          </p> : <p className='flex gap-4 items-center justify-center'>
            <IoMdLogIn className="text-2xl" /><span className='max-lg:hidden'>Login</span>
          </p> }
        </button>
    </div>
  )
}

export default SideBar