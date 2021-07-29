const EDIT_LISTING = 'editListing/EDIT_LISTING';

const editStoreListing = (listing) => ({
  type: EDIT_LISTING,
  listing,
});

export const editListing = (listing) => async (dispatch) => {
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

  const cleaningFeeNum = Number(cleaningFee);
  const pricePerNightNum = Number(pricePerNight);

  const response = await fetch('/api/listings/', {
    method: 'PUT',
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
      price_per_night: pricePerNightNum,
      cleaning_fee: cleaningFeeNum,
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
    dispatch(editStoreListing(listing));
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
    case EDIT_LISTING:
      // console.log(action.type);
      newState = { ...state, ...action.listing };
      return newState;
    default:
      return state;
  }
}
