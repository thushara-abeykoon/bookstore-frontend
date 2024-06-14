import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './component/Dashboard';
import Authors from './component/author/Authors';
import Books from './component/book/Books';
import AuthorViewer from './component/author/AuthorViewer';
import BookViewer from './component/book/BookViewer';
import AddAuthorPanel from './component/author/AddAuthorPanel';
import SideBar from './component/sidebar/SideBar';
import RequestHandler from './service/requests';
import { AUTHOR_GETALL_URL, BOOK_GETALL_URL, userGetByUsernameUrl } from './service/apiUrl';

export const AppUserContext = createContext();

const AppUser = ({token}) => {

  const [isAddAuthorPanelActive, setIsAddAuthorPanelActive] = useState(false);
  const [isAddBookPanelActive, setIsAddBookPanelActive] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [requestHandler, setRequestHandler] = useState();


  const fetchCurrentUser = useCallback(async(username) => {
    requestHandler?.getReq(userGetByUsernameUrl(username), (res)=>{
      console.log(res.data);
      setCurrentUser(res.data);
      setIsAdmin(res.data.role==="ADMIN");
    })
  },[requestHandler])

  const fetchAuthors = useCallback(async () => {
    requestHandler?.getReq(AUTHOR_GETALL_URL, (res) => {
      console.log(res.data);
      setAuthors(res.data);
    })
  },[requestHandler])

  const fetchBooks = useCallback(async () => {
    requestHandler?.getReq(BOOK_GETALL_URL, (res) => {
      console.log(res.data);
      setBooks(res.data);
    })
  },[requestHandler])


  useEffect(()=>{
      if (token)
        setRequestHandler(new RequestHandler(token));
      else{
        window.location.reload();
      }
  },[token]);

  useEffect(()=>{
    const username = sessionStorage.getItem("username");
    if (username)
      fetchCurrentUser(username);

    fetchAuthors();
    fetchBooks();
  },[requestHandler, fetchAuthors, fetchBooks, fetchCurrentUser])

  const handleAddAuthorPanel = (activeValue) => {
    setIsAddAuthorPanelActive(activeValue);
  }
  const handleAddBookPanel = (activeValue) => {
    setIsAddBookPanelActive(activeValue);
  }

  return (
    <AppUserContext.Provider value={{ handleAddAuthorPanel, handleAddBookPanel, authors, books, fetchBooks, fetchAuthors, isAdmin, setIsAdmin: setIsAdmin, currentUser, requestHandler }}>
      <div>
          <SideBar />
          <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='/home' element={<Dashboard />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/books' element={<Books />} />
            <Route path='/authors/:email' element={<AuthorViewer isAddBookPanelActive={isAddBookPanelActive} />} />
            <Route path='/books/:bookIsbn' element={<BookViewer />} />
          </Routes>
          {isAddAuthorPanelActive?<AddAuthorPanel />:null}
      </div>
    </AppUserContext.Provider>
  )
}

export default AppUser