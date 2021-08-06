import { useState, useEffect } from 'react';
import { typeOfPlace } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { setKey, removeKey } from '../../store/createListing';
import './CreateListing.css';

const Type = ({ setNextButtonActive }) => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.createListing);

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
    if (ariaChecked === 'true') {
      setNextButtonActive('');
    } else {
      setNextButtonActive('inactive');
    }
  }, [ariaChecked, setNextButtonActive]);

  useEffect(() => {}, [selected, ariaChecked, active, selectedElementIndex]);

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
