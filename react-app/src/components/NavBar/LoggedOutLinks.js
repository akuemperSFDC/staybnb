import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoggedOutLinks.css';

const LoggedOutLinks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = 'demo@aa.io';
  const password = 'password';

  const onDemoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    history.push('/');
  };

  return (
    <div className='logged-out_links-container'>
      <NavLink to='/login'>Log In</NavLink>
      <i className='fal fa-horizontal-rule fa-6x pipechar'></i>
      <NavLink to='/signup'>Sign Up</NavLink>
      <i className='fal fa-horizontal-rule fa-6x pipechar'></i>
      <button className='demo-btn' onClick={onDemoSignIn} to='/'>
        Demo
      </button>
    </div>
  );
};

export default LoggedOutLinks;
