import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { useState } from 'react';

const Autocomplete = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  // console.log(address);
  // console.log(coordinates);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    const split = value.split(',');
    if (split.length === 3) {
      setAddress('');
      setCity(split[0]);
      setState(split[1]);
      setCountry(split[2]);
      setCoordinates(ll);
    } else {
      setAddress(split[0]);
      setCity(split[1]);
      setState(split[2]);
      setCountry(split[3]);
      setCoordinates(ll);
    }
  };

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
            />
            <input
              className='city-input address-form-inputs'
              placeholder='City'
              autoComplete='new-password'
              value={city}
            />
            <input
              className='state-input address-form-inputs'
              placeholder='State'
              autoComplete='new-password'
              value={state}
            />
            <input
              className='country-input address-form-inputs'
              placeholder='Country/Region'
              autoComplete='new-password'
              value={country}
            />
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default Autocomplete;
