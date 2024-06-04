import React, { useContext, useState } from 'react'
import Header from './Header'
import NavigationBar from './NavigationBar'
import { AppContext } from '../../App';
import { GiHamburgerMenu } from 'react-icons/gi';
import Hamburuger from './Hamburuger';
import { useNavigate } from 'react-router-dom';

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
          {/* <button onClick={()=>{
            setLogin(!login);
            navigate("/login")
            }} className='bg-black rounded-xl shadow-xl text-white py-[8px] uppercase font-bold text-lg max-md:hidden'>
            {login ?<p className='flex gap-4 items-center   justify-center'>
              <IoMdLogOut className='text-2xl max-xl:hidden' /><span className="max-lg:hidden">Logout</span>
            </p> : <p className='flex gap-4 items-center justify-center'>
              <IoMdLogIn className="text-2xl" /><span className='max-lg:hidden'>Login</span>
            </p> }
          </button> */}
          <RegisterButton />
          <LoginButton/>
          
        </div>
    </div>
  )
}

export const LoginButton = () => {
  const {login} = useContext(AppContext);
  const navigate = useNavigate();
  return (<div onClick={()=>{navigate('/login')}} className='bg-black text-white flex items-center justify-center navigation-list-item'>{login?"Logout":"Login"}</div>)
}

export const RegisterButton = () => {
  const navigate = useNavigate();
  const {login} = useContext(AppContext);
  if (login)
    return null;
  else
    return <div onClick={()=>navigate("/register")} className='md:bg-white text-black flex items-center justify-center navigation-list-item'>Register</div>

}

export default SideBar