import { useState, useEffect } from 'react';
import { backgroundImages } from './data';
import CrossfadeCarousel from '@notbaldrick/react-crossfade-carousel';
import './SplashPage.css';

const SplashPage = () => {
  return (
    <div className='splash-page__container'>
      <div className='splash-page__welcome-container'>
        <div className='splash-page__welcome-message'>See the world</div>
      </div>
      <CrossfadeCarousel
        className='splash-page__container-image'
        images={backgroundImages}
        interval={4000}
        transition={2000}
      />
      <h1 className='slash-page__dark-overlay'> </h1>
    </div>
  );
};

export default SplashPage;
