import React, { useContext, useEffect, useRef } from 'react'
import { AppUserContext } from '../../AppUser'
import { ImCross } from 'react-icons/im';
import { RiImageAddFill } from 'react-icons/ri';
import { BOOK_REGISTER_URL } from '../../service/apiUrl';

const AddBookPanel = ({author, fetchBooks, handleAddBookPanel}) => {

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const categoryRef = useRef(null); 

  const { requestHandler } = useContext(AppUserContext);

  useEffect(() => {
    return () => {
      fetchBooks();
    }
  },[fetchBooks]);
  
  const addNewBook = async(isbn, title, category) => {
    console.log(author);
    const data = { isbn, title, category, author }
    await requestHandler?.postReq(BOOK_REGISTER_URL, data, (res) => {
      console.log(res.data);
      handleAddBookPanel(false);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isbnRef.current.value, titleRef.current.value, categoryRef.current.value);
    addNewBook(isbnRef.current.value, titleRef.current.value, categoryRef.current.value);
  }

  return (
    <div className='add-new-panel max-md:w-full'>
      <div className='text-xl w-full flex-box justify-end cursor-pointer text-white'><ImCross onClick={()=>handleAddBookPanel(false)} /></div>
     <div className='h-64 w-64 bg-transparent border-4 border-gray-500 rounded-lg border-dashed flex-box justify-center text-8xl'><RiImageAddFill className='text-gray-500' /></div>
      <form onSubmit={handleSubmit} className='w-3/4 flex flex-col items-center gap-10 mt-10 '>
        <input ref={isbnRef} type="text" className='add-new-panel-input' placeholder='Book ISBN' />
        <input ref={titleRef} type="text" className='add-new-panel-input' placeholder='Book Title' />
        <input ref={categoryRef} type="text" className='add-new-panel-input' placeholder='Book Category' />
          <button className=' w-full bg-white rounded-xl text-black hover:bg-gray-200 transition-all duration-300 flex items-center mt-7 justify-center px-[50px] py-[10px] gap-4 uppercase font-bold text-lg'>Add</button>  
      </form>

    </div>
  )
}

export default AddBookPanel;