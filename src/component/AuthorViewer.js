import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthorImage from "../assets/219970.png"
import BookCard from './BookCard';
import AddNewBookButton from './AddNewBookButton';
import AddBookPanel from './AddBookPanel';
import { AppContext } from '../App';
import { MdModeEdit } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';

const AuthorViewer = ({isAddBookPanelActive}) => {
    const params = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);

    const {handleAddBookPanel} = useContext(AppContext);
    const {fetchAuthors} = useContext(AppContext);

    const fetchAuthor = async (authorEmail) => {
        await axios.get(`http://localhost:8080/api/v1/author/get/${authorEmail?authorEmail:params.email}`)
        .then((response) => {
            setAuthor(response.data);
        })
        .catch((err)=>{console.error(err.response.data)});
    }

    const updateAuthor = async () => {
        await axios.put(`http://localhost:8080/api/v1/author/update/${author.id}`, author).
        then((response) => {
            console.log(response.data);
            fetchAuthor();
            setIsUpdateModeOn(false);
        })
        .catch(err=>console.error(err));
    }

    const fetchBooks = async () => {
        await axios.get(`http://localhost:8080/api/v1/book/getByAuthor/${params.email}`)
        .then((response) => {
            setBooks(response.data);
        })
        .catch((err)=>{console.error(err)});
    }

    useEffect(()=>{
        params && fetchAuthor() && fetchBooks();
    },[params.email]);

  return (
    <div className='w-5/6 float-right'>

        {/* Author Details Section */}
        <div className=' flex items-end justify-between px-10 py-5 bg-gray-200 shadow-md'>
            <div className='flex items-center gap-10'>
                <img src={AuthorImage} className='h-full w-60' />
                <div className='flex flex-col gap-5'>
                    <div>
                        <input value={author?.firstName} disabled={!isUpdateModeOn} onChange={e=>setAuthor({...author,firstName:e.target.value})} type='text' className='text-7xl min-w-6 max-w-96  bg-transparent capitalize outline-none font-bold' />:
                        <input value={author?.lastName} disabled={!isUpdateModeOn} onChange={e=>setAuthor({...author,lastName:e.target.value})} type='text' className='text-7xl bg-transparent capitalize outline-none font-bold' />
                    </div>
                    <div className='font-light'>
                        <p>Email : <input disabled={!isUpdateModeOn} className='bg-transparent outline-none' value={author?.email} type="text" onChange={e=>setAuthor({...author,email:e.target.value})} /></p>
                        <p>Contact : <input disabled={!isUpdateModeOn} className='bg-transparent outline-none' value={author?.contactNo} type="text" onChange={e=>setAuthor({...author,contactNo:e.target.value})} /></p>
                    </div>
                </div>
            </div>
            <div className='text-2xl py-3'>
                {isUpdateModeOn?
                <p className='flex items-center gap-8' ><ImCross className='text-base cursor-pointer' onClick={()=>setIsUpdateModeOn(false)} /> 
                <FaCheck className='cursor-pointer text-xl' onClick={updateAuthor} /></p>
                :
                <MdModeEdit className='cursor-pointer' onClick={()=>setIsUpdateModeOn(true)} />
                }
                </div>
        </div>

        {/* Author Books Section */}
        <div className='px-10 py-5'>
            <h3 className='text-xl uppercase font-bold'>Books By Author</h3>
            <div className='grid-box gap-8 mt-10'>
                <AddNewBookButton handleAddBookPanel={handleAddBookPanel} />
                {books.map((book)=>{
                    return <BookCard key={book.isbn} title={book.title} author={""} isbn={book.isbn} likeCount={book.likeCount} />
                })}
            </div>
        </div>
        {isAddBookPanelActive?<AddBookPanel handleAddBookPanel={handleAddBookPanel} author={author} fetchBooks={fetchBooks} />:null}
    </div>
  )
}

export default AuthorViewer