import React, { useContext } from 'react'
import { AppContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { LoginButton, RegisterButton } from './SideBar';

const Hamburuger = ({setHamburgurActive}) => {

    const {handleAddAuthorPanel, handleAddBookPanel, login} = useContext(AppContext);
    const navigate = useNavigate();
    const currentRoute = useLocation();

  const getNavItemClass = (path) => (
    `navigation-list-item justify-center ${currentRoute.pathname.startsWith(path)?'navigation-list-item-active':'hover:bg-red-400 hover:bg-opacity-40'}`
  );


  return (
    <div className='fixed top-0 right-0 w-3/4 h-screen bg-white bg-opacity-40 backdrop-blur-md flex flex-col justify-between py-10'>
        <div className='flex flex-col gap-5'>
            <div className='px-10 flex justify-end text-black'><ImCross onClick={()=>{setHamburgurActive(false)}} className='cursor-pointer'/></div>
             <ul className='flex flex-col gap-4'>
                <li className={getNavItemClass('/home')} onClick={() => navigate('/home')}>Home</li>
                <li className={getNavItemClass('/authors')} onClick={() => navigate('/authors')}>Authors</li>
                {currentRoute.pathname.startsWith("/authors")&&login?<li className='navigation-list-item flex justify-center items-center hover:bg-red-400 hover:bg-opacity-40' onClick={()=>{
                  handleAddAuthorPanel(true);
                  handleAddBookPanel(false)}} >Add Author</li>:null}
                <li className={getNavItemClass('/books')} onClick={() => navigate('/books')}>Books</li>
            </ul>
        </div>
        <div className='flex flex-col gap-4'>
          <RegisterButton />
          <LoginButton />
        </div>
    </div>
  )
}

export default Hamburuger