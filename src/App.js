import './App.css';
import Login from './components/login/Login';
import Canvas from './components/canvas/Canvas';
import { useState, useEffect } from 'react';

function App() {

  const [token, setToken] = useState(' ')

  useEffect(() => {
    async function getAuthenticated() {
      await fetch(`${process.env.REACT_APP_BACKEND}/auth/token`)
        .then((response) => response.json())
        .then((response) => {
          if (response.token) {
            setToken(response.token)
          }
        })
    }

    getAuthenticated()
  }, []);


  return (
    <div className="App">
      {(token === ' ') ? <Login /> : <Canvas token={token}/>}
    </div>
  );
}

export default App;
