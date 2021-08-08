import { useState, useEffect } from 'react';
import { typeOfPlace } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { setKey, removeKey } from '../../store/createListing';
import './CreateListing.css';

const Type = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.createListing);

  const [selected, setSelected] = useState();
  const [ariaChecked, setAriaChecked] = useState();
  const [active, setActive] = useState(null);
  const [selectedElementIndex, setSelectedElementIndex] = useState();

  const handleSelection = (e, i) => {
    if (i === Number(e.target.id)) {
      setActive('active');
      setAriaChecked('true');
      setSelectedElementIndex(-1);
      e.target.id = selectedElementIndex;
      dispatch(setKey({ type: e.target.value }));
    } else {
      setSelected();
      setActive('');
      setAriaChecked('false');
      setSelectedElementIndex(i);
      e.target.id = selectedElementIndex;
      dispatch(removeKey({ type: e.target.value }));
    }
  };

  useEffect(() => {
    const pType = localStorage.getItem('type');
    const pTypeIndex = localStorage.getItem('typeIndex');
    const pTypeIndexChange = localStorage.getItem('typeIndexChange');
    if (pType !== 'null') {
      dispatch(setKey({ type: pType }));
      setSelected(Number(pTypeIndex));
      setSelectedElementIndex(pTypeIndexChange);
      const selection = document.getElementById(Number(pTypeIndex));
      if (selection) {
        selection.id = pTypeIndexChange;
      }

      if (selection && selection.id === selectedElementIndex) {
        setActive('active');
        setAriaChecked('true');
      }
    }
  }, []);

  useEffect(() => {
    if (listing.type) {
      localStorage.setItem('type', listing.type);
      localStorage.setItem('typeIndex', selected);
      localStorage.setItem('typeIndexChange', selectedElementIndex);
      setActive('active');
      setAriaChecked('true');
      setSelectedElementIndex(-1);
    }
  }, [listing.type, selected, selectedElementIndex]);

  useEffect(() => {
    if (ariaChecked === 'true') {
      setNextButtonActive('');
    } else {
      setNextButtonActive('inactive');
    }
  }, [ariaChecked, setNextButtonActive]);

  return (
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
};

export default Type;
