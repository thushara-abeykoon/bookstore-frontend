import React from 'react'

const DeleteAlert = ({message, deleteFunction, setIsActive}) => {
  return (
    <div className='w-full h-48 fixed bottom-5 right-0 flex items-center justify-center'>
        <div className='bg-white shadow-xl px-10 py-7 rounded-xl w-96 flex flex-col items-center justify-center gap-10'>
            <p>{message}</p>
            <div className='w-full px-5 flex justify-between'>
                <button className='bg-red-500 border-2 border-red-500 text-white px-5 py-2 transition-all duration-200 rounded-lg hover:bg-white hover:text-red-500' onClick={()=>{
                    deleteFunction();
                    setIsActive(false);
                }}>Delete</button>
                <button className='bg-black border-2 border-black text-white px-5 py-2 rounded-lg transition-all duration-200 hover:bg-white hover:text-black' onClick={()=>{setIsActive(false)}}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteAlert