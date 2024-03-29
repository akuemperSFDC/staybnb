import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import './SignupForm.css';
import './LoginForm.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const demoEmail = 'demo@aa.io';
  const demoPassword = 'password';

  const user = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    return () => {
      setErrors();
      setFirstName();
      setLastName();
      setEmail();
      setPassword();
      setRepeatPassword();
    };
  }, []);

  const onSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    const res = await fetch('/api/images/user', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const urlObj = await res.json();
      const img_url = urlObj.url;
      const data = dispatch(
        signUp(firstName, lastName, email, password, img_url)
      );
      if (data) {
        setErrors(data);
      }
      setImageLoading(false);
    } else {
      setImageLoading(false);
      // error handling
      // setErrors();
    }

    if (password !== repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(['Passwords do not match', ...data]);
      }
    } else if (
      password === repeatPassword &&
      password &&
      email &&
      lastName &&
      firstName
    ) {
      setErrors([]);
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors([]);
      const data = await dispatch(signUp(firstName, lastName, email, password));
      // console.log(data);
      if (data) {
        setErrors(data);
      }
    }
  };

  const onDemoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(demoEmail, demoPassword));
    history.push('/');
  };

  const humanize = (str) => {
    // console.log('hit humanize function');
    let i,
      frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // useEffect(() => {
  //   // console.log(errors);
  // });

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form__page-container'>
      <div className='singup-form__form-container'>
        <div className='login-form__header-container'>
          <div className='login-form__header'>Welcome to Staybnb</div>
        </div>
        <form encType='multipart/form-data' onSubmit={onSignUp}>
          <div className='login-form__errors-container'>
            {errors && errors.length > 0
              ? errors.map((error, ind) => (
                  <div className='login-form__errors' key={ind}>
                    {humanize(error)}
                  </div>
                ))
              : ''}
          </div>
          <div className='login-form__email-container login-form__input-container'>
            <input
              className={`login-form__input login-form__input-email`}
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
            ></input>
            <label className={`login-form__label ${firstName && 'filled'}`}>
              First Name
            </label>
          </div>
          <div className='login-form__middle-container login-form__input-container'>
            <input
              className={`login-form__input login-form__input-middle`}
              type='text'
              name='firstName'
              onChange={updateLastName}
              value={lastName}
            ></input>
            <label className={`login-form__label ${lastName && 'filled'}`}>
              Last Name
            </label>
          </div>
          <div className='login-form__middle-container login-form__input-container'>
            <input
              className={`login-form__input login-form__input-middle`}
              type='text'
              name='firstName'
              onChange={updateEmail}
              value={email}
            ></input>
            <label className={`login-form__label ${email && 'filled'}`}>
              Email
            </label>
          </div>
          <div className='login-form__input-container'>
            <input
              className={`login-form__input login-form__input-middle`}
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label className={`login-form__label ${password && 'filled'}`}>
              Password
            </label>
          </div>
          <div className='login-form__input-container'>
            <input
              className={`login-form__input login-form__input-middle`}
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <label
              className={`login-form__label ${repeatPassword && 'filled'}`}
            >
              Repeat Password
            </label>
          </div>
          <div className='login-form__input-container signup-form__input-bottom'>
            <input
              className='create-listing__add-photo-input login-form__input signup-form__photo-input'
              type='file'
              accept='image/*'
              onChange={updateImage}
            />
            {imageLoading && <p>Loading...</p>}
          </div>
          <div className='login-form__button-container'>
            <button
              className='login-form__button login-form__signup-button'
              type='submit'
            >
              Signup
            </button>
            <button
              className='login-form__button login-form__demo-button'
              onClick={onDemoSignIn}
              to='/'
            >
              Demo
            </button>
          </div>
          <div className='login-form__goto-login'>
            <div className='goto-login__text'>Already a member?</div>
            <Link className='go-to__link' to='/login'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
