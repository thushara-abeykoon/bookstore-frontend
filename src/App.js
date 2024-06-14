import { useEffect, useState } from 'react';
import './App.css';
import LoginRegister from './component/LoginRegister';
import AppUser from './AppUser';

function App() {

  const [token, setToken] = useState();
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"));
  },[]);

  return (
    <div>
      {!token?
          <LoginRegister  />:<AppUser token={token} />}
    </div>
  );
}

export default App;
