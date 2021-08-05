import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './LoginSignupModal.css';

const LoginSignupModal = () => {
  const { pathname } = useLocation();

  let renderComp;
  if (pathname === '/signup') {
    renderComp = <SignUpForm />;
  } else if (pathname === '/login') {
    renderComp = <LoginForm />;
  }

  return (
    <div className='modal__page-container'>
      <div className='modal__form-container'>{renderComp}</div>
    </div>
  );
};

export default LoginSignupModal;
