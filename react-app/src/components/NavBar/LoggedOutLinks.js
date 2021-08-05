import { NavLink } from 'react-router-dom';
import './LoggedOutLinks.css';

const LoggedOutLinks = () => {
  return (
    <div className='logged-out__links-container'>
      <NavLink className='logged-out_links logged-out__login' to='/login'>
        Log In
      </NavLink>
      <NavLink className='logged-out_links logged-out__signup' to='/signup'>
        Sign Up
      </NavLink>
    </div>
  );
};

export default LoggedOutLinks;
