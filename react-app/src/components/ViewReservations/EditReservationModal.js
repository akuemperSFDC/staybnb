import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editReservation } from '../../store/reservations';
import DatePick from './DatePick';
import EditReservationGuests from './EditReservationGuests';
import './EditReservationModal.css';

const EditReservationModal = ({ res, setShowEditModal }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.session.user);

  const reservations = useSelector((state) => state.reservations);

  const currRes = reservations[res.id];

  const [showDatePicker, setShowDatePicker] = useState('false');
  const [updateButtonActive, setUpdateButtonActive] = useState('');

  const options = { month: 'long', day: 'numeric' };

  const handleShowDatePicker = () => {
    if (showDatePicker === 'false') {
      setShowDatePicker('true');
    } else {
      setShowDatePicker('false');
    }
  };

  const handleUpdateReservation = () => {
    dispatch(editReservation(currRes));
    setShowEditModal(false);
  };

  useEffect(() => {
    if (res.start_date && res.end_date && res.number_of_guests) {
      setUpdateButtonActive('');
    } else {
      setUpdateButtonActive('inactive');
    }
  }, [res.start_date, res.end_date, res.number_of_guests]);

  useEffect(() => {}, []);

  return (
    <div className='edit-res-modal__page-container'>
      <div className='edit-res-modal__form-container'>
        <div className='edit-res-modal__date-container'>
          <div
            className='edit-res-modal__start-container'
            onClick={handleShowDatePicker}
          >
            <div
              onClick={handleShowDatePicker}
              className='start-label search-bar-label edit-res-modal__start-label'
            >
              Check in
            </div>
            <div
              className={`start-button search-bar-placeholder-label edit-res-modal__placeholder-text ${
                res?.start_date && res?.start_date ? 'bold' : ''
              }`}
            >
              {res?.start_date && res?.start_date
                ? new Date(currRes?.start_date).toLocaleDateString(
                    'en-us',
                    options
                  )
                : 'Add dates'}
            </div>
          </div>
          <div
            className='edit-res-modal__end-container'
            onClick={handleShowDatePicker}
          >
            <div
              onClick={handleShowDatePicker}
              className='end-label search-bar-label edit-res-modal__end-label'
            >
              Check out
            </div>
            <div
              className={`end-button search-bar-placeholder-label edit-res-modal__placeholder-text ${
                currRes?.end_date && currRes?.end_date ? 'bold' : ''
              }`}
            >
              {currRes?.end_date && currRes?.end_date
                ? new Date(currRes?.end_date).toLocaleDateString(
                    'en-us',
                    options
                  )
                : 'Add dates'}
            </div>
          </div>
        </div>
        <div className='edit-res-modal__guests-container'>
          <EditReservationGuests res={res} currRes={currRes} />
        </div>
        <div className='edit-res-modal__buttons'>
          <div
            onClick={handleUpdateReservation}
            className={`edit-res-modal__update-button reservation-card__buttons ${updateButtonActive}`}
          >
            Update
          </div>
          <div
            onClick={() => setShowEditModal(false)}
            className='edit-res-modal__close-button reservation-card__buttons'
          >
            Close
          </div>
        </div>
      </div>
      {showDatePicker === 'true' ? (
        <div className='edit-res-modal__date-picker'>
          <DatePick
            res={res}
            currRes={currRes}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />
        </div>
      ) : null}
    </div>
  );
};

export default EditReservationModal;
