import React, { useContext, useState } from 'react'
import bookImage from '../../assets/sampleBook.jpg'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import axios from 'axios';

const BookCard = ({book}) => {
  const {login} = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const likeBook = async() => {
    await axios.post(`http://localhost:8080/api/v1/book/like/${book.isbn}`)
    .then(res=>{
      console.log(res.data);
      setLiked(true);
    })
    .catch(err=>console.error(err));
  }


  return (
    <div className={`w-64 bg-white shadow-xl rounded-lg pb-4 flex flex-col items-center hover:bg-[#f5f5f5]`}>
        <div onClick={()=>{navigate(`/books/${book.isbn}`)}} className='w-full h-64 flex-box justify-center bg-[#e0e0e0] rounded-t-lg cursor-pointer'>
            <img src={bookImage} className='h-full' />
        </div>
        <div className='w-full px-5 py-3'>
            <p className='text-xs text-gray-500'>ISBN-{book.isbn}</p>
          <div className='flex w-full flex-box'>
          <h3 className='text-lg font-medium'>{book.title}</h3>
            {login?<p className='text-md text-black flex-box gap-2'>{<FaHeart />} {book.likeCount}</p>:
            liked?<p className='text-md text-black flex-box gap-2 cursor-pointer'><FaHeart /></p>:
            <p className='text-md text-black flex-box gap-2' onClick={likeBook}><FaRegHeart /></p>
            }
          </div>
          <p className='capitalize'>{book.author.firstName} {book.author.lastName}</p>
        </div>
    </div>
  )
}

export default BookCard