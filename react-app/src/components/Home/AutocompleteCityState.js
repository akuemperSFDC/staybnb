import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKey } from '../../store/createListing';

const AutocompleteCityState = ({ setShowDatePicker }) => {
  const dispatch = useDispatch();
  const [cityState, setCityState] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const split = value.split(',');
    if (split.length === 0) return;
    if (split.length === 3) {
      setCityState(`${split[0]}, ${split[1]}`);
    } else {
      setCityState(`${split[1]}, ${split[2]}`);
    }
  };

  const handleOnKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setShowDatePicker('true');
    }
  };

  return (
    <PlacesAutocomplete
      value={cityState}
      onChange={setCityState}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='home-search-autocomplete-container'>
          <input
            autoComplete='new-password'
            onKeyPress={handleOnKeyDown}
            value={cityState}
            {...getInputProps({
              placeholder: 'Where are you going?',
              className: 'location-input',
              autoComplete: 'new-password',
            })}
          />
          <div className='home-autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active search'
                : 'suggestion-item search';
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
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutocompleteCityState;
