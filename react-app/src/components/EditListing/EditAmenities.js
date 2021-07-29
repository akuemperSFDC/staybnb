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

  const [ariaPressedWifi, setAriaPressedWifi] = useState();
  const [ariaPressedAC, setAriaPressedAC] = useState();
  const [ariaPressedHeat, setAriaPressedHeat] = useState();

  const handleAriaPress = (e) => {
    if (e.target.id === '1') {
      setAriaPressedWifi(true);
      e.target.id = '-1';
      dispatch(setKey({ wifi: 'True' }));
    } else if (e.target.id === '-1') {
      setAriaPressedWifi(false);
      e.target.id = '1';
      dispatch(setKey({ wifi: 'False' }));
    }
    if (e.target.id === '2') {
      setAriaPressedAC(true);
      e.target.id = '-2';
      dispatch(setKey({ air_conditioning: 'True' }));
    } else if (e.target.id === '-2') {
      setAriaPressedAC(false);
      e.target.id = '2';
      dispatch(setKey({ air_conditioning: 'False' }));
    }
    if (e.target.id === '3') {
      setAriaPressedHeat(true);
      e.target.id = '-3';
      dispatch(setKey({ heat: 'True' }));
    } else if (e.target.id === '-3') {
      setAriaPressedHeat(false);
      e.target.id = '3';
      dispatch(setKey({ heat: 'False' }));
    }
  };

  useEffect(() => {
    setAriaPressedWifi(listing.wifi);
    setAriaPressedAC(listing.air_conditioning);
    setAriaPressedHeat(listing.heat);
  }, [listing.wifi, listing.air_conditioning, listing.heat]);

  return (
    <div className='edit-amenity-selection-container'>
      <div className='edit-amenities-header'>
        <div>{questions[4]}</div>
      </div>
      <div className='edit-amenities-boxes-container'>
        <div
          aria-pressed={ariaPressedWifi}
          id='-1'
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedWifi === true ? 'active' : ''
          }`}
        >
          <AiOutlineWifi className='amenity-icon' />
          <div className='amenity-text'>Wifi</div>
        </div>
        <div
          aria-pressed={ariaPressedAC}
          id='-2'
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedAC === true ? 'active' : ''
          }`}
        >
          <IoIosSnow className='amenity-icon' />
          <div className='amenity-text'>Air Conditioning</div>
        </div>
        <div
          aria-pressed={ariaPressedHeat}
          id='-3'
          onClick={handleAriaPress}
          className={`edit-amenity-square ${
            ariaPressedHeat === true ? 'active' : ''
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
