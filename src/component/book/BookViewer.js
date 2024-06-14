import React, { useCallback, useContext, useEffect, useState } from 'react'
import SampleBookImage from '../../assets/sampleBook.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { FaCheck, FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import AuthorImage from "../../assets/219970.png";
import { AppUserContext } from '../../AppUser';
import { BOOK_UPDATE_URL, bookDeleteByIsbnUrl, bookGetByIsbnUrl } from '../../service/apiUrl';
import DeleteAlert from '../DeleteAlert';

const BookViewer = () => {

  const { bookIsbn } = useParams();
  const [book, setBook] = useState({
    title: '',
    isbn: '',
    likeCount: 0,
    author: {
      email: '',
      firstName: '',
      lastName: ''
    },
    category: ''
  });
  const [updateMode, setUpdateMode] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const navigate = useNavigate();
  const { requestHandler, isAdmin } = useContext(AppUserContext);

  const fetchBook = useCallback(async () => {
    await requestHandler?.getReq(bookGetByIsbnUrl(bookIsbn), (res) => {
      console.log(res.data);
      setBook(res.data);
    });
  },[bookIsbn, requestHandler])
  
  useEffect(() => {
    fetchBook();
  }, [bookIsbn, fetchBook]);


  const updateBook = async () => {
    await requestHandler.putReq(BOOK_UPDATE_URL, book, (res) => {
      console.log(res.data);
      setUpdateMode(false);
    });
  }

  const deleteBook = async () => {
    await requestHandler.deleteReq(bookDeleteByIsbnUrl(book?.isbn), (res) => {
      console.log(res.data);
      navigate("/books");
    })
  }

  return (
    <div className='md:w-5/6 md:float-right'>
      <div className='flex items-center justify-between px-10 py-5 bg-gray-200 shadow-md max-md:flex-col-reverse'>
        <div className='flex max-md:flex-col items-center gap-10'>
          <img alt='book' src={SampleBookImage} className='h-full max-md:w-32 md:w-64' />
          <div className='flex flex-col h-80 items-start justify-between max-md:justify-start max-md:gap-5'>
            <div>
              <input value={book?.title || ''} disabled={!updateMode} onChange={e => setBook({ ...book, title: e.target.value })} type='text' className={`text-7xl max-md:text-3xl max-md:text-center w-full bg-transparent capitalize outline-none font-bold ${updateMode ? 'border-b-2 border-black' : ''}`} />
              <p className='text-xl max-md:text-sm max-md:text-center max-md:font-light font-normal'>ISBN-{book?.isbn}</p>
              <p className='text-xl max-md:text-sm text-black flex-box justify-start max-md:justify-center max-md:gap-1 pl-1 gap-2 mt-2'>{<FaHeart />} {book?.likeCount}</p>
            </div>
            <div className='flex max-md:mx-auto gap-5 items-center cursor-pointer' onClick={() => { navigate(`/authors/${book.author.email}`) }}>
              <img alt='author' src={AuthorImage} width={50} />
              <p className='capitalize text-lg font-bold'>{book?.author.firstName || ''} {book?.author.lastName || ''}</p>
            </div>
            <div className='max-md:mx-auto'>
              <p className='bg-gray-900 p-1 rounded-md font-normal text-white '><input disabled={!updateMode} className={`bg-transparent text-center outline-none capitalize ${updateMode ? 'border-b-[1px] border-white' : ''}`} value={book?.category || ''} type="text" onChange={e => setBook({ ...book, category: e.target.value })} /></p>
            </div>
          </div>
        </div>
        {isAdmin ? <div className='text-2xl max-md:w-full py-3 h-80 max-md:h-full flex md:flex-col items-end justify-between'>
          <MdDelete className='cursor-pointer' onClick={()=>setIsDeleteActive(true)} />
          {updateMode ?
            <p className='flex items-center gap-8' ><ImCross className='text-base cursor-pointer' onClick={() => { setUpdateMode(false) }} />
              <FaCheck className='cursor-pointer text-xl' onClick={updateBook} /></p>
            :
            <MdModeEdit className='cursor-pointer' onClick={() => setUpdateMode(true)} />
          }
        </div> : null}
      </div>
      {isDeleteActive?<DeleteAlert message={"Are you sure to delete this book?"} deleteFunction={deleteBook} setIsActive={setIsDeleteActive}/>:null}
    </div>
  )
}

export default BookViewer
