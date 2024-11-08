import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import BookCard from './book/BookCard';
import AuthorCard from './author/AuthorCard';
import { AppUserContext } from '../AppUser';
import { bookSearchByIsbnUrl } from '../service/apiUrl';

const Dashboard = () => {
    const {authors, books, currentUser, fetchAuthors} = useContext(AppUserContext);
    const [mostLikedBooks, setMostLikedBooks] = useState([]);
    useEffect(()=>{
        fetchAuthors();
        const sortedBooks = books;
        sortedBooks.sort((a,b)=>b.likeCount- a.likeCount);
        setMostLikedBooks(sortedBooks.slice(0,4));
    },[books, fetchAuthors])
    

  return (
    <div className='md:float-right md:w-5/6 max-md:w-full px-10 py-10 flex flex-col gap-20'>
        <div className='flex-box gap-20 max-md:flex-col-reverse max-md:gap-10'>
            <h2 className='text-5xl font-bold font-sans capitalize'>Welcome {currentUser?.username}!</h2>
            <SearchBar />
        </div>
        <div className='flex flex-col w-full items-start gap-10'>
            <h3 className='font-bold text-xl uppercase'>Most Liked Books</h3>
            <div className='w-full grid-box'>
                {mostLikedBooks?.map(book=>(
                    <BookCard key={book.isbn} book={book} />
                ))}
            </div>
        </div>

        <div className='flex flex-col items-start gap-10'>
            <h3 className='font-bold text-xl uppercase'>Top Authors</h3>
            <div className='grid-box w-full'>
                {authors.slice(0,4).map(author=>(
                    <AuthorCard key={author.id} email={author.email} firstName={author.firstName} lastName={author.lastName} likeCount={10} bookCount={20} />
                ))}
            </div>
        </div>

    </div>
  )
}

const SearchBar = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchedBooks, setSearchedBooks] = useState([]);

    const { requestHandler } = useContext(AppUserContext);

    const searchBooks = async(bookIsbn) => {
        await requestHandler.getReq(bookSearchByIsbnUrl(bookIsbn), (res)=> {
            setSearchedBooks(res.data);
        })
    }

  return (
    <div onClick={()=>setSearchActive(false)} className={searchActive?'md:w-5/6 max-md:w-full h-screen fixed bottom-0 right-0 bg-white bg-opacity-30 backdrop-blur-md px-5 py-5 flex flex-col gap-20':'max-md:w-full'}>
        <div className={searchActive?'w-full flex-box border-b-2 px-10 py-3 border-black ':'border-2 border-gray-400 w-full rounded-2xl py-2 px-5 flex-box'}>
          <input onChange={e=>{
            if (e.target.value.length!==0)
                setSearchActive(true);

            searchBooks(e.target.value)
          }} type='text' placeholder='Search Books' className='text-lg outline-none w-full bg-transparent' />
         <FaSearch className='text-3xl opacity-70 text-gray-500' />
        </div>
        {searchActive?
        
        <div className='overflow-auto'>
            <div className='grid-box'>
                {searchedBooks.length===0?<p>No Books Found</p>:
                searchedBooks.map(book=><BookCard key={book.isbn} book={book} />)}
            </div>
        </div>
        :null}
    </div>
  )
}

export default Dashboard