import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { currentReservation } from '../../store/reservations';

const EditGuests = ({ currRes }) => {
  const dispatch = useDispatch();

  const [guestCount, setGuestCount] = useState(currRes.number_of_guests);

  const handleCountDown = (e) => {
    if (guestCount === 1) {
      setGuestCount(1);
      dispatch(
        currentReservation({ ...currRes, number_of_guests: guestCount })
      );
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount - 1);
      dispatch(
        currentReservation({ ...currRes, number_of_guests: guestCount })
      );
    }
  };

  const handleCountUp = (e) => {
    if (guestCount === 16) {
      setGuestCount(16);
      dispatch(
        currentReservation({ ...currRes, number_of_guests: guestCount })
      );
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount + 1);
      dispatch(
        currentReservation({ ...currRes, number_of_guests: guestCount })
      );
    }
  };

  useEffect(() => {
    dispatch(currentReservation({ ...currRes, number_of_guests: guestCount }));
  }, [guestCount]);

  return (
    <div className='edit-res-guests-container'>
      <div className='edit-res-count-selector-container guests-answer'>
        <div className='edit-choice-counter-text edit-res__guests-text'>
          Guests
        </div>
        <div className='count-buttons search'>
          <div
            id='guest'
            onClick={handleCountDown}
            className={`edit-res__minus-button ${
              guestCount === 1 ? 'inactive' : ''
            } `}
          >
            <BiMinus
              // id='guest'
              className={`edit-res__minus-icon ${
                guestCount === 1 ? 'inactive' : ''
              } `}
            />
          </div>
          <div className='total'>{guestCount}</div>
          <div
            id='guest'
            onClick={handleCountUp}
            className={`edit-res__plus-button ${
              guestCount === 16 ? 'inactive' : ''
            }`}
          >
            <BsPlus
              // id='guest'
              className={`edit-res__plus-icon ${
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
