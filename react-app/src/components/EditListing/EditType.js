import { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { questions, typeOfPlace } from '../CreateListing/data';
import { setKey, removeKey } from '../../store/createListing';
import './EditListing.css';

const EditType = () => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.listing);

  const [selected, setSelected] = useState();
  const [ariaChecked, setAriaChecked] = useState('true');
  const [active, setActive] = useState('edit-active');
  const [selectedElementIndex, setSelectedElementIndex] = useState();

  const handleSelection = (e, i) => {
    if (i === Number(e.target.id)) {
      setActive('edit-active');
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

  useLayoutEffect(() => {
    const matchingElement = (element) => element === listing.type;
    setSelected(typeOfPlace.findIndex(matchingElement));
  }, [listing.type]);

  return (
    <div className='edit-type-container'>
      <div className='edit-type-header'>
        <div>{questions[0]}</div>
      </div>
      <div className='edit-type-answers'>
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
            checked={true}
            className={`edit-type-choice-box ${selected === i ? active : ''}`}
            key={i}
            id={selected === i ? selectedElementIndex : i}
          >
            {place}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditType;
