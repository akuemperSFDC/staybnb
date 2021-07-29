import { useState } from 'react';
import { typeOfSpace } from './data';
import { useDispatch } from 'react-redux';
import { setKey, removeKey } from '../../store/createListing';
import './CreateListing.css';

const Type = () => {
  const dispatch = useDispatch();

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
      dispatch(setKey({ space: e.target.value }));
    } else {
      setSelected();
      setActive('');
      setAriaChecked('false');
      setSelectedElementIndex(i);
      e.target.id = selectedElementIndex;
      dispatch(removeKey({ space: e.target.value }));
    }
  };

  return (
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
};

export default Type;
