import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgSearch } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import { setBooking } from '../../store/bookings';
import {
  searchListingsCityState,
  searchListingsCityStateGuests,
  searchListingsCityStateGuestsStartDateEndDate,
  searchAllListings,
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
  const [searchButtonActive, setSearchButtonActive] = useState('inactice');
  const [clickedOutside, setClickedOutside] = useState(false);

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
    // if (!bookings.guestCount && !bookings.start_date && !bookings.end_date) {
    //   dispatch(searchListingsCityState(bookings));
    //   history.push(`/search/${city}/${state}`);
    // } else if (bookings.guestCount) {
    //   dispatch(searchListingsCityStateGuests(bookings));
    //   history.push(`/search/${city}/${state}/guests=${guests}`);
    // } else {
    //   dispatch(searchListingsCityState(bookings));
    //   history.push(`/search/${city}/${state}`);
    // }
    // dispatch(searchListingsCityStateGuestsStartDateEndDate(bookings));
    dispatch(searchListingsCityState(bookings));
    history.push(`/search/${city}/${state}`);
  };

  const handleRandomSearch = () => {
    dispatch(searchAllListings());
    localStorage.setItem('city', null);
    localStorage.setItem('state', null);
    localStorage.setItem('start_date', null);
    localStorage.setItem('end_date', null);
    localStorage.setItem('guests', null);
    history.push(`/search/random/`);
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

  useEffect(() => {
    localStorage.setItem('city', bookings.city);
    localStorage.setItem('state', bookings.state);
    localStorage.setItem('start_date', bookings.start_date);
    localStorage.setItem('end_date', bookings.end_date);
    localStorage.setItem('guests', bookings.guestCount);
  }, [
    bookings.city,
    bookings.state,
    bookings.start_date,
    bookings.end_date,
    bookings.guestCount,
  ]);

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
          <AutocompleteCityState
            setSearchButtonActive={setSearchButtonActive}
            setShowDatePicker={setShowDatePicker}
          />
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
          <div
            onClick={handleSearch}
            className={`search-button-container ${searchButtonActive}`}
          >
            <CgSearch className='search-button-icon' />
          </div>
        </div>
      </div>
      <div className='home-page__slogan'>
        <div className='splash-page__welcome-message search'>See the world</div>
      </div>
      <div className='home-page__random-search'>
        <div
          onClick={handleRandomSearch}
          className='home-page__random-search-button'
        >
          Random Listings
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
