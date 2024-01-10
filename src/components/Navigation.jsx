import {NavLink} from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__el">
          <NavLink className="main-nav__link" to="/">Home</NavLink>
        </li>
        <div className="main-nav__list--auth">
          <li className="main-nav__el--auth">
            <NavLink className="main-nav__link" to="/login">Login</NavLink>
          </li>
          <li className="main-nav__el--auth">
            <NavLink className="main-nav__link" to="/register">Sign-Up</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;