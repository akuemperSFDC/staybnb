import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { setBooking } from '../../store/bookings';
import '../Home/Home.css';

const EditGuests = () => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const [guestCount, setGuestCount] = useState(1);

  const handleCountDown = (e) => {
    console.log(e.target.id);
    if (guestCount === 1) {
      setGuestCount(1);
      dispatch(setBooking({ guestCount }));
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount - 1);
      dispatch(setBooking({ guestCount }));
    }
  };

  const handleCountUp = (e) => {
    if (guestCount === 16) {
      setGuestCount(16);
      dispatch(setBooking({ guestCount }));
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount + 1);
      dispatch(setBooking({ guestCount }));
    }
  };

  useEffect(() => {
    dispatch(setBooking({ guestCount }));
  }, [guestCount, dispatch]);

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
              // id='guest'
              className={`bookings-minus-icon ${
                guestCount === 1 ? 'inactive' : ''
              } `}
            />
          </div>
          <div className='total'>{bookings.guestCount}</div>
          <div
            id='guest'
            onClick={handleCountUp}
            className={`bookings-plus-button ${
              guestCount === 16 ? 'inactive' : ''
            }`}
          >
            <BsPlus
              // id='guest'
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
