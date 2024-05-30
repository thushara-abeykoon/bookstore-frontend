import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import SideBar from './component/SideBar';
import Authors from './component/Authors';
import Books from './component/Books';
import AddAuthorPanel from './component/AddAuthorPanel';

export const AppContext = createContext();

function App() {
  const [isAddAuthorPanelActive, setIsAddAuthorPanelActive] = useState(false);
  const handleAddAuthorPanel = (activeValue) => {
    setIsAddAuthorPanelActive(activeValue);
  }

  return (
    <AppContext.Provider value={handleAddAuthorPanel}>
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
