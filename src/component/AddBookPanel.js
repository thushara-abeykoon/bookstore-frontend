import React, { useContext } from 'react'
import { AppContext } from '../App'
import { ImCross } from 'react-icons/im';
import BookImage from "../assets/sampleBook.jpg"
import { RiImageAddFill } from 'react-icons/ri';

const AddBookPanel = () => {

  const {handleAddBookPanel} = useContext(AppContext);

  return (
    <div className='add-new-panel'>
      <div className='text-xl w-full flex-box justify-end cursor-pointer text-white'><ImCross onClick={()=>handleAddBookPanel(false)} /></div>
     <div className='h-64 w-64 bg-transparent border-4 border-gray-500 rounded-lg border-dashed flex-box justify-center text-8xl'><RiImageAddFill className='text-gray-500' /></div>
      <form className='w-3/4 flex flex-col items-center gap-10 mt-10 '>
        <input type="text" className='add-new-panel-input' placeholder='Book ISBN' />
        <input type="text" className='add-new-panel-input' placeholder='Book Title' />
        <input type="text" className='add-new-panel-input' placeholder='Book Category' />
          <button className=' w-full bg-white rounded-xl text-black hover:bg-gray-200 transition-all duration-300 flex items-center mt-7 justify-center px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'>Add</button>  
      </form>

    </div>
  )
}

export default AddBookPanel;