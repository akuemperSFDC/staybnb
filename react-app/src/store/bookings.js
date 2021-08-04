// constants
const SET_BOOKING = 'bookings/SET_BOOKING';
// const GET_BOOKINGS = 'bookings/GET_BOOKING'

export const setBooking = (booking) => ({
  type: SET_BOOKING,
  booking,
});

export const getBookings = (booking) => ({
  type: SET_BOOKING,
  booking,
});

export const createBooking = (booking) => async (dispatch) => {
  const { start_date, end_date, user_id, listing_id, guestCount } = booking;
  const formattedBooking = {
    start_date,
    end_date,
    user_id,
    listing_id,
    number_of_guests: guestCount,
  };

  const response = await fetch('/api/bookings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedBooking),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(setBooking(booking));
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

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BOOKING:
      // const options = {
      //   day: '2-digit',
      //   year: 'numeric',
      //   month: '2-digit',
      // };
      // const { start_date_object, end_date_object } = action.booking;
      // if (start_date_object) {
      //   action.booking['start_date'] = start_date_object.toLocaleDateString(
      //     'en-us',
      //     options
      //   );
      // }
      // if (end_date_object) {
      //   action.booking['end_date'] = end_date_object.toLocaleDateString(
      //     'en-us',
      //     options
      //   );
      // }
      newState = { ...state, ...action.booking };
      return newState;
    default:
      return state;
  }
}
