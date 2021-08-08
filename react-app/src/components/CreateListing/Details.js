import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKey } from '../../store/createListing';
import TextField from '@material-ui/core/TextField';

import './CreateListing.css';

const Details = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.createListing);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [cleaningFee, setCleaningFee] = useState('');
  const [checkInTime, setCheckInTime] = useState('15:00');
  const [checkInType, setCheckInType] = useState('');
  const [parking, setParking] = useState('');

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
      setNextButtonActive('');
    } else {
      setNextButtonActive('inactive');
    }
  }, [
    title,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
    setNextButtonActive,
  ]);

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

  useEffect(() => {
    const pTitle = localStorage.getItem('title');
    const pDescription = localStorage.getItem('description');
    const pPricePerNight = localStorage.getItem('pricePerNight');
    const pCleaningFee = localStorage.getItem('cleaningFee');
    const pCheckInTime = localStorage.getItem('checkInTime');
    const pCheckInType = localStorage.getItem('checkInType');
    const pParking = localStorage.getItem('parking');

    if (
      pTitle &&
      pDescription &&
      pPricePerNight &&
      pCleaningFee &&
      pCheckInTime &&
      pCheckInType &&
      pParking &&
      pTitle !== 'null' &&
      pDescription !== 'null' &&
      pPricePerNight !== 'null' &&
      pCleaningFee !== 'null' &&
      pCheckInTime !== 'null' &&
      pCheckInType !== 'null' &&
      pParking !== 'null'
    ) {
      dispatch(
        setKey({
          title: pTitle,
          description: pDescription,
          pricePerNight: Number(pPricePerNight),
          cleaningFee: Number(pCleaningFee),
          checkInTime: pCheckInTime,
          checkInType: pCheckInType,
          parking: pParking,
        })
      );

      setTitle(pTitle);
      setDescription(pDescription);
      setPricePerNight(Number(pPricePerNight));
      setCleaningFee(Number(pCleaningFee));
      setCheckInTime(pCheckInTime);
      setCheckInType(pCheckInType);
      setParking(pParking);
    }
  }, []);

  useEffect(() => {
    if (
      title ||
      description ||
      pricePerNight ||
      cleaningFee ||
      checkInTime ||
      checkInType ||
      parking
    ) {
      localStorage.setItem('title', title);
      localStorage.setItem('description', description);
      localStorage.setItem('pricePerNight', pricePerNight);
      localStorage.setItem('cleaningFee', cleaningFee);
      localStorage.setItem('checkInTime', checkInTime);
      localStorage.setItem('checkInType', checkInType);
      localStorage.setItem('parking', parking);
    }
  }, [
    title,
    description,
    pricePerNight,
    cleaningFee,
    checkInTime,
    checkInType,
    parking,
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
          {/* <InputNumber
            className='ant-input-number-handler'
            min={1}
            max={99999}
            // defaultValue={100}
            value={pricePerNight}
            placeholder='Nightly price'
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={(e) => setPricePerNight(e.value)}
          /> */}
          <input
            onChange={(e) => setPricePerNight(e.target.value)}
            value={pricePerNight}
            className='details-inputs'
            type='number'
            placeholder='Nightly price'
            min={1}
            max={99999}
          ></input>
          <input
            onChange={(e) => setCleaningFee(e.target.value)}
            value={cleaningFee}
            className='details-inputs'
            type='number'
            placeholder='Cleaning fee'
            min={1}
          ></input>
          <TextField
            id='time'
            label='Check-in time'
            type='time'
            onChange={(e) => setCheckInTime(e.target.value)}
            value={!checkInTime ? '15:00' : checkInTime}
            className='details-inputs'
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
