import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import SideBar from './component/sidebar/SideBar';
import Authors from './component/author/Authors';
import Books from './component/book/Books';
import AddAuthorPanel from './component/author/AddAuthorPanel';
import axios from 'axios';
import AuthorViewer from './component/author/AuthorViewer';
import BookViewer from './component/book/BookViewer';
import LoginRegister from './component/LoginRegister';

export const AppContext = createContext();

function App() {
  const [isAddAuthorPanelActive, setIsAddAuthorPanelActive] = useState(false);
  const [isAddBookPanelActive, setIsAddBookPanelActive] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleAddAuthorPanel = (activeValue) => {
    setIsAddAuthorPanelActive(activeValue);
  }
  const handleAddBookPanel = (activeValue) => {
    setIsAddBookPanelActive(activeValue);
  }

  useEffect(()=>{
    const fetchUser = (userId) => {
      axios.get(`http://localhost:8080/api/v1/user/get/${userId}`)
      .then(res=>{
        setCurrentUser(res.data);
        if(res.data.admin===true)
          setLogin(true);
      })
      .catch(err=>console.error(err));
    }
    const userId = localStorage.getItem("currentUserId");
    if (userId!==null){
      console.log("hello")
      fetchUser(userId);
    }
  },[]);

  const userLogin = async(user) => {
    await axios.post("http://localhost:8080/api/v1/user/login", user)
    .then(res=>{
      localStorage.setItem("currentUserId",res.data?.id);
      console.log(res.data);
    })
    .catch(err=>console.error(err));
  }

  const userRegister = async(user) => {
    await axios.post("http://localhost:8080/api/v1/user/add", user)
    .then(res=>{
      console.log(res.data);
      navigate("/login");
    })
    .catch(err=>console.error(err));
  }

  const fetchAuthors = async () => {
    await axios.get("http://localhost:8080/api/v1/author/getAll")
    .then((response) => {
      setAuthors(response.data);
    })
    .catch((err)=>{console.log(err);});
  }

  const fetchBooks = async () => {
    await axios.get("http://localhost:8080/api/v1/book/getAll")
    .then((response)=>{
      setBooks(response.data);
      console.log(response.data)
    })
    .catch((err)=>{console.error(err);});
  }

  return (
    <AppContext.Provider value={{handleAddAuthorPanel, handleAddBookPanel, authors, books, fetchBooks, fetchAuthors, login, setLogin, currentUser}}>
      <SideBar />
      <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path='/home' element={<Dashboard />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/authors/:email' element={<AuthorViewer isAddBookPanelActive={isAddBookPanelActive} />} />
        <Route path='/books/:bookIsbn' element={<BookViewer />} />
        <Route path='/login' element={<LoginRegister component={"Login"} method={userLogin} />} />
        <Route path='/register' element={<LoginRegister component={"Register"} method={userRegister} />} />
      </Routes> 
      {isAddAuthorPanelActive?<AddAuthorPanel />:null}
    </AppContext.Provider>
  );
}

export default App;
