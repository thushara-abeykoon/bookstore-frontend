import React, { useContext, useEffect, useState } from 'react'
import AuthorCard from './AuthorCard'
import axios from 'axios';
import { AppContext } from '../App';

const Authors = () => {
  
  const {authors} = useContext(AppContext);
  const {fetchAuthors} = useContext(AppContext);

  useEffect(() => {
      fetchAuthors();
    },[]);

  return (
    <div className='w-5/6 float-right px-10 py-10 flex flex-col gap-10'> 
      <h3 className='text-5xl font-bold'>All Authors</h3>
      <div className='grid-box'>
        {authors.length!==0?
          authors.map((author)=>{
            return <AuthorCard key={author.id} firstName={author.firstName} lastName={author.lastName} bookCount={9} likeCount={10} />
          })
          :
          <p>No authors found</p>
        }
      </div>
    </div>
  )
}

export default Authors