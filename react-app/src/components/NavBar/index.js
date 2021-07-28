import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import ProfileButton from './ProfileButton';
import LogoutButton from '../auth/LogoutButton';
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
          <div className='site-name'>staybnb</div>
        </div>
        <div className='navbar-container-right'>
          {loaded && sessionLinks}
          {/* <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </div>
          <div>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
          <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
