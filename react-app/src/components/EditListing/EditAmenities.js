import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setKey } from '../../store/createListing';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import { questions } from '../CreateListing/data';

import './EditListing.css';

const EditAmenities = () => {
  const listing = useSelector((state) => state.listing);

  const dispatch = useDispatch();

  const [ariaPressedWifi, setAriaPressedWifi] = useState(listing.wifi);
  const [ariaPressedAC, setAriaPressedAC] = useState(listing.air_conditioning);
  const [ariaPressedHeat, setAriaPressedHeat] = useState(listing.heat);

  const handleAriaPress = (e) => {
    if (e.target.id === '1') {
      setAriaPressedWifi(1);
      e.target.id = '-1';
      dispatch(setKey({ wifi: 1 }));
    } else if (e.target.id === '-1') {
      setAriaPressedWifi(2);
      e.target.id = '1';
      dispatch(setKey({ wifi: 2 }));
    }
    if (e.target.id === '2') {
      setAriaPressedAC(1);
      e.target.id = '-2';
      dispatch(setKey({ air_conditioning: 1 }));
    } else if (e.target.id === '-2') {
      setAriaPressedAC(2);
      e.target.id = '2';
      dispatch(setKey({ air_conditioning: 2 }));
    }
    if (e.target.id === '3') {
      setAriaPressedHeat(1);
      e.target.id = '-3';
      dispatch(setKey({ heat: 1 }));
    } else if (e.target.id === '-3') {
      setAriaPressedHeat(2);
      e.target.id = '3';
      dispatch(setKey({ heat: 2 }));
    }
  };

  useEffect(() => {
    setAriaPressedWifi(listing.wifi);
    setAriaPressedAC(listing.air_conditioning);
    setAriaPressedHeat(listing.heat);
  }, [
    listing.wifi,
    listing.air_conditioning,
    listing.heat,
    setAriaPressedWifi,
    setAriaPressedAC,
    setAriaPressedHeat,
  ]);

  useEffect(() => {
    setAriaPressedWifi(ariaPressedWifi);
    setAriaPressedAC(ariaPressedAC);
    setAriaPressedHeat(ariaPressedHeat);
  }, [
    ariaPressedWifi,
    ariaPressedAC,
    ariaPressedHeat,
    setAriaPressedWifi,
    setAriaPressedAC,
    setAriaPressedHeat,
  ]);

  return (
    <div className='edit-amenity-selection-container'>
      <div className='edit-amenities-header'>
        <div>{questions[4]}</div>
      </div>
      <div className='edit-amenities-boxes-container'>
        <div
          aria-pressed={ariaPressedWifi}
          id={ariaPressedWifi === 1 ? '-1' : '1'}
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedWifi === 1 ? 'active' : ''
          }`}
        >
          <AiOutlineWifi className='amenity-icon' />
          <div className='amenity-text'>Wifi</div>
        </div>
        <div
          aria-pressed={ariaPressedAC}
          id={ariaPressedAC === 1 ? '-2' : '2'}
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedAC === 1 ? 'active' : ''
          }`}
        >
          <IoIosSnow className='amenity-icon' />
          <div className='amenity-text'>Air Conditioning</div>
        </div>
        <div
          aria-pressed={ariaPressedHeat}
          id={ariaPressedHeat === 1 ? '-3' : '3'}
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedHeat === 1 ? 'active' : ''
          }`}
        >
          <GiHeatHaze className='amenity-icon' />
          <div className='amenity-text'>Heat</div>
        </div>
      </div>
    </div>
  );
};

export default EditAmenities;
