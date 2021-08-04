import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKey } from '../../store/createListing';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import './CreateListing.css';

const Amenities = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();

  const [ariaPressedWifi, setAriaPressedWifi] = useState(2);
  const [ariaPressedAC, setAriaPressedAC] = useState(2);
  const [ariaPressedHeat, setAriaPressedHeat] = useState(2);

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
    dispatch(setKey({ wifi: 2 }));
    dispatch(setKey({ air_conditioning: 2 }));
    dispatch(setKey({ heat: 2 }));
  }, [dispatch]);

  return (
    <div className='amenity-selection-container'>
      <div
        aria-pressed={ariaPressedWifi}
        id='1'
        onClick={handleAriaPress}
        className={`amenity-square ${ariaPressedWifi === 1 ? 'active' : ''}`}
      >
        <AiOutlineWifi className='amenity-icon' />
        <div className='amenity-text'>Wifi</div>
      </div>
      <div
        aria-pressed={ariaPressedAC}
        id='2'
        onClick={handleAriaPress}
        className={`amenity-square ${ariaPressedAC === 1 ? 'active' : ''}`}
      >
        <IoIosSnow className='amenity-icon' />
        <div className='amenity-text'>Air Conditioning</div>
      </div>
      <div
        aria-pressed={ariaPressedHeat}
        id='3'
        onClick={handleAriaPress}
        className={`amenity-square ${ariaPressedHeat === 1 ? 'active' : ''}`}
      >
        <GiHeatHaze className='amenity-icon' />
        <div className='amenity-text'>Heat</div>
      </div>
    </div>
  );
};

export default Amenities;
