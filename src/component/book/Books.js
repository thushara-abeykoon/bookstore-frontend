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
      {isbn: 5, title: 'Book 5', likeCount:7, author: {
          firstName: "Kamal",
          lastName: "Perera",
          email: "perera@gmail.com",
          contactNo: "0987654321"
      }}
  ]
  }

  return (
    <div className='w-5/6 float-right px-10 py-10'>
        <h2 className='text-5xl font-bold mb-10'>All Books</h2>
        <div className='flex flex-col gap-20'>
          <CategoryBox category={categories} />
          <CategoryBox category={categories} />
        </div>
    </div>
  )
}

const CategoryBox = ({category}) => {

  return (
    <div className='flex flex-col gap-10'>
      <div className={`bg-gray-100  px-10 pt-6 pb-10 rounded-lg flex flex-col gap-8 justify-between`}>
        <h3 className='text-3xl px-5 font-semibold capitalize'>{category?.name}</h3>
        <div className='grid-box'>
          {category.books.map((book) => (
            <BookCard key={book.isbn} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books