import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='login-form__page-container'>
      <div className='login-form__form-container'>
        <div className='login-form__header-container'>
          <div className='login-form__header'>Welcome back</div>
        </div>
        <form onSubmit={onLogin}>
          <div className='login-form__errors-container'>
            {errors.map((error, ind) => (
              <div className='login-form__errors' key={ind}>
                {error[0].toUpperCase()}
                {error.substring(1)}
              </div>
            ))}
          </div>
          <div className='login-form__email-container login-form__input-container'>
            <input
              className={`login-form__input login-form__input-email`}
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <label
              className={`login-form__label ${email && 'filled'}`}
              htmlFor='email'
            >
              Email
            </label>
          </div>
          <div className='login-form__password-container login-form__input-container'>
            <input
              className='login-form__input login-form__input-password'
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <label
              className={`login-form__label ${password && 'filled'}`}
              htmlFor='password'
            >
              Password
            </label>
          </div>
          <div className='login-form__button-container'>
            <button className='login-form__button' type='submit'>
              Login
            </button>
          </div>
          <div className='login-form__goto-login'>
            <div className='goto-login__text'>Not a member?</div>
            <Link className='go-to__link' to='/login'>
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
