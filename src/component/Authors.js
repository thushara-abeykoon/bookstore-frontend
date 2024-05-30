import React, { useEffect, useState } from 'react'
import AuthorCard from './AuthorCard'
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
      const fetchAuthors = async () => {
        await axios.get("http://localhost:8080/api/v1/author/getAll")
        .then((response) => {
          setAuthors(response.data);
        })
        .catch((err)=>{console.log(err);});
      }
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