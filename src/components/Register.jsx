import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [ error, setError ] = useState({})
  const [ registerData, setRegisterData ] = useState({
    lastName: '',
    email: '',
    password: ''
  });

  function validateFormRegister(lastName, email, password) {
    const errors = {};

    if (!lastName) {
      errors.lastName = 'L\'utente deve avere un cognome.'
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!email) {
      errors.email = 'L\'email è obbligatoria.'
    }
    else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Inserisci un indirizzo email valido.'
    }

    else if (users[registerData.email]) {
      errors.email = 'esiste già un account con questa email.'
    }

    if (!password) {
      errors.password = 'La password è obbligatoria.'
    }
    else if (password.length < 8 || !/^(?=.*[A-Z])/.test(password)) {
      errors.password = 'La password deve avere almeno 8 caratteri e includere una lettera maiuscola.'
    }

    return errors
  }

  function handleInputChange(e) {
    e.preventDefault()
    const { name, value } = e.target;
    setRegisterData(prevUser => ( {
      ...prevUser, [name]: value
    } ))
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { lastName, email, password } = registerData;
    const errors = validateFormRegister(lastName, email, password);

    if (Object.keys(errors).length !== 0) { // controllo che la validate non abbia prodotto errori
      setError(errors);
      setRegisterData(prevState => ( { ...prevState, email: '', lastName: '', password: '' } ))
    }
    else {
      // Se la validate non ha prodotto errori creo nuovo account con chiave email

      const users = JSON.parse(localStorage.getItem('users')) || {}; // Ottieni l'oggetto users da localStorage

      users[registerData.email] = registerData;
      localStorage.setItem('users', JSON.stringify(users)) // Salvo l'oggetto users aggiornato in localStorage, una volta reso stringa con JSON.stringify

      navigate("/login/")

    }

  }

  function handleResetError() {
    setError({})
  }

  function handleSignIn(e) {
    e.preventDefault();
    navigate("/login")
  }

  return (
    <div className="section-form">
      <form onSubmit={ handleSubmit } className="form--register">
        <h2 className="section-form__title">Register Form</h2>
        <div className="section-form__container">
          <label className="section-form__label" id="lastName" htmlFor="lastName">Last Name</label>
          <input className="section-form__input"
                 value={ registerData.lastName }
                 onFocus={ handleResetError }
                 onChange={ handleInputChange }
                 placeholder="Rossi"
                 id="lastName"
                 name="lastName"
                 type="text"/>
        </div>
        <div className="section-form__container">
          <label className="section-form__label" id="email" htmlFor="email">Email</label>
          <input className="section-form__input"
                 value={ registerData.email }
                 onFocus={ handleResetError }
                 onChange={ handleInputChange }
                 placeholder="example@gmail.com"
                 id="email"
                 name="email" type="email"/>
        </div>
        <div className="section-form__container">
          <label className="section-form__label" htmlFor="password">Password</label>
          <input className="section-form__input"
                 value={ registerData.password }
                 onFocus={ handleResetError }
                 onChange={ handleInputChange }
                 placeholder="********"
                 id="password"
                 name="password"
                 type="password"/>
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
              <button type="submit" className="section-form__button">Enter</button>
              <a className="section-form__a" onClick={ handleSignIn }>have already an account? sign-in</a>
            </div>
          )
        }
      </form>
    </div>
  )
}