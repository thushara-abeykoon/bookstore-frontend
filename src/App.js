import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import SideBar from './component/SideBar';
import Authors from './component/Authors';
import Books from './component/Books';
import AddAuthorPanel from './component/AddAuthorPanel';
import axios from 'axios';

export const AppContext = createContext();

function App() {
  const [isAddAuthorPanelActive, setIsAddAuthorPanelActive] = useState(false);
  const handleAddAuthorPanel = (activeValue) => {
    setIsAddAuthorPanelActive(activeValue);
  }

  const [authors, setAuthors] = useState([]);
  const fetchAuthors = async () => {
    await axios.get("http://localhost:8080/api/v1/author/getAll")
    .then((response) => {
      setAuthors(response.data);
    })
    .catch((err)=>{console.log(err);});
  }

  return (
    <AppContext.Provider value={{handleAddAuthorPanel, authors, fetchAuthors}}>
      <SideBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
      </Routes>
      {isAddAuthorPanelActive?<AddAuthorPanel />:null}
    </AppContext.Provider>
  );
}

export default App;
