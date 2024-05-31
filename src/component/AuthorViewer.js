import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthorImage from "../assets/219970.png"
import BookCard from './BookCard';
import AddNewBookButton from './AddNewBookButton';
import AddBookPanel from './AddBookPanel';
import { AppContext } from '../App';

const AuthorViewer = ({isAddBookPanelActive}) => {
    const params = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);

    const {handleAddBookPanel} = useContext(AppContext);

    const fetchAuthor = async () => {
        await axios.get(`http://localhost:8080/api/v1/author/get/${params.email}`)
        .then((response) => {
            setAuthor(response.data);
        })
        .catch((err)=>{console.error(err)});
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
        <div className='flex items-center gap-10 px-10 py-5 bg-gray-200 shadow-md'>
            <img src={AuthorImage} className='h-full w-40' />
            <div className='flex flex-col gap-5'>
                <h2 className='text-5xl font-bold'>{author?.firstName} {author?.lastName}</h2>
                <div className='flex gap-10 font-light'>
                    <p>Email : {author?.email}</p>
                    <p>Contact : {author?.contactNo}</p>
                </div>
            </div>
        </div>

        {/* Author Books Section */}
        <div className='px-10 py-5'>
            <h3 className='text-xl uppercase font-bold'>Books By Author</h3>
            <div className='grid-box gap-8 mt-10'>
                <AddNewBookButton handleAddBookPanel={handleAddBookPanel} />
                {books.map((book)=>{
                    return <BookCard key={book.isbn} title={book.title} author={author} isbn={book.isbn} likeCount={book.likeCount} />
                })}
            </div>
        </div>
        {isAddBookPanelActive?<AddBookPanel handleAddBookPanel={handleAddBookPanel} author={author} fetchBooks={fetchBooks} />:null}
    </div>
  )
}

export default AuthorViewer