// constants
const SET_SEARCH = 'listings/SET_SEARCH';
// const DELETE_LISTING = 'listings/DELETE_LISTINGS';

const setSearchListings = (listings) => ({
  type: SET_SEARCH,
  listings,
});

export const searchListingsCityState = (search) => async (dispatch) => {
  const { city, state } = search;
  const response = await fetch(`/api/listings/${city}+${state}`);

  if (response.ok) {
    const listings = await response.json();
    dispatch(setSearchListings(listings));
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

export const searchListingsCityStateGuests = (search) => async (dispatch) => {
  const { city, state, guestCount } = search;
  const response = await fetch(`/api/listings/${city}+${state}/${guestCount}`);

  if (response.ok) {
    const listings = await response.json();
    dispatch(setSearchListings(listings));
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

export const searchListingsCityStateGuestsStartDateEndDate =
  (search) => async (dispatch) => {
    const { city, state, guestCount } = search;
    console.log(search);
    let { start_date, end_date } = search;
    start_date = start_date.split('/').join('-');
    end_date = end_date.split('/').join('-');
    const response = await fetch(
      `/api/listings/${city}+${state}/${start_date}+${end_date}/${guestCount}`
    );

    if (response.ok) {
      const listings = await response.json();
      console.log(listings);
      dispatch(setSearchListings(listings));
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
  let oldState;
  switch (action.type) {
    case SET_SEARCH:
      let { listings } = action.listings;
      if (action.listings.listings !== -1) {
        const newListings = {};

        listings.forEach((listing) => {
          newListings[listing.id] = listing;
        });

        newState = { ...state, ...newListings };
      } else if (action.listings.listings === -1) {
        oldState = { ...state };
        const oldStateKeys = Object.keys(oldState);
        oldStateKeys.forEach((key) => {
          delete oldState[key];
        });
        newState = { ...oldState };
      }
      return newState;
    default:
      return state;
  }
}
