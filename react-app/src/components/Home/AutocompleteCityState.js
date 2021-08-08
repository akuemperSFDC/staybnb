import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBooking } from '../../store/bookings';

const AutocompleteCityState = ({
  setSearchButtonActive,
  setShowDatePicker,
}) => {
  const dispatch = useDispatch();
  const [cityState, setCityState] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const split = value.split(',');
    if (split.length === 0) return;
    if (split.length === 3) {
      setCityState(`${split[0]}, ${split[1]}`);
      setCity(split[0]);
      setState(split[1]);
      dispatch(
        setBooking({ cityState: `${split[0].trim()}, ${split[1].trim()}` })
      );
      dispatch(setBooking({ city: split[0].trim() }));
      dispatch(setBooking({ state: split[1].trim() }));
    } else {
      setCityState(`${split[1]}, ${split[2]}`);
      setCity(split[1]);
      setState(split[2]);
      dispatch(setBooking({ cityState }));
      dispatch(setBooking({ city: split[1].trim() }));
      dispatch(setBooking({ state: split[2].trim() }));
    }
    if (cityState) {
      setSearchButtonActive('');
    } else {
      setSearchButtonActive('inactive');
    }
  };

  useEffect(() => {
    dispatch(setBooking({ cityState }));
    // dispatch(setBooking({ city }));
    // dispatch(setBooking({ state }));
  }, [dispatch, cityState]);

  useEffect(() => {
    if (cityState.includes(',')) {
      setSearchButtonActive('');
    } else {
      setSearchButtonActive('inactive');
    }
  }, [cityState, setSearchButtonActive]);

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
