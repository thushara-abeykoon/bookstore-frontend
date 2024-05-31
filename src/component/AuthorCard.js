import React from 'react'
import UserImage from '../assets/219970.png'
import { FaBookOpen, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AuthorCard = ({email, firstName, lastName, bookCount, likeCount}) => {

    const navigate = useNavigate();

  return (
    <div className='bg-white w-64 shadow-xl rounded-lg pt-3 pb-10 flex flex-col items-center gap-4 px-5 cursor-pointer' onClick={() => navigate(`/authors/${email}`)} >
        <img src={UserImage} className='w-full' />
        <div className='flex flex-col items-center gap-3 w-full'>
            <h3 className='text-2xl font-bold capitalize'>{firstName} {lastName}</h3>
            <div className='flex justify-around w-full'>
                <p className='flex-box gap-3'><FaBookOpen /> {bookCount}</p>
                <p className='flex-box gap-3'>{<FaHeart />} {likeCount}</p>
            </div>
        </div>
    </div>
  );
}

export default AuthorCard