import React, { useContext, useEffect, useState } from 'react'
import AuthorImage from '../../assets/219970.png'
import { FaBookOpen, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppUserContext } from '../../AppUser';
import { bookGetByAuthorEmailUrl } from '../../service/apiUrl';

const AuthorCard = ({email, firstName, lastName}) => {

    const { requestHandler } = useContext(AppUserContext);

    const navigate = useNavigate();
    const [bookCount, setBookCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    
    useEffect(()=>{
      fetchBookCount(email);
    })

    const calculateTotalLikes = (books) => {
      let tempLikeCount = 0;
      books.forEach(book => {
        tempLikeCount += book.likeCount;
      });
      setLikeCount(tempLikeCount);
    }

    const fetchBookCount = async(email) => {
      await requestHandler?.getReq(bookGetByAuthorEmailUrl(email), (res)=>{
        setBookCount(res.data.length);
        calculateTotalLikes(res.data);
      })      
    }

  return (
    <div className='bg-white w-64 max-md:w-32 shadow-xl rounded-lg pt-3 max-md:pb-4 pb-10 flex flex-col items-center gap-4 px-5 cursor-pointer' onClick={() => navigate(`/authors/${email}`)} >
        <img alt='author' src={AuthorImage} className='w-full' />
        <div className='flex flex-col items-center gap-3 w-full'>
            <h3 className='text-2xl text-center max-md:text-base font-bold capitalize'>{firstName} {lastName}</h3>
            <div className='flex justify-around w-full'>
                <p className='flex-box max-md:text-xs max-md:gap-1 gap-3'><FaBookOpen /> {bookCount}</p>
                <p className='flex-box max-md:text-xs max-md:gap-1 gap-3'>{<FaHeart />} {likeCount}</p>
            </div>
        </div>
    </div>
  );
}

export default AuthorCard