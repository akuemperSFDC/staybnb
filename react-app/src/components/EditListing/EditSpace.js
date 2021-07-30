import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { questions, typeOfSpace } from '../CreateListing/data';
import { setKey, removeKey } from '../../store/createListing';
import './EditListing.css';

const EditSpace = () => {
  const dispatch = useDispatch();

  const listing = useSelector((state) => state.listing);

  const [selected, setSelected] = useState();
  const [ariaChecked, setAriaChecked] = useState('true');
  const [active, setActive] = useState('edit-active');

  const handleSelection = (e, i) => {
    if (i === Number(e.target.id)) {
      setActive('edit-active');
      setAriaChecked('true');
      e.target.id = -1;
      dispatch(setKey({ space: e.target.value }));
    } else {
      setSelected(i);
      setActive('');
      setAriaChecked('false');
      e.target.id = selected;
      dispatch(removeKey({ space: e.target.value }));
    }
  };

  useEffect(() => {
    const matchingElement = (element) => element === listing.space;
    console.log(setSelected(typeOfSpace.findIndex(matchingElement)));
  }, [listing.space]);

  return (
    <div className='edit-space-container'>
      <div className='edit-space-header'>
        <div>{questions[1]}</div>
      </div>
      <div className='edit-space-answers'>
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
            checked={true}
            className={`edit-space-choice-box ${selected === i ? active : ''}`}
            key={i}
            id={selected === i ? -1 : i}
          >
            {space}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditSpace;
