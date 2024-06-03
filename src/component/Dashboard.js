import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import BookCard from './book/BookCard';
import AuthorCard from './author/AuthorCard';
import { AppContext } from '../App';

const Dashboard = () => {

    const {authors, books} = useContext(AppContext);
    const [mostLikedBooks, setMostLikedBooks] = useState([]);
    useEffect(()=>{
        const sortedBooks = books;
        sortedBooks.sort((a,b)=>b.likeCount- a.likeCount);
        setMostLikedBooks(sortedBooks.slice(0,4));
    },[])
    

    // const authors = [
    //     {
    //         id: 1,
    //         firstName: "John",
    //         lastName: "Doe",
    //         email: "doe@gmail.com",
    //         contactNo: "1234567890"
    //     },
    //     {
    //         id: 2,
    //         firstName: "Kamal",
    //         lastName: "Perera",
    //         email: "perera@gmail.com",
    //         contactNo: "0987654321"
    //     },
    //     {
    //         id: 3,
    //         firstName: "Nimal",
    //         lastName: "Nishantha",
    //         email: "nimal@outlook.com",
    //         contactNo: "123456678"
    //     },
    //     {
    //         id: 4,
    //         firstName: "Nimal",
    //         lastName: "Nishantha",
    //         email: "nimal@outlook.com",
    //         contactNo: "123456678"
    //     },
    // ]

  return (
    <div className='float-right w-5/6 px-10 py-10 flex flex-col gap-20'>
        <div className='flex-box gap-20'>
            <h2 className='text-5xl font-bold font-sans'>Welcome Admin!</h2>
            <SearchBar />
        </div>
        <div className='flex flex-col items-start gap-10'>
            <h3 className='font-bold text-xl  uppercase'>Most Liked Books</h3>
            <div className='flex-box justify-start gap-10'>
                {mostLikedBooks?.map(book=>(
                    <BookCard key={book.isbn} book={book} />
                ))}
            </div>
        </div>

        <div className='flex flex-col items-start gap-10'>
            <h3 className='font-bold text-xl uppercase'>Top Authors</h3>
            <div className='flex-box justify-start gap-10'>
                {authors.map(author=>(
                    <AuthorCard key={author.id} firstName={author.firstName} lastName={author.lastName} likeCount={10} bookCount={20} />
                ))}
            </div>
        </div>

    </div>
  )
}

const SearchBar = () => {
  return (
    <div className='border-2 border-gray-400 w-96 rounded-2xl py-2 px-5 flex-box'>
      <input type='text' placeholder='Search Books' className='text-lg outline-none w-full bg-transparent' />
     <FaSearch className='text-3xl opacity-70 text-gray-500' />
    </div>
  )
}

export default Dashboard