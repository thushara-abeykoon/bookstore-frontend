import React from 'react'
import bookImage from '../../assets/sampleBook.jpg'
import { FaHeart } from "react-icons/fa";
import BookViewer from './BookViewer';
import { useNavigate } from 'react-router-dom';

const BookCard = ({book}) => {

  const navigate = useNavigate();

  return (
    <div onClick={()=>{navigate(`/books/${book.isbn}`)}} className='w-64 bg-white shadow-xl rounded-lg pb-4 flex flex-col items-center hover:bg-[#f5f5f5] cursor-pointer'>
        <div className='w-full h-64 flex-box justify-center bg-[#e0e0e0] rounded-t-lg'>
            <img src={bookImage} className='h-full' />
        </div>
        <div className='w-full px-5 py-3'>
            <p className='text-xs text-gray-500'>ISBN-{book.isbn}</p>
          <div className='flex w-full flex-box'>
          <h3 className='text-lg font-medium'>{book.title}</h3>
            <p className='text-md text-black flex-box gap-2'>{<FaHeart />} {book.likeCount}</p>
          </div>
          <p>{book.author.firstName} {book.author.lastName}</p>
        </div>
    </div>
  )
}

export default BookCard