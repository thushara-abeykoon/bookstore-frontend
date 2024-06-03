import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import BookCard from './BookCard';
import { MdPlayArrow } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';

const Books = () => {
  const [bookCategories, setBookCategories] = useState([]);
  const {fetchBooks, books} = useContext(AppContext);
  useEffect(()=>{
    fetchBooks(); 
  },[]);

  const categories = {
    name: "novels",
    books: [
      {isbn: 1, title: 'Book 1', likeCount:15, author: {
          firstName: "John",
          lastName: "Doe",
          email: "doe@gmail.com",
          contactNo: "1234567890"
      }},
      {isbn: 2, title: 'Book 2', likeCount:2, author: {
          firstName: "John",
          lastName: "Doe",
          email: "doe@gmail.com",
          contactNo: "1234567890"
      }},
      {isbn: 3, title: 'Book 3', likeCount:5, author: {
          firstName: "Kamal",
          lastName: "Perera",
          email: "perera@gmail.com",
          contactNo: "0987654321"
      }},
      {isbn: 4, title: 'Book 4', likeCount:6, author: {
          firstName: "Kamal",
          lastName: "Perera",
          email: "perera@gmail.com",
          contactNo: "0987654321"
      }},
  ]
  }

  return (
    <div className='w-5/6 float-right px-10 py-10'>
        <h2 className='text-5xl font-bold mb-10'>All Books</h2>
        <CategoryBox category={categories} />
    </div>
  )
}

const CategoryBox = ({category}) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className='flex flex-col gap-10'>
      <div className={`bg-white shadow-lg px-10 py-4 rounded-lg flex items-start justify-between transition-all duration-300`}>
        <h3 className='text-xl capitalize'>{category?.name}</h3>
        <p className='text-3xl'><IoIosArrowForward onClick={() => {setExpand(!expand)}} className={`cursor-pointer transition-all duration-300 ${expand?'rotate-90':''}`}/></p>
      </div>
        <div className='grid-box'>
          {category.books.map((book) => (
            <BookCard key={book.isbn} {...book} />
          ))}
        </div>
    </div>
  );
}

export default Books