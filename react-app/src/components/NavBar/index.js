import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import ProfileButton from './ProfileButton';
import './NavBar.css';

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const email = 'demo@aa.io';
  const password = 'password';

  const onDemoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    history.push('/');
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className='session-links'>
        <NavLink to='/login'>Log In</NavLink>
        <i className='fal fa-horizontal-rule fa-6x pipechar'></i>
        <NavLink to='/signup'>Sign Up</NavLink>
        <i className='fal fa-horizontal-rule fa-6x pipechar'></i>
        <button className='demo-btn' onClick={onDemoSignIn} to='/'>
          Demo
        </button>
      </div>
    );
  }

  return (
    <nav>
      <div className='navbar-container'>
        <div className='navbar-container-left'>
          <Link className='site-name' to='/'>
            <div>staybnb</div>
          </Link>
        </div>
        <div className='navbar-container-right'>{loaded && sessionLinks}</div>
      </div>
    </nav>
  );
};

export default NavBar;
