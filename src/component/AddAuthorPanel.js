import React from 'react'
import { ImCross } from "react-icons/im";
import SampleUserImage from "../assets/219970.png"

const AddAuthorPanel = () => {

    const textFieldStyle = 'w-full text-md px-4 py-2 border-b-2 border-black outline-none bg-transparent';

  return (
    <div className='fixed right-0 top-0 h-screen w-1/4 shadow-2xl bg-white text-black p-4 flex flex-col items-center gap-10'>
        <div className='text-xl w-full flex-box justify-end cursor-pointer'><ImCross /></div>
        <img src={SampleUserImage} width={200} />
        <form className='w-3/4 flex flex-col items-center gap-10 '>
          <input type='text' className={textFieldStyle} placeholder='First Name' />
          <input type='text' className={textFieldStyle} placeholder='Last Name' />
          <input type='email' className={textFieldStyle} placeholder='Email' />
          <input type='text' className={textFieldStyle} placeholder='Contact Number' />
          <button className=' w-full bg-black rounded-xl text-white flex items-center justify-center px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'>Add</button>  
        </form>
    </div>
  )
}

export default AddAuthorPanel