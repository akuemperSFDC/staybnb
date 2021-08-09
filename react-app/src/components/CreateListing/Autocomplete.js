import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKey } from '../../store/createListing';

const AutocompleteCityState = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.createListing);

  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    const { lat, lng } = ll;
    const split = value.split(',');
    if (split.length === 3) {
      setAddress('');
      setCity(split[0]);
      setState(split[1]);
      setCountry(split[2]);
      setCoordinates(ll);
      dispatch(
        setKey({
          address: '',
          city: split[0],
          state: split[1],
          country: split[2],
          latitude: lat,
          longitude: lng,
        })
      );
    } else {
      setAddress(split[0]);
      setCity(split[1]);
      setState(split[2]);
      setCountry(split[3]);
      setCoordinates(ll);
      dispatch(
        setKey({
          address: split[0],
          city: split[1],
          state: split[2],
          country: split[3],
          latitude: lat,
          longitude: lng,
        })
      );
    }
  };

  useEffect(() => {
    if (address && city && state && country) {
      setNextButtonActive('');
    } else {
      setNextButtonActive('inactive');
    }
  }, [address, city, state, country, setNextButtonActive]);

  useEffect(() => {
    const pAddress = localStorage.getItem('address');
    const pCity = localStorage.getItem('city');
    const pState = localStorage.getItem('state');
    const pCountry = localStorage.getItem('country');
    const pLatitude = localStorage.getItem('latitude');
    const pLongitude = localStorage.getItem('longitude');

    if (pAddress && pAddress !== 'null') {
      dispatch(
        setKey({
          address: pAddress,
          city: pCity,
          state: pState,
          country: pCountry,
          latitude: pLatitude,
          longitude: pLongitude,
        })
      );
      setAddress(pAddress);
      setCity(pCity);
      setState(pState);
      setCountry(pCountry);
      setCoordinates({ latitude: pLatitude, longitude: pLongitude });
      // console.log(address);
    }
  }, []);

  useEffect(() => {
    if (listing.address) {
      localStorage.setItem('address', listing.address);
      localStorage.setItem('city', listing.city);
      localStorage.setItem('state', listing.state);
      localStorage.setItem('country', listing.country);
      localStorage.setItem('latitude', listing.latitude);
      localStorage.setItem('longitude', listing.longitude);
    }
  }, [
    listing.address,
    listing.city,
    listing.state,
    listing.country,
    listing.latitude,
    listing.longitude,
  ]);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='address-form-container'>
          <div className='form-container' autoComplete='off'>
            <div className='form-title'>Enter your address</div>
            <input
              autoComplete='new-password'
              value={address}
              {...getInputProps({
                placeholder: 'Street',
                className: 'location-search-input address-form-inputs',
                autoComplete: 'new-password',
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#61c3ff', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.description}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            <input
              className='apt-number-input address-form-inputs'
              placeholder='Apt, suitm etc. (Optional)'
              autoComplete='new-password'
              readOnly={true}
            />
            <input
              className='city-input address-form-inputs'
              placeholder='City'
              autoComplete='new-password'
              value={city}
              readOnly={true}
            />
            <input
              className='state-input address-form-inputs'
              placeholder='State'
              autoComplete='new-password'
              value={state}
              readOnly={true}
            />
            <input
              className='country-input address-form-inputs'
              placeholder='Country/Region'
              autoComplete='new-password'
              value={country}
              readOnly={true}
            />
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutocompleteCityState;
