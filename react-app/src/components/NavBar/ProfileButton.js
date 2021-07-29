import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { BsList } from 'react-icons/bs';


const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <div>
      <div className='profile-button' onClick={openMenu}>
        <BsList className='list-icon' />
        <img className='profile-img' src={user.img_url} alt='' />
      </div>
      <div className='profile-dropdown-container arrow-top'>
        {showMenu && (
          <div className='profile-dropdown'>
            <div className='profile-dropdown-element'>
              <p>{user.email}</p>
            </div>
            <Link
              to='/'
              className='border-top-element profile-dropdown-element profile-links'
            >
              <div className='link-decoration' to='/'>
                Home
              </div>
            </Link>
            <Link
              to='/bookings'
              className='border-top-element profile-dropdown-element profile-links'
            >
              <div className='link-decoration' to='/bookings'>
                Manage bookings
              </div>
            </Link>
            <Link
              to='/create-listing/type'
              className='border-top-element profile-dropdown-element profile-links'
            >
              <div className='link-decoration' to='/create-listing/type'>
                Create listing
              </div>
            </Link>
            <Link
              to='/listings'
              className='profile-dropdown-element profile-links'
            >
              <div className='link-decoration' to='/listings'>
                Manage listings
              </div>
            </Link>
            <div className='border-top-element profile-dropdown-element profile-links'>
              <div className='btn-logout' onClick={logout}>
                Log out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
