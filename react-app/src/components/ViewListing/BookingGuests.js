import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { setBooking } from '../../store/bookings';
import '../Home/Home.css';

const EditGuests = ({ guestCount, setGuestCount }) => {
  const dispatch = useDispatch();

  const handleCountDown = (e) => {
    if (guestCount === 1) {
      setGuestCount(1);
      dispatch(setBooking({ guestCount }));
      localStorage.setItem('guests', guestCount);
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount - 1);
      dispatch(setBooking({ guestCount }));
      localStorage.setItem('guests', guestCount);
    }
  };

  const handleCountUp = (e) => {
    if (guestCount === 16) {
      setGuestCount(16);
      localStorage.setItem('guests', guestCount);
      dispatch(setBooking({ guestCount }));
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount + 1);
      localStorage.setItem('guests', guestCount);
      dispatch(setBooking({ guestCount }));
    }
  };

  useEffect(() => {
    const pGuests = localStorage.getItem('guests');
    if (pGuests !== 'null') {
      setGuestCount(Number(pGuests));
      dispatch(setBooking({ guestCount }));
    }
    if (pGuests === 'null') {
      setGuestCount(1);
      dispatch(setBooking({ guestCount }));
      localStorage.setItem('guests', 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('guests', guestCount);
  }, [guestCount]);

  return (
    <div className='view-listing__guests-container'>
      <div className='edit-count-selector-container guests-answer'>
        <div className='edit-choice-counter-text'>Guests</div>
        <div className='count-buttons search'>
          <div
            id='guest'
            onClick={handleCountDown}
            className={`bookings-minus-button ${
              guestCount === 1 ? 'inactive' : ''
            } `}
          >
            <BiMinus
              className={`bookings-minus-icon ${
                guestCount === 1 ? 'inactive' : ''
              } `}
            />
          </div>
          <div className='total'>
            {guestCount && guestCount !== 1 ? guestCount : 1}
          </div>
          <div
            id='guest'
            onClick={handleCountUp}
            className={`bookings-plus-button ${
              guestCount === 16 ? 'inactive' : ''
            }`}
          >
            <BsPlus
              className={`bookings-plus-icon ${
                guestCount === 16 ? 'inactive' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGuests;
