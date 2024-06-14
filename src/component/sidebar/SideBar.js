import React, { useState } from 'react'
import Header from './Header'
import NavigationBar from './NavigationBar'
import { GiHamburgerMenu } from 'react-icons/gi';
import Hamburuger from './Hamburuger';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';

const SideBar = () => {
  const [hamburgurActive, setHamburgurActive] = useState(false);
  return (
    <div className='bg-red-100 md:w-1/6 px-4 md:h-screen max-md:items-center flex md:flex-col justify-between max-md:pb-10 md:pb-20 md:fixed md:left-0 md:top-0'>
        <div className='max-md:w-full max-md:flex max-md:justify-between max-md:items-center'>
          <Header />
          <NavigationBar />
          <GiHamburgerMenu onClick={()=>{setHamburgurActive(true)}} className="md:hidden text-3xl relative top-5 cursor-pointer" />
          {hamburgurActive?<Hamburuger setHamburgurActive={setHamburgurActive} />:null}
        </div>
        <div className='flex flex-col gap-2 max-md:hidden'>

          <LogoutButton component={<div><IoMdLogOut className='lg:hidden text-3xl' /><span className='max-lg:hidden'>Logout</span></div>}/>
        </div>
    </div>
  )
}

export const LogoutButton = ({component}) => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  }

  return (<div onClick={logout} className='bg-black text-white flex items-center justify-center navigation-list-item'>{component}</div>)
}

export default SideBar