import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CgSearch } from 'react-icons/cg';

import DatePick from './DatePick';
import './Home.css';

const Home = () => {
  const bookings = useSelector((state) => state.bookings);

  const [showDatePicker, setShowDatePicker] = useState('false');
  const [focus, setOnFocus] = useState('');
  const [locationVerticleDiv, setLocationVerticleDiv] = useState('');
  const [checkInDateVerticleDiv, setCheckInDateVerticleDiv] = useState('');
  const [checkOutDateVerticleDiv, setCheckOutDateVerticleDiv] = useState('');
  const [guestsDateVerticleDiv, setGuestsDateVerticleDiv] = useState('');

  const handleFocus = (e) => {
    if (focus === 'focus') {
      setOnFocus('');
      setLocationVerticleDiv('');
    } else {
      setOnFocus('focus');
      setLocationVerticleDiv('hidden');
    }
  };

  const handleMouseLeave = () => {
    if (focus === 'focus') {
      setLocationVerticleDiv('hidden');
    } else {
      setLocationVerticleDiv('');
    }
  };

  const handleShowDatePicker = () => {
    if (showDatePicker === 'false') {
      setShowDatePicker('true');
    } else {
      setShowDatePicker('false');
    }
  };

  return (
    <div className='home-page-container'>
      <div className='search-input-bar-container'>
        <div
          className={`location-input-container search-label-input-container ${focus}`}
          onMouseEnter={() => setLocationVerticleDiv('hidden')}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleFocus}
        >
          <div className='location-label search-bar-label'>Location</div>
          <input
            className='location-input'
            placeholder='Where are you going?'
          ></input>
        </div>
        <div
          className={`verticle-divider ${checkInDateVerticleDiv} ${locationVerticleDiv}`}
        ></div>
        <div className='start-end-date-input-container '>
          <div
            className='start-date-container'
            onMouseEnter={() => setCheckInDateVerticleDiv('hidden')}
            onMouseLeave={() => setCheckInDateVerticleDiv('')}
            onClick={handleShowDatePicker}
          >
            <div className='start-label search-bar-label'>Check in</div>
            <div className='start-button search-bar-placeholder-label'>
              {/* {bookings.start_date === true && bookings.end_date === true
                ? bookings.start_date
                : 'Add dates'} */}
            </div>
          </div>
          <div
            className={`verticle-divider ${checkInDateVerticleDiv} ${checkOutDateVerticleDiv}`}
          ></div>
          <label
            className='end-date-container'
            onMouseEnter={() => setCheckOutDateVerticleDiv('hidden')}
            onMouseLeave={() => setCheckOutDateVerticleDiv('')}
          >
            <div className='end-label search-bar-label'>Check out</div>
            <div className='end-button search-bar-placeholder-label'>
              Add dates
            </div>
          </label>
        </div>
        <div
          className={`verticle-divider ${checkOutDateVerticleDiv} ${guestsDateVerticleDiv}`}
        ></div>
        <div
          className='search-input-guests-container'
          onMouseEnter={() => setGuestsDateVerticleDiv('hidden')}
          onMouseLeave={() => setGuestsDateVerticleDiv('')}
        >
          <div className='guests-label search-bar-label'>Guests</div>
          <div className='guests-placeholder search-bar-placeholder-label'>
            Add guests
          </div>
        </div>
        <div className='search-button-wrapper'>
          <div className='search-button-container'>
            <CgSearch className='search-button-icon' />
          </div>
        </div>
      </div>
      {showDatePicker === 'true' ? (
        <DatePick
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
        />
      ) : null}
    </div>
  );
};

export default Home;
