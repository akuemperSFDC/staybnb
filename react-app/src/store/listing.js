// constants
const SET_LISTING = 'listing/SET_LISTING';

const setListing = (listing) => ({
  type: SET_LISTING,
  listing,
});

export const getListingByListingId = (id) => async (dispatch) => {
  const response = await fetch(`/api/listings/${Number(id)}`);

  if (response.ok) {
    const listing = await response.json();
    dispatch(setListing(listing));
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
    case SET_LISTING:
      const { listing } = action.listing;
      newState = { ...state, ...listing };
      return newState;
    default:
      return state;
  }
}
