// constants
const SET_LISTINGS = 'listings/SET_LISTINGS';
const DELETE_LISTING = 'listings/DELETE_LISTINGS';

const setListings = (listings) => ({
  type: SET_LISTINGS,
  listings,
});

const delListing = (listing) => ({
  type: DELETE_LISTING,
  listing,
});

export const getListings = (id) => async (dispatch) => {
  const response = await fetch(`/api/listings/users/${Number(id)}`);

  if (response.ok) {
    const listings = await response.json();
    dispatch(setListings(listings));
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

export const deleteListing = (id) => async (dispatch) => {
  const res = await fetch(`/api/listings/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const listing = await res.json();
    dispatch(delListing(listing));
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
  let oldState;
  switch (action.type) {
    case SET_LISTINGS:
      const { listings } = action.listings;
      if (listings === -1 || listings.length === 0) {
        oldState = { ...state };
        const oldStateKeys = Object.keys(oldState);
        oldStateKeys.forEach((key) => {
          delete oldState[key];
        });
        newState = { ...oldState };
      } else if (listings !== -1) {
        oldState = { ...state };
        const oldStateKeys = Object.keys(oldState);
        oldStateKeys.forEach((key) => {
          delete oldState[key];
        });

        const newListings = {};
        listings.forEach((listing) => {
          newListings[listing.id] = listing;
        });

        newState = { ...oldState, ...newListings };
      }
      return newState;
    case DELETE_LISTING:
      newState = { ...state };
      delete newState[action.listing.listing.id];
      return newState;
    default:
      return state;
  }
}
