import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgSearch } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import {
  searchListingsCityState,
  searchListingsCityStateGuests,
  searchListingsCityStateGuestsStartDateEndDate,
} from '../../store/searchResults';
import AutocompleteCityState from './AutocompleteCityState';
import Guests from './Guests';

import DatePick from './DatePick';
import '../CreateListing/CreateListing.css';
import './Home.css';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const [showDatePicker, setShowDatePicker] = useState('false');
  const [focus, setOnFocus] = useState('');
  const [locationVerticleDiv, setLocationVerticleDiv] = useState('');
  const [checkInDateVerticleDiv, setCheckInDateVerticleDiv] = useState('');
  const [checkOutDateVerticleDiv, setCheckOutDateVerticleDiv] = useState('');
  const [guestsDateVerticleDiv, setGuestsDateVerticleDiv] = useState('');
  const [showGuestSelect, setShowGuestSelect] = useState('false');

  const options = { month: 'long', day: 'numeric' };
  const guests = bookings.guestCount;
  const cityState = bookings.cityState;
  const city = bookings.city;
  const state = bookings.state;

  // let splitStart;
  // let splitEnd;
  // if (bookings.start_date && bookings.end_date) {
  //   splitStart = bookings?.start_date.split(',').trim();
  //   splitEnd = bookings?.end_date.split(',').trim();
  // }

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

  const handleShowGuests = () => {
    console.log('triggered handleShowGuests');
    if (showGuestSelect === 'false') {
      setShowGuestSelect('true');
    } else {
      setShowGuestSelect('false');
    }
  };

  const handleSearch = () => {
    if (!bookings.guestCount && !bookings.start_date && !bookings.end_date) {
      dispatch(searchListingsCityState(bookings));
      history.push(`/search/${city}--${state}`);
    } else if (!bookings.start_date && !bookings.end_date) {
      dispatch(searchListingsCityStateGuests(bookings));
      history.push(`/search/${city}--${state}/guests=${guests}`);
    }
    // dispatch(searchListingsCityStateGuestsStartDateEndDate(bookings));
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
          <AutocompleteCityState setShowDatePicker={setShowDatePicker} />
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
            <div
              className={`start-button search-bar-placeholder-label ${
                bookings.start_date && bookings.start_date ? 'bold' : null
              }`}
            >
              {bookings.start_date_object && bookings.start_date_object
                ? bookings.start_date_object.toLocaleDateString(
                    'en-us',
                    options
                  )
                : 'Add dates'}
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
            <div
              className={`end-button search-bar-placeholder-label ${
                bookings.end_date && bookings.end_date ? 'bold' : null
              }`}
            >
              {bookings.end_date_object && bookings.end_date_object
                ? bookings?.end_date_object.toLocaleDateString('en-us', options)
                : 'Add dates'}
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
          onClick={handleShowGuests}
        >
          <div className='guests-label search-bar-label'>Guests</div>
          <div
            className={`end-button search-bar-placeholder-label ${
              bookings.guestCount && bookings.guestCount ? 'bold' : null
            }`}
          >
            {bookings.guestCount && bookings.guestCount
              ? `${
                  bookings.guestCount === 1
                    ? `${bookings.guestCount} guest`
                    : `${bookings.guestCount} guests`
                }`
              : 'Add guests'}
          </div>
        </div>
        <div className='search-button-wrapper'>
          <div onClick={handleSearch} className='search-button-container'>
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
      {showGuestSelect === 'true' ? <Guests /> : null}
    </div>
  );
};

export default Home;
