import React, { useContext, useEffect, useState } from 'react'
import AuthorCard from './AuthorCard';
import { AppUserContext } from '../../AppUser';

const Authors = () => {
  
  const {authors} = useContext(AppUserContext);
  const {fetchAuthors} = useContext(AppUserContext);

  useEffect(() => {
      fetchAuthors();
    },[]);

  return (
    <div className='md:w-5/6 max-md:w-full float-right px-10 py-10 flex flex-col gap-10 max-md:text-center'> 
      <h3 className='text-5xl font-bold'>All Authors</h3>
      <div className='grid-box'>
        {authors.length!==0?
          authors.map((author)=>{
            return <AuthorCard key={author.id} email={author.email} firstName={author.firstName} lastName={author.lastName} bookCount={9} likeCount={10} />
          })
          :
          <p>No authors found</p>
        }
      </div>
    </div>
  )
}

export default Authors