import React, { useContext, useEffect, useState } from 'react'
import SampleBookImage from '../../assets/sampleBook.jpg';
import AuthorCard from '../author/AuthorCard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaCheck, FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AuthorImage from "../../assets/219970.png";
import { AppContext } from '../../App';

const BookViewer = () => {

  const {bookIsbn} = useParams();
  const [book, setBook] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  const {login} = useContext(AppContext);

  useEffect(()=>{
    fetchBook();
  },[]);

  const fetchBook = async() => {
    await axios.get(`http://localhost:8080/api/v1/book/get/${bookIsbn}`)
    .then(response => {
      console.log(response.data);
      setBook(response.data);
    })
    .catch(err=>console.error(err));
  }

  const updateBook = async() => {
    await axios.put ("http://localhost:8080/api/v1/book/update", book)
    .then(res=>{
      console.log(res.data);
      setUpdateMode(false);
    })
    .catch(err=>console.error(err));
  }

  const deleteBook = async() => {
    await axios.delete(`http://localhost:8080/api/v1/book/delete/${book?.isbn}`)
    .then(res=>{
      console.log(res.data);
      navigate("/books");
    })
    .catch(err=>console.error(err));
  }

  return (
    <div className='md:w-5/6 float-right'>
      <div className='flex items-center justify-between px-10 py-5 bg-gray-200 shadow-md'>
          <div className='flex max-md:flex-col items-center gap-10'>
            <img src={SampleBookImage} className='h-full max-md:w-32 md:w-64' />
            <div className='flex flex-col h-80 items-start justify-between max-md:justify-start max-md:gap-5'>
                        <div>
                            <input value={book?.title} disabled={!updateMode} onChange={e=>setBook({...book,title:e.target.value})} type='text' className='text-7xl max-md:text-3xl max-md:text-center w-full bg-transparent capitalize outline-none font-bold' />
                            <p className='text-xl max-md:text-sm max-md:text-center max-md:font-light font-normal'>ISBN-{book?.isbn}</p>
                            <p className='text-xl max-md:text-sm text-black flex-box justify-start max-md:justify-center max-md:gap-1 pl-1 gap-2 mt-2'>{<FaHeart />} {book?.likeCount}</p>
                        </div>
                        <div className='flex max-md:mx-auto gap-5 items-center cursor-pointer' onClick={()=>{navigate(`/authors/${book.author.email}`)}}>
                          <img src={AuthorImage} width={50} />
                          <p className='capitalize text-lg font-bold'>{book?.author.firstName} {book?.author.lastName}</p>
                        </div>
                        <div className='max-md:mx-auto'>
                            <p className='bg-gray-900 p-1 rounded-md font-normal text-white '><input disabled={!updateMode} className='bg-transparent text-center outline-none capitalize' value={book?.category} type="text" onChange={e=>setBook({...book,category:e.target.value})} /></p>
                        </div>
              </div>
            </div>
           {login? <div className='text-2xl py-3 h-80 flex flex-col items-end justify-between'>
                <MdDelete className='cursor-pointer' onClick={deleteBook} />
                {updateMode?
                <p className='flex items-center gap-8' ><ImCross className='text-base cursor-pointer' onClick={()=>setUpdateMode(false)} /> 
                <FaCheck className='cursor-pointer text-xl' onClick={updateBook} /></p>
                :
                <MdModeEdit className='cursor-pointer' onClick={()=>setUpdateMode(true)} />
              }
            </div>:null}
        </div>
      </div>

  )
}

export default BookViewer