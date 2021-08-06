// constants
const SET_KEY = 'createListing/SET_KEY';
const SET_LISTING = 'createListing/SET_LISTING';
const REMOVE_KEY = 'createListing/REMOVE_KEY';

export const setKey = (data) => ({
  type: SET_KEY,
  data,
});

export const setListing = (listing) => ({
  type: SET_LISTING,
  listing,
});

export const removeKey = (data) => ({
  type: REMOVE_KEY,
  data,
});

export const createListing = (listing) => async (dispatch) => {
  const {
    user_id,
    type,
    space,
    address,
    city,
    state,
    country,
    latitude,
    longitude,
    wifi,
    air_conditioning,
    heat,
    title,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
    bedrooms,
    beds,
    bathrooms,
    sleeps,
  } = listing;

  // const cleaningFeeNum = Number(cleaningFee);
  // const pricePerNightNum = Number(pricePerNight);

  const response = await fetch('/api/listings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: user_id,
      type: type,
      space: space,
      title: title,
      description: description,
      country: country,
      city: city,
      state: state,
      address: address,
      latitude: latitude,
      longitude: longitude,
      price_per_night: pricePerNight,
      cleaning_fee: cleaningFee,
      check_in_time: checkInTime,
      check_in_type: checkInType,
      wifi: wifi,
      air_conditioning: air_conditioning,
      heat: heat,
      parking: parking,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
      sleeps: sleeps,
    }),
  });

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
    case SET_KEY:
      newState = { ...state, ...action.data };
      return newState;
    case REMOVE_KEY:
      newState = { ...state };
      const keys = Object.keys(action.data);
      keys.forEach((key) => {
        delete newState[key];
      });
      return newState;
    case SET_LISTING:
      newState = { ...state, ...action.listing };
      return newState;
    default:
      return state;
  }
}
