import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKey } from '../../store/createListing';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import './CreateListing.css';

const Guests = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.createListing);

  const [guestCount, setGuestCount] = useState(null);
  const [bedCount, setBedCount] = useState(null);
  const [bedroomCount, setBedroomCount] = useState(null);
  const [bathroomCount, setBathroomCount] = useState(null);
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

  useEffect(() => {
    const pSleeps = localStorage.getItem('sleeps');
    const pBeds = localStorage.getItem('beds');
    const pBedrooms = localStorage.getItem('bedrooms');
    const pBathrooms = localStorage.getItem('bathrooms');

    if (
      pSleeps &&
      pBeds &&
      pBedrooms &&
      pBathrooms &&
      pSleeps !== 'null' &&
      pBeds !== 'null' &&
      pBedrooms !== 'null' &&
      pBathrooms !== 'null'
    ) {
      dispatch(
        setKey({
          sleeps: Number(pSleeps),
          beds: Number(pBeds),
          bedrooms: Number(pBedrooms),
          bathrooms: Number(pBathrooms),
        })
      );

      setGuestCount(Number(pSleeps));
      setBedCount(Number(pBeds));
      setBedroomCount(Number(pBedrooms));
      setBathroomCount(Number(pBathrooms));
    } else {
      setGuestCount(1);
      setBedCount(1);
      setBedroomCount(1);
      setBathroomCount(1);
    }
  }, []);

  useEffect(() => {
    if (guestCount && bedCount && bedroomCount && bathroomCount) {
      localStorage.setItem('sleeps', Number(guestCount));
      localStorage.setItem('beds', Number(bedCount));
      localStorage.setItem('bedrooms', Number(bedroomCount));
      localStorage.setItem('bathrooms', Number(bathroomCount));
    }
  }, [guestCount, bedCount, bedroomCount, bathroomCount]);

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
