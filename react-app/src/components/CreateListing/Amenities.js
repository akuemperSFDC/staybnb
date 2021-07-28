import { useState } from 'react';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import './CreateListing.css';

const Amenities = () => {
  const [ariaPressedWifi, setAriaPressedWifi] = useState('false');
  const [ariaPressedAC, setAriaPressedAC] = useState('false');
  const [ariaPressedHeat, setAriaPressedHeat] = useState('false');

  const handleAriaPress = (e) => {
    if (e.target.id === '1') {
      setAriaPressedWifi('true');
      e.target.id = '-1';
    } else if (e.target.id === '-1') {
      setAriaPressedWifi('false');
      e.target.id = '1';
    }
    if (e.target.id === '2') {
      setAriaPressedAC('true');
      e.target.id = '-2';
    } else if (e.target.id === '-2') {
      setAriaPressedAC('false');
      e.target.id = '2';
    }
    if (e.target.id === '3') {
      setAriaPressedHeat('true');
      e.target.id = '-3';
    } else if (e.target.id === '-3') {
      setAriaPressedHeat('false');
      e.target.id = '3';
    }
  };

  return (
    <div className='amenity-selection-container'>
      <div
        aria-pressed={ariaPressedWifi}
        id='1'
        onClick={handleAriaPress}
        className={`amenity-square ${
          ariaPressedWifi === 'true' ? 'active' : ''
        }`}
      >
        <AiOutlineWifi className='amenity-icon' />
        <div className='amenity-text'>Wifi</div>
      </div>
      <div
        aria-pressed={ariaPressedAC}
        id='2'
        onClick={handleAriaPress}
        className={`amenity-square ${ariaPressedAC === 'true' ? 'active' : ''}`}
      >
        <IoIosSnow className='amenity-icon' />
        <div className='amenity-text'>Air Conditioning</div>
      </div>
      <div
        aria-pressed={ariaPressedHeat}
        id='3'
        onClick={handleAriaPress}
        className={`amenity-square ${
          ariaPressedHeat === 'true' ? 'active' : ''
        }`}
      >
        <GiHeatHaze className='amenity-icon' />
        <div className='amenity-text'>Heat</div>
      </div>
    </div>
  );
};

export default Amenities;
