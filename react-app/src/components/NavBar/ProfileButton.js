import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { BsList } from 'react-icons/bs';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  console.log(user);

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
          <div className='profile-dropdown arrow-top content-decoration'>
            <div>{user.email}</div>

            <Link className='creat-listing' to='/create-listing'>
              Create Listing
            </Link>
            <div>
              <button className='btn-logout' onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
