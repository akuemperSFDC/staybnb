import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgSearch } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import { setBooking } from '../../store/bookings';
import {
  searchListingsCityState,
  searchListingsCityStateGuests,
  searchListingsCityStateGuestsStartDateEndDate,
} from '../../store/searchResults';
import AutocompleteCityState from './AutocompleteCityState';
import CrossfadeCarousel from '@notbaldrick/react-crossfade-carousel';
import { backgroundImages } from './data';
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
    } else if (bookings.guestCount) {
      dispatch(searchListingsCityStateGuests(bookings));
      history.push(`/search/${city}--${state}/guests=${guests}`);
    } else {
      dispatch(searchListingsCityState(bookings));
      history.push(`/search/${city}--${state}`);
    }
    // dispatch(searchListingsCityStateGuestsStartDateEndDate(bookings));
  };

  const handleClickOutside = (e) => {
    let concernedElement = document.querySelector(
      '.home-page-container'
    ).className;
    document.addEventListener('click', (e) => {
      if (
        (concernedElement === e.target.className &&
          showDatePicker === 'true') ||
        (e.target.className === 'location-input' &&
          showDatePicker === 'true') ||
        (e.target.className === 'navbar-container' &&
          showDatePicker === 'true') ||
        (e.target.className === 'search-bar-label' &&
          showDatePicker === 'true') ||
        (e.target.className === 'search-input-guests-container' &&
          showDatePicker === 'true')
        // (e.target.className.includes('date-container') &&
        //   showGuestSelect === 'true') ||
        // (e.target.className.includes('search-bar-placeholder-label') &&
        //   showGuestSelect === 'true')
      ) {
        // e.stopPropagation();
        if (showDatePicker === 'false') {
          setShowDatePicker('true');
        } else {
          setShowDatePicker('false');
        }
        // if (showGuestSelect === 'false') {
        //   setShowGuestSelect('true');
        // } else {
        //   setShowGuestSelect('false');
        // }
      }
    });
  };

  useEffect(() => {
    dispatch(
      setBooking({
        listing_id: null,
        user_id: null,
        guestCount: null,
        start_date: null,
        end_date: null,
        start_date_object: null,
        end_date_object: null,
        cityState: null,
        city: null,
        state: null,
      })
    );
  }, []);

  return (
    <div className='home-page-container' onClick={handleClickOutside}>
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
        <div className='start-end-date-input-container date-container'>
          <div
            className='start-date-container date-container'
            onMouseEnter={() => setCheckInDateVerticleDiv('hidden')}
            onMouseLeave={() => setCheckInDateVerticleDiv('')}
            onClick={handleShowDatePicker}
          >
            <div
              onClick={handleShowDatePicker}
              className='start-label search-bar-label'
            >
              Check in
            </div>
            <div
              className={`start-button search-bar-placeholder-label ${
                bookings.start_date && bookings.start_date ? 'bold' : ''
              }`}
            >
              {bookings.start_date && bookings.start_date
                ? `${new Date(bookings.start_date).toLocaleDateString(
                    'en-us',
                    options
                  )}`
                : 'Add dates'}
            </div>
          </div>
          <div
            className={`verticle-divider ${checkInDateVerticleDiv} ${checkOutDateVerticleDiv}`}
          ></div>
          <div
            className='end-date-container date-container'
            onMouseEnter={() => setCheckOutDateVerticleDiv('hidden')}
            onMouseLeave={() => setCheckOutDateVerticleDiv('')}
            onClick={handleShowDatePicker}
          >
            <div
              onClick={handleShowDatePicker}
              className='end-label search-bar-label'
            >
              Check out
            </div>
            <div
              className={`end-button search-bar-placeholder-label ${
                bookings.end_date && bookings.end_date ? 'bold' : ''
              }`}
            >
              {bookings.end_date && bookings.end_date
                ? `${new Date(bookings.end_date).toLocaleDateString(
                    'en-us',
                    options
                  )}`
                : 'Add dates'}
            </div>
          </div>
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
          <div
            onClick={handleShowGuests}
            className='guests-label search-bar-label'
          >
            Guests
          </div>
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
