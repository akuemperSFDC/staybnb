import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setKey } from '../../store/createListing';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import './CreateListing.css';

const Guests = () => {
  const dispatch = useDispatch();

  const [guestCount, setGuestCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [update, setUpdate] = useState(false);

  const handleCountDown = (e) => {
    if (guestCount === 1) {
      setGuestCount(1);
      setUpdate(true);
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount - 1);
      setUpdate(true);
    }
    if (bedCount === 1) {
      setBedCount(1);
      setUpdate(true);
    } else if (e.target.id === 'bed') {
      setBedCount((prevBedCount) => prevBedCount - 1);
      setUpdate(true);
    }
    if (bedroomCount === 1) {
      setBedroomCount(1);
      setUpdate(true);
    } else if (e.target.id === 'bedroom') {
      setBedroomCount((prevBedroomCount) => prevBedroomCount - 1);
      setUpdate(true);
    }
    if (bathroomCount === 0.5) {
      setBathroomCount(0.5);
      setUpdate(true);
    } else if (e.target.id === 'bathroom') {
      setBathroomCount((prevBathroomCount) => prevBathroomCount - 0.5);
      setUpdate(true);
    }
  };

  const handleCountUp = (e) => {
    if (guestCount === 16) {
      setGuestCount(16);
      setUpdate(true);
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount + 1);
      setUpdate(true);
    }
    if (bedCount === 50) {
      setBedCount(50);
      setUpdate(true);
    } else if (e.target.id === 'bed') {
      setBedCount((prevBedCount) => prevBedCount + 1);
      setUpdate(true);
    }
    if (bedroomCount === 50) {
      setBedroomCount(50);
      setUpdate(true);
    } else if (e.target.id === 'bedroom') {
      setBedroomCount((prevBedroomCount) => prevBedroomCount + 1);
      setUpdate(true);
    }
    if (bathroomCount === 50) {
      setBathroomCount(50);
      setUpdate(true);
    } else if (e.target.id === 'bathroom') {
      setBathroomCount((prevBathroomCount) => prevBathroomCount + 0.5);
      setUpdate(true);
    }
  };

  // const handleCounts = () => {
  //   dispatch(
  //     setKey({
  //       sleeps: guestCount,
  //       beds: bedCount,
  //       bedrooms: bedroomCount,
  //       bathrooms: bathroomCount,
  //     })
  //   );
  // };

  useEffect(() => {
    if (update) {
      dispatch(
        setKey({
          sleeps: guestCount,
          beds: bedCount,
          bedrooms: bedroomCount,
          bathrooms: bathroomCount,
        })
      );
    } else {
      dispatch(
        setKey({
          sleeps: guestCount,
          beds: bedCount,
          bedrooms: bedroomCount,
          bathrooms: bathroomCount,
        })
      );
    }
  }, [guestCount, bedCount, bedroomCount, bathroomCount, dispatch, update]);

  return (
    <div className='answer-selection-container'>
      <div className='count-selector-container guests-answer'>
        <div className='choice-counter-text'>Guests</div>
        <div className='count-buttons'>
          <div
            id='guest'
            onClick={handleCountDown}
            className={`minus-button ${guestCount === 1 ? 'inactive' : ''} `}
          >
            <BiMinus
              className={`minus-icon ${guestCount === 1 ? 'inactive' : ''} `}
            />
          </div>
          <div className='total'>{guestCount}</div>
          <div
            id='guest'
            onClick={handleCountUp}
            className={`plus-button ${guestCount === 16 ? 'inactive' : ''}`}
          >
            <BsPlus
              className={`plus-icon ${guestCount === 16 ? 'inactive' : ''}`}
            />
          </div>
        </div>
      </div>
      <div className='count-selector-container beds-answer'>
        <div className='choice-counter-text'>Beds</div>
        <div className='count-buttons'>
          <div
            id='bed'
            onClick={handleCountDown}
            className={`minus-button ${bedCount === 1 ? 'inactive' : ''} `}
          >
            <BiMinus
              className={`minus-icon ${bedCount === 1 ? 'inactive' : ''} `}
            />
          </div>
          <div className='total'>{bedCount}</div>
          <div
            id='bed'
            onClick={handleCountUp}
            className={`plus-button ${bedCount === 50 ? 'inactive' : ''}`}
          >
            <BsPlus
              className={`plus-icon ${bedCount === 50 ? 'inactive' : ''}`}
            />
          </div>
        </div>
      </div>
      <div className='count-selector-container beds-answer'>
        <div className='choice-counter-text'>Bedrooms</div>
        <div className='count-buttons'>
          <div
            id='bedroom'
            onClick={handleCountDown}
            className={`minus-button ${bedroomCount === 1 ? 'inactive' : ''} `}
          >
            <BiMinus
              className={`minus-icon ${bedroomCount === 1 ? 'inactive' : ''} `}
            />
          </div>
          <div className='total'>{bedroomCount}</div>
          <div
            id='bedroom'
            onClick={handleCountUp}
            className={`plus-button ${bedroomCount === 50 ? 'inactive' : ''}`}
          >
            <BsPlus
              className={`plus-icon ${bedroomCount === 50 ? 'inactive' : ''}`}
            />
          </div>
        </div>
      </div>
      <div className='count-selector-container bathrooms-answer'>
        <div className='choice-counter-text'>Bathrooms</div>
        <div className='count-buttons'>
          <div
            id='bathroom'
            onClick={handleCountDown}
            className={`minus-button ${
              bathroomCount === 0.5 ? 'inactive' : ''
            } `}
          >
            <BiMinus
              className={`minus-icon ${
                bathroomCount === 0.5 ? 'inactive' : ''
              } `}
            />
          </div>
          <div className='total'>{bathroomCount}</div>
          <div
            id='bathroom'
            onClick={handleCountUp}
            className={`plus-button ${bathroomCount === 50 ? 'inactive' : ''}`}
          >
            <BsPlus
              className={`plus-icon ${bathroomCount === 50 ? 'inactive' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guests;
