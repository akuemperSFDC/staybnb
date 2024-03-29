import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKey } from '../../store/createListing';
import TextField from '@material-ui/core/TextField';

import './EditListing.css';

const EditDetails = ({ setSumitButtonActive }) => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.listing);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkInType, setCheckInType] = useState('');
  const [parking, setParking] = useState('');

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setDescription(listing.description);
      setPricePerNight(listing.price_per_night);
      setCleaningFee(listing.cleaning_fee);
      setCheckInTime(listing.check_in_time);
      setCheckInType(listing.check_in_type);
      setParking(listing.parking);
    }
  }, [listing]);

  useEffect(() => {
    dispatch(
      setKey({
        title: title,
        description: description,
        price_per_night: pricePerNight,
        cleaning_fee: cleaningFee,
        check_in_time: checkInTime,
        check_in_type: checkInType,
        parking: parking,
      })
    );
  }, [
    dispatch,
    title,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
  ]);

  useEffect(() => {
    if (
      title &&
      description &&
      pricePerNight &&
      cleaningFee &&
      checkInTime &&
      checkInType &&
      parking
    ) {
      setSumitButtonActive('');
    } else {
      setSumitButtonActive('inactive');
    }
  }, [
    title,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
    setSumitButtonActive,
  ]);

  return (
    <div className='edit-details-wrapper'>
      <div className='edit-details-container'>
        <div className='edit-details-header'>Property details</div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title ? title : ''}
          className='details-inputs edit'
          type='text'
          placeholder='Eye-catching title'
        ></input>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description ? description : ''}
          className='details-inputs edit textarea'
          type='number'
          placeholder='Describe your property'
        ></textarea>
        <div className='costs-container'>
          <input
            onChange={(e) => setPricePerNight(e.target.value)}
            value={pricePerNight ? pricePerNight : ''}
            className='details-inputs edit cost-inputs'
            type='number'
            placeholder='Nightly price'
            max={99999}
          ></input>
          <input
            onChange={(e) => setCleaningFee(e.target.value)}
            value={cleaningFee ? cleaningFee : ''}
            className='details-inputs edit cost-inputs'
            type='number'
            placeholder='Cleaning fee'
            min={1}
          ></input>
          <TextField
            id='time'
            label='Check-in time'
            type='time'
            onChange={(e) => setCheckInTime(e.target.value)}
            value={checkInTime ? checkInTime : ''}
            className='details-inputs edit'
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </div>
        <input
          onChange={(e) => setCheckInType(e.target.value)}
          value={checkInType ? checkInType : ''}
          className='details-inputs edit'
          type='text'
          placeholder='Check in type (Meet host, lockbox, etc.)'
        ></input>

        <input
          onChange={(e) => setParking(e.target.value)}
          value={parking ? parking : ''}
          className='details-inputs edit'
          type='text'
          placeholder='Parking (Free stree parking, Private driveway, etc...) '
        ></input>
      </div>
    </div>
  );
};

export default EditDetails;
