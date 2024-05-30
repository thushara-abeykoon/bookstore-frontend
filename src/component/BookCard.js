import React from 'react'
import bookImage from '../assets/sampleBook.jpg'
import { FaHeart } from "react-icons/fa";

const BookCard = ({title, author, isbn}) => {
  return (
    <div className='w-64 shadow-lg rounded-lg p-4 flex flex-col items-center'>
        <div className='w-full h-64 flex-box justify-center'>
            <img src={bookImage} className='h-full' />
        </div>
        <h3>{title}</h3>
        <p>{author.firstName} {author.lastName}</p>
        <p>{isbn}</p>
        <div>{FaHeart}</div>
    </div>
  )
}

export default BookCard