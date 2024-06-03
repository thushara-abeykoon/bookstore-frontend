import React, { useEffect, useState } from 'react'
import UserImage from '../../assets/219970.png'
import { FaBookOpen, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthorCard = ({email, firstName, lastName}) => {

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
      await axios.get(`http://localhost:8080/api/v1/book/getByAuthor/${email}`)
      .then(res=>{
        setBookCount(res.data.length);
        calculateTotalLikes(res.data);
      })
      .catch(err=>console.error(err));

      
    }

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