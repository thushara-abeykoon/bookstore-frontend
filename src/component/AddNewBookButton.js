import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddNewBookButton = () => {
  return (
    <div className='w-64 h-96 shadow-xl rounded-lg py-4 flex flex-col justify-center items-center transition-all duration-100 bg-[#f5f5f5] hover:bg-gray-200 cursor-pointer'>
        <FaPlus className='text-5xl text-gray-400' />
    </div>
  )
}

export default AddNewBookButton