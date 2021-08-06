const EDIT_LISTING = 'editListing/EDIT_LISTING';

const editStoreListing = (listing) => ({
  type: EDIT_LISTING,
  listing,
});

export const editListingThunk = (listing) => async (dispatch) => {
  let { latitude, longitude } = listing;
  const {
    id,
    user_id,
    type,
    space,
    address,
    city,
    state,
    country,
    wifi,
    air_conditioning,
    heat,
    title,
    description,
    price_per_night,
    cleaning_fee,
    check_in_time,
    check_in_type,
    parking,
    bedrooms,
    beds,
    bathrooms,
    sleeps,
  } = listing;

  if (!latitude) latitude = '';
  if (!longitude) longitude = '';

  const cleaningFeeNum = Number(cleaning_fee);
  const pricePerNightNum = Number(price_per_night);

  const response = await fetch(`/api/listings/${id}`, {
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
      price_per_night: cleaningFeeNum,
      cleaning_fee: pricePerNightNum,
      check_in_time: check_in_time,
      check_in_type: check_in_type,
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
      newState = { ...state, ...action.listing };
      return newState;
    default:
      return state;
  }
}
