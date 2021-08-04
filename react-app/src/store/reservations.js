// constants
const SET_RESERVATIONS = 'reservations/SET_RESERVATIONS';
const CURRENT_RES = 'reservations/CURRENT_RES';
const DELETE_RESERVATION = 'reservations/DELETE_RESERVATION';

const setReservation = (reservations) => ({
  type: SET_RESERVATIONS,
  reservations,
});

export const currentReservation = (reservation) => ({
  type: CURRENT_RES,
  reservation,
});

const removeReservation = (reservation) => ({
  type: DELETE_RESERVATION,
  reservation,
});

export const getReservations = (userId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/users/${userId}`);

  if (response.ok) {
    const reservations = await response.json();
    dispatch(setReservation(reservations));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const editReservation = (reservation) => async (dispatch) => {
  const { id, start_date, end_date, sleeps } = reservation;
  const response = await fetch(`/api/listings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reservation }),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(setReservation(booking));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const deleteReservation = (id) => async (dispatch) => {
  const res = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const booking = await res.json();
    dispatch(removeReservation(booking));
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_RESERVATIONS:
      const { bookings } = action.reservations;
      const newBookings = {};
      bookings.forEach((booking) => {
        newBookings[booking.id] = booking;
      });
      newState = { ...state, ...newBookings };
      return newState;
    case CURRENT_RES:
      const { reservation } = action;
      const editRes = {};
      editRes[reservation.id] = reservation;
      // newState = newState[action.reservation.id] = action.reservation;
      newState = { ...state, ...editRes };
      return newState;
    case DELETE_RESERVATION:
      newState = { ...state };
      delete newState[action.reservation.booking.id];
      return newState;
    default:
      return state;
  }
}
