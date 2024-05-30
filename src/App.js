import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './component/Dashboard';
import SideBar from './component/SideBar';
import Authors from './component/Authors';
import Books from './component/Books';
import AddAuthorPanel from './component/AddAuthorPanel';

function App() {
  return (
    <>
      <SideBar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
      </Routes>
      <AddAuthorPanel />
    </>
  );
}

export default App;
