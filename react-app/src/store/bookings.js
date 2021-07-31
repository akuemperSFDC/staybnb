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

// export const getListingByListingId = (id) => async (dispatch) => {
//   const response = await fetch(`/api/listings/${Number(id)}`);

//   if (response.ok) {
//     const listing = await response.json();
//     dispatch(setListing(listing));
//     return null;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   } else {
//     return ['An error occurred. Please try again.'];
//   }
// };

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BOOKING:
      const { start_date, end_date } = action.booking;
      console.log(action.booking);
      newState = { ...state, ...action.booking };
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
