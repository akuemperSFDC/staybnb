import { useState, useEffect } from 'react';
import { NavLink, useHistory, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
import ProfileButton from './ProfileButton';
import LoggedOutLinks from './LoggedOutLinks';
import './NavBar.css';

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [absolute, setAbsolute] = useState('');
  const [profileBtnColor, setProfileBtnColor] = useState('');

  useEffect(() => {
    if (pathname.includes('/create-listing/')) {
      setProfileBtnColor('offset');
    } else {
      setProfileBtnColor('');
    }
  }, [pathname]);

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname.includes('/create-listing/') ||
      pathname === '/login' ||
      pathname === '/signup' ||
      pathname === '/splash'
    ) {
      setAbsolute('absolute');
    } else {
      setAbsolute('');
    }
  }, [pathname, dispatch]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton
        profileBtnColor={profileBtnColor}
        absolute={absolute}
        user={sessionUser}
      />
    );
  } else {
    sessionLinks = <LoggedOutLinks />;
  }

  return (
    <nav>
      <div className={`navbar-container ${absolute}`}>
        <div className='navbar-container-left'>
          <Link className='site-name' to='/'>
            <div className={`site-name ${absolute}`}>staybnb</div>
          </Link>
        </div>
        <div className='navbar-container-right'>{loaded && sessionLinks}</div>
        {/* <div className={`opacity-faker-navbar ${absolute}`}></div> */}
      </div>
    </nav>
  );
};

export default NavBar;
