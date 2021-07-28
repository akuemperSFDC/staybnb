import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { questions, typeOfPlace, typeOfSpace } from './data';
import Autocomplete from './Autocomplete';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import './CreateListing.css';

const CreateListing = () => {
  const history = useHistory();

  const [question, setQuestion] = useState(questions[0]);
  const [selected, setSelected] = useState();
  const [ariaChecked, setAriaChecked] = useState();
  const [active, setActive] = useState(null);
  const [index, setIndex] = useState(0);
  const [selectedElementIndex, setSelectedElementIndex] = useState();
  const [guestCount, setGuestCount] = useState(4);
  const [bedCount, setBedCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [ariaPressedWifi, setAriaPressedWifi] = useState('false');
  const [ariaPressedAC, setAriaPressedAC] = useState('false');
  const [ariaPressedHeat, setAriaPressedHeat] = useState('false');

  const handleSelection = (e, i) => {
    if (i === Number(e.target.id)) {
      setActive('active');
      setAriaChecked('true');
      setSelectedElementIndex(-1);
      e.target.id = selectedElementIndex;
    } else {
      setSelected();
      setActive('');
      setAriaChecked('false');
      setSelectedElementIndex(i);
      e.target.id = selectedElementIndex;
    }
  };

  const handleNext = () => {
    if (index === questions.length - 1) {
      history.push('/');
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    }
  };

  const handleBack = () => {
    if (index === 0) {
      history.push('/');
    } else {
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    }
  };

  const handleCountDown = (e) => {
    if (guestCount === 1) {
      setGuestCount(1);
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount - 1);
    }
    if (bedCount === 1) {
      setBedCount(1);
    } else if (e.target.id === 'bed') {
      setBedCount((prevBedCount) => prevBedCount - 1);
    }
    if (bedroomCount === 1) {
      setBedroomCount(1);
    } else if (e.target.id === 'bedroom') {
      setBedroomCount((prevBedroomCount) => prevBedroomCount - 1);
    }
    if (bathroomCount === 0.5) {
      setBathroomCount(0.5);
    } else if (e.target.id === 'bathroom') {
      setBathroomCount((prevBathroomCount) => prevBathroomCount - 0.5);
    }
  };

  const handleCountUp = (e) => {
    if (guestCount === 16) {
      setGuestCount(16);
    } else if (e.target.id === 'guest') {
      setGuestCount((prevGuestCount) => prevGuestCount + 1);
    }
    if (bedCount === 50) {
      setBedCount(50);
    } else if (e.target.id === 'bed') {
      setBedCount((prevBedCount) => prevBedCount + 1);
    }
    if (bedroomCount === 50) {
      setBedroomCount(50);
    } else if (e.target.id === 'bedroom') {
      setBedroomCount((prevBedroomCount) => prevBedroomCount + 1);
    }
    if (bathroomCount === 50) {
      setBathroomCount(50);
    } else if (e.target.id === 'bathroom') {
      setBathroomCount((prevBathroomCount) => prevBathroomCount + 0.5);
    }
  };

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

    // if (e.target.id === '3' && ariaPressed === 'false') {
    // setAriaPressedHeat
    //   setAriaPressed('true');
    // } else {
    //   setAriaPressed('false');
    // }
  };

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index, selected]);

  const place = (
    <div className='answer-selection-container'>
      {typeOfPlace.map((place, i) => (
        <button
          type='button'
          role='radio'
          aria-checked={selected === i ? ariaChecked : 'false'}
          value={place}
          onClick={(e) => {
            handleSelection(e, i);
            setSelected(i);
          }}
          className={`choice-box ${selected === i ? active : ''}`}
          key={i}
          id={selected === i ? selectedElementIndex : i}
        >
          {place}
        </button>
      ))}
    </div>
  );

  const space = (
    <div className='answer-selection-container'>
      {typeOfSpace.map((space, i) => (
        <button
          type='button'
          role='radio'
          aria-checked={selected === i ? ariaChecked : 'false'}
          value={space}
          onClick={(e) => {
            handleSelection(e, i);
            setSelected(i);
          }}
          className={`choice-box ${selected === i ? active : ''}`}
          key={i}
          id={selected === i ? selectedElementIndex : i}
        >
          {space}
        </button>
      ))}
    </div>
  );

  const guestsToWelcome = (
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

  const offerings = (
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

  return (
    <div className='create-listing-container'>
      <div className='left-side-question-container'>{question}</div>
      <div className='right-side-selection-container'>
        {question === questions[0] ? place : null}
        {question === questions[1] ? space : null}
        {question === questions[2] ? (
          <div className='right-side-bg-img'></div>
        ) : null}
        {question === questions[2] ? <Autocomplete /> : null}
        {question === questions[3] ? guestsToWelcome : null}
        {question === questions[4] ? offerings : null}
        {question === questions[5] ? '' : null}
        <div className='bottom-buttons-container'>
          <div className='bottom-buttons back-btn' onClick={handleBack}>
            Back
          </div>
          <div className='bottom-buttons next-btn' onClick={handleNext}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
