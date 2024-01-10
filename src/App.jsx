import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Navigation from "./components/Navigation.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { useState } from "react";

function App() {
  const [ isLogged, setIsLogged ] = useState({
    logged: false,
    email: ''
  })

  function handleLogin(loggedIn, emailLogged) {
    setIsLogged(prevState => ( { ...prevState, logged: loggedIn, email: emailLogged } ))
    // creo funzione che passerò a Login, e in Login la usero ogni qualvolta aggiorno lo stato di Auth.
    // Setto lo stato che ho creato con il valore di auth
  }

  return (
    <BrowserRouter>
      <div className="main-section">
        <Navigation/>
        <Routes>
          <Route element={ <PrivateRoute isAuthenticated={ isLogged.logged }/> }>
            <Route exact path="/" element={ <Home email={isLogged.email}/> }/>
          </Route>
          <Route exact path="login" element={ <Login onLogin={ handleLogin }/> }/>
          <Route exact path="register" element={ <Register/> }/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

