import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error.jsx";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [ error, setError ] = useState({})
  const [ loginData, setLoginData ] = useState({
    email: '',
    password: ''
  })
  const [ isLogged, setIsLogged ] = useState(false)

  function validateFormLogin(email, password) {
    const errors = {};
    const users = JSON.parse(localStorage.getItem('users'))

    // verifico che i campi non siano vuoti

    if (!email) {
      errors.email = 'Inserisci la tua email.'
    }

    if (!password) {
      errors.password = 'Immetti la tua password'
    }

    // se sono piene verifico se esiste un account associato

    const user = users[loginData.email];

    if (!user) {
      errors.email = 'Indirizzo email errato.'
    }

    else if (user.password !== loginData.password) {
      errors.password = 'Password errata.'
    }

    return errors
  }

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target

    setLoginData(prevCredential => ( {
      ...prevCredential,
      [name]: value
    } ))
  }

  function handleSubmit(event) {
    event.preventDefault();


    const { email, password } = loginData;
    const errors = validateFormLogin(email, password)

    if (Object.keys(errors).length !== 0) {
      // ci sono errori di validazione

      setError(errors);
      setLoginData(prevState => ( { ...prevState, email: '', password: '' } ))
    }
    else {
      setIsLogged(prevState => !prevState);
      onLogin(!isLogged, loginData.email); //uso !isLogged perchè prevState è asincrono
      navigate('/');
    }


  }

  function handleSignUp(e) {
    e.preventDefault();
    navigate("/register");
  }

  function handleResetError() {
    setError({})
  }

  return (
    <div className="section-form">
      <form className="form--login" onSubmit={ handleSubmit }>
        <h2 className="section-form__title">Login</h2>
        <div className="section-form__container">
          <label className="section-form__label" id="email" htmlFor="email">Email</label>
          <input className="section-form__input" onFocus={ handleResetError } value={ loginData.email }
                 onChange={ handleInputChange } id="email"
                 name="email" type="email"/>
        </div>
        <div className="section-form__container">
          <label className="section-form__label" htmlFor="password">Password</label>
          <input className="section-form__input" onFocus={ handleResetError } value={ loginData.password }
                 onChange={ handleInputChange } id="password"
                 name="password" type="password"/>
        </div>

        { Object.keys(error).length !== 0 ?
          (
            <div>
              { Object.keys(error).map((key) => (
                <Error key={ key } text={ error[key] }/>
              )) }
            </div>
          ) : (
            <div className="section-submit">
              <button type="submit" className="section-form__button">Login</button>
              <a className="section-form__a" onClick={ handleSignUp }>Don t you have an account? sign-up</a>
            </div>
          )
        }
      </form>
    </div>
  )

}

