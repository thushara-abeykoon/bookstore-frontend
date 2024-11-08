import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { AppUserContext } from '../../AppUser'

const AddNewBookButton = ({handleAddBookPanel}) => {
  const {handleAddAuthorPanel} = useContext(AppUserContext);
  
  return (
    <div onClick={()=>{
        handleAddBookPanel(true);
        handleAddAuthorPanel(false);
      }} 
      className='w-64 h-90 max-md:w-36 max-md:px-3 shadow-xl rounded-lg py-4 flex flex-col justify-center items-center transition-all duration-100 bg-[#f5f5f5] hover:bg-gray-200 cursor-pointer'>
        <FaPlus className='text-5xl text-gray-400' />
    </div>
  )
}

export default AddNewBookButton