import './App.css';
import Login from './components/login/Login';
import Canvas from './components/canvas/Canvas';
import { useState, useEffect } from 'react';

function App() {

  const [token, setToken] = useState(' ')
  const [expiresIn, setExpiresIn] = useState(0)

  // request token initially
  useEffect(() => {
    async function getAuthenticated() {
      await fetch(`${process.env.REACT_APP_BACKEND}/auth/token`)
        .then((response) => response.json())
        .then((response) => {
          if (response.token) {
            setToken(response.token)
            setExpiresIn(response.expiresIn)
          }
        })
    }

    getAuthenticated()
  }, []);

  // get refresh token for SDK callback function
  useEffect(() => {
    if(!token || ! expiresIn) return
    const interval = setInterval( async() => {
      await fetch(`${process.env.REACT_APP_BACKEND}/auth/refresh`, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((response) => {
        setToken(response.access_token)
      })

    }, (expiresIn - 60) * 1000)

    return() => clearInterval(interval)
  }, [token, expiresIn])
  
  return (
    <div className="App">
      {(token === ' ') ? <Login /> : <Canvas token={token} setToken={setToken} />}
    </div>
  );
}

export default App;
