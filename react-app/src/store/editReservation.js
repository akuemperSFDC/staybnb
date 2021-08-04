// constants
const EDIT_RESERVATION = 'editreservations/EDIT_RESERVATION';

export const changeReservation = (reservation) => ({
  type: EDIT_RESERVATION,
  reservation,
});

// export const editReservation = (reservation) => async (dispatch) => {
//   const { id, start_date, end_date, sleeps } = reservation;
//   const response = await fetch(`/api/listings/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ reservation }),
//   });

//   if (response.ok) {
//     const booking = await response.json();
//     dispatch(setReservation(booking));
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
    case EDIT_RESERVATION:
      newState = { ...state, ...action.reservation };
      return newState;
    default:
      return state;
  }
}
