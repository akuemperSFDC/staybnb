import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { setBooking } from '../../store/bookings';

const EditGuests = () => {
  const dispatch = useDispatch();

  const [guestCount, setGuestCount] = useState(1);

  const handleCountDown = (e) => {
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
    <div className='search-bar-guests-container'>
      <div className='edit-count-selector-container guests-answer'>
        <div className='edit-choice-counter-text'>Guests</div>
        <div className='count-buttons search'>
          <div
            id='guest'
            onClick={handleCountDown}
            className={`search-minus-button ${
              guestCount === 1 ? 'inactive' : ''
            } `}
          >
            <BiMinus
              // id='guest'
              className={`search-minus-icon ${
                guestCount === 1 ? 'inactive' : ''
              } `}
            />
          </div>
          <div className='total'>{guestCount}</div>
          <div
            id='guest'
            onClick={handleCountUp}
            className={`search-plus-button ${
              guestCount === 16 ? 'inactive' : ''
            }`}
          >
            <BsPlus
              // id='guest'
              className={`search-plus-icon ${
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
