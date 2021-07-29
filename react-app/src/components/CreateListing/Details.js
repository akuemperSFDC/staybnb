import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKey } from '../../store/createListing';

import './CreateListing.css';

const Details = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkInType, setCheckInType] = useState('');
  const [parking, setParking] = useState('');

  useEffect(() => {
    dispatch(
      setKey({
        title: title,
        description: description,
        pricePerNight: pricePerNight,
        cleaningFee: cleaningFee,
        checkInTime: checkInTime,
        checkInType: checkInType,
        parking: parking,
      })
    );
  }, [
    title,
    setTitle,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
    dispatch,
  ]);

  return (
    <div className='details-wrapper'>
      <div className='details-container'>
        <div>Property details</div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='details-inputs'
          type='text'
          placeholder='Eye-catching title'
        ></input>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='details-inputs textarea'
          type='number'
          placeholder='Describe your property'
        ></textarea>
        <div className='costs-container'>
          <input
            onChange={(e) => setPricePerNight(e.target.value)}
            value={pricePerNight}
            className='details-inputs'
            type='number'
            placeholder='Nightly price'
          ></input>
          <input
            onChange={(e) => setCleaningFee(e.target.value)}
            value={cleaningFee}
            className='details-inputs'
            type='number'
            placeholder='Cleaning fee'
          ></input>
          <input
            onChange={(e) => setCheckInTime(e.target.value)}
            value={checkInTime}
            className='details-inputs'
            type='text'
            placeholder='Check-in time'
          ></input>
        </div>
        <input
          onChange={(e) => setCheckInType(e.target.value)}
          value={checkInType}
          className='details-inputs'
          type='text'
          placeholder='Check in type (Meet host, lockbox, etc.)'
        ></input>

        <input
          onChange={(e) => setParking(e.target.value)}
          value={parking}
          className='details-inputs'
          type='text'
          placeholder='Parking (Free stree parking, Private driveway, etc...) '
        ></input>
      </div>
    </div>
  );
};

export default Details;
