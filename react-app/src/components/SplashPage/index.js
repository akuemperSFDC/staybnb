import { backgroundImages } from './data';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import CrossfadeCarousel from '@notbaldrick/react-crossfade-carousel';
import './SplashPage.css';

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = 'demo@aa.io';
  const password = 'password';

  const user = useSelector((state) => state.session.user);

  const onDemoSignIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    history.push('/');
  };

  return (
    <>
      {!user ? (
        <div className='splash-page__container'>
          <div className='splash-page__welcome-container'>
            <div className='splash-page__welcome-message'>See the world</div>
            <button className='demo-btn' onClick={onDemoSignIn} to='/'>
              Demo
            </button>
          </div>
          <CrossfadeCarousel
            className='splash-page__container-image'
            images={backgroundImages}
            interval={4000}
            transition={2000}
          />
        </div>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default SplashPage;
