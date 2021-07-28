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
  const response = await fetch('/api/listings/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setListing(data));
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
      newState = { ...state, ...action.key };
      return newState;
    case REMOVE_KEY:
      return { user: null };
    default:
      return state;
  }
}
