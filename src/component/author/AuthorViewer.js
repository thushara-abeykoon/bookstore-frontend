import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthorImage from "../../assets/219970.png"
import BookCard from '../book/BookCard';
import AddNewBookButton from '../book/AddNewBookButton';
import AddBookPanel from '../book/AddBookPanel';
import { AppUserContext } from '../../AppUser';
import { MdCall, MdDelete, MdEmail, MdModeEdit } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { authorDeleteByEmailUrl, authorGetByEmailUrl, authorUpdateByIdUrl, bookGetByAuthorEmailUrl } from '../../service/apiUrl';
import DeleteAlert from '../DeleteAlert';

const AuthorViewer = ({isAddBookPanelActive}) => {
    const params = useParams();
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNo: ''
    });
    const [books, setBooks] = useState([]);
    const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);
    const [isDeleteActive, setIsDeleteActive] = useState(false);

    const { handleAddBookPanel, isAdmin, requestHandler } = useContext(AppUserContext);
    const navigate = useNavigate();

    const fetchAuthor = useCallback(async() => {
        requestHandler?.getReq(authorGetByEmailUrl(params.email), res => {
            setAuthor(res.data);
        });
    },[requestHandler,params.email])

    const updateAuthor = async () => {
        await requestHandler?.putReq(authorUpdateByIdUrl(author.id), author, (res) => {
            console.log(res.data);
            fetchAuthor();
            setIsUpdateModeOn(false);
        });
    }

    const deleteAuthor = async () => {
        await requestHandler?.deleteReq(authorDeleteByEmailUrl(author.email), (res) => {
            console.log(res.data);
            navigate(`/authors`);
        });
    }

    const fetchBooks = useCallback(async () => {
        await requestHandler?.getReq(bookGetByAuthorEmailUrl(params.email), (res) => {
            setBooks(res.data);
        });
    },[requestHandler, params.email])

    useEffect(() => {
        if (params.email) {
            fetchAuthor();
            fetchBooks();
        }
    }, [params.email, fetchAuthor, fetchBooks]);

    return (
        <div className='md:w-5/6 h-full md:float-right'>

            {/* Author Details Section */}
            <div className='flex items-end justify-between px-10 py-5 bg-gray-200 shadow-md max-md:flex-col-reverse'>
                <div className='flex max-md:flex-col items-center gap-10'>
                    <img alt='author' src={AuthorImage} className='h-full max-md:w-24 w-60' />
                    <div className='flex flex-col gap-5'>
                        <div>
                            <input 
                                value={author?.firstName || ''} 
                                disabled={!isUpdateModeOn} 
                                onChange={e => setAuthor({ ...author, firstName: e.target.value })} 
                                type='text' 
                                className={`text-7xl max-md:text-4xl max-md:text-center w-full bg-transparent capitalize outline-none font-bold ${isUpdateModeOn ? 'border-b-2 border-black' : ''}`} 
                            />
                            <input 
                                value={author?.lastName || ''} 
                                disabled={!isUpdateModeOn} 
                                onChange={e => setAuthor({ ...author, lastName: e.target.value })} 
                                type='text' 
                                className={`text-7xl max-md:text-4xl max-md:text-center w-full bg-transparent capitalize outline-none font-bold ${isUpdateModeOn ? 'border-b-2 border-black' : ''}`} 
                            />
                        </div>
                        <div className='font-light max-md:text-xs flex flex-col max-md:items-center text-center'>
                            <p className='flex items-center gap-3'><MdEmail /> 
                                <input 
                                    disabled={!isUpdateModeOn} 
                                    className={`bg-transparent outline-none ${isUpdateModeOn ? 'border-b-[1px] border-black' : ''}`} 
                                    value={author?.email || ''} 
                                    type="text" 
                                    onChange={e => setAuthor({ ...author, email: e.target.value })} 
                                />
                            </p>
                            <p className='flex items-center gap-3'><MdCall /> 
                                <input 
                                    disabled={!isUpdateModeOn} 
                                    className={`bg-transparent outline-none ${isUpdateModeOn ? 'border-b-[1px] border-black' : ''}`} 
                                    value={author?.contactNo || ''} 
                                    type="text" 
                                    onChange={e => setAuthor({ ...author, contactNo: e.target.value })} 
                                />
                            </p>
                        </div>
                    </div>
                </div>
                {isAdmin ?
                    <div className='text-2xl py-3 h-64 max-md:h-full max-md:w-full flex md:flex-col items-end justify-between'>

                        <MdDelete className='cursor-pointer' onClick={()=>setIsDeleteActive(true)} />

                        {isUpdateModeOn ?
                            <p className='flex items-center gap-8' ><ImCross className='text-base cursor-pointer' onClick={() => setIsUpdateModeOn(false)} /> 
                            <FaCheck className='cursor-pointer text-xl' onClick={updateAuthor} /></p>
                            :
                            <MdModeEdit className='cursor-pointer' onClick={() => setIsUpdateModeOn(true)} />
                        }
                    </div> : null}
            </div>

            {/* Author Books Section */}
            <div className='px-10 py-5'>
                <h3 className='text-xl uppercase font-bold'>Books By Author</h3>
                <div className='grid-box mt-10'>
                    {isAdmin ? <AddNewBookButton handleAddBookPanel={handleAddBookPanel} /> : null}
                    {books.map((book) => {
                        return <BookCard book={book} key={book.isbn} />
                    })}
                </div>
            </div>
            {isAddBookPanelActive ? <AddBookPanel handleAddBookPanel={handleAddBookPanel} author={author} fetchBooks={fetchBooks} /> : null}
            {isDeleteActive?<DeleteAlert message={"All the books related to author will be lost. Are you sure to continue?"} deleteFunction={deleteAuthor} setIsActive={setIsDeleteActive}/>:null}
        </div>
    )
}

export default AuthorViewer
