import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations, deleteReservation } from '../../store/reservations';
import EditReservationModal from './EditReservationModal';
import './ViewReservations.css';
import states from './us-state-converter';

const ViewReservations = () => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.session.user);
  const reservations = useSelector((state) =>
    Object.values(state.reservations)
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [reservation, setReservation] = useState();

  const optionOne = { month: 'short', day: 'numeric' };
  const optionThree = { year: 'numeric' };

  const handleShowEditModal = (reservation) => {
    // dispatch(setBooking({ listing_id: id }));
    setReservation(reservation);
    setShowEditModal(!showEditModal);
  };

  const handleDeleteBooking = (e) => {
    dispatch(deleteReservation(Number(e.target.id)));
  };

  useEffect(() => {
    dispatch(getReservations(id));
  }, [dispatch, id]);

  let render;
  if (reservations.length === 0) {
    render = (
      <div className='no-listings__wrapper'>
        <div className='no-listings__header-container'>
          <div className='no-listings__header'>
            You have no reservation to show!
          </div>
          <div className='no-listings__details'>
            To create one, please search for a desired destination, or select
            the 'Random Listings' button. Select a listing that interests you,
            and use the 'Reserve' section to fill in the specific dates and
            number of guests for your stay.
          </div>
        </div>
      </div>
    );
  } else {
    render = (
      <div className='view-reservations__main-container'>
        <div className='view-reservations__showcase-container'>
          <div className='view-reservations__header-container'>
            <div className='view-reservations__header'>Reservations</div>
          </div>
          {showEditModal ? (
            <EditReservationModal
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              res={reservation}
              isOpen={showEditModal}
            />
          ) : (
            ''
          )}
          <div className='view-reservations__reservations-container'>
            {reservations.map((res, i) => (
              <div key={res.id} className='view-reservations__reservation-card'>
                <div className='reservation-card__photo-container'>
                  <img
                    className='reservation-card__photo'
                    src={res?.Listing_Images[0].img_url}
                    alt=''
                  />
                </div>
                <div className='reservation-card__info-container'>
                  <div className='reservation-card__host-photo-container'>
                    <img
                      className='reservation-card__host-photo'
                      src={res?.Listing_User.img_url}
                      alt=''
                    />
                  </div>
                  <div className='reservation-card__header-container'>
                    <div className='reservation-card__header'>
                      {`${res?.Listing_User.first_name} ${res?.Listing_User.last_name}`}
                    </div>
                  </div>
                  <div className='reservation-card__date-type-container'>
                    <div className='reservation-card__dates res-card-details-txt'>
                      {`${new Date(res.start_date).toLocaleDateString(
                        'en-us',
                        optionOne
                      )} - ${new Date(res.end_date).toLocaleDateString(
                        'en-us',
                        optionOne
                      )}, ${new Date(res.start_date).toLocaleDateString(
                        'en-us',
                        optionThree
                      )} · ${
                        res.number_of_guests > 1
                          ? `${res.number_of_guests} guests`
                          : `${res.number_of_guests} guest`
                      }`}
                    </div>
                    <div className='reservation-card__home res-card-details-txt'>
                      {res?.Listing.title}
                    </div>
                    <div className='reservation-card__home res-card-details-txt'>
                      {`${res?.Listing.city}, ${states.fullName(
                        res?.Listing.state
                      )}`}
                    </div>
                  </div>
                  {new Date(res?.end_date) > new Date() ? (
                    <div className='reservation-card__buttons-container'>
                      <div
                        onClick={() => handleShowEditModal(res)}
                        className='reservation-card__edit-button reservation-card__buttons'
                      >
                        Edit
                      </div>
                      <div
                        id={res.id}
                        onClick={handleDeleteBooking}
                        className='reservation-card__delete-button reservation-card__buttons'
                      >
                        Cancel
                      </div>
                    </div>
                  ) : (
                    <div className='past-reservation-text'>
                      Past reservation
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{render}</>;
};

export default ViewReservations;
