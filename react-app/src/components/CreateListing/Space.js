import { useState, useEffect } from 'react';
import { typeOfSpace } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { setKey, removeKey } from '../../store/createListing';
import './CreateListing.css';

const Space = ({ setNextButtonActive }) => {
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

  useEffect(() => {
    const pSpace = localStorage.getItem('space');
    const pSpaceIndex = localStorage.getItem('spaceIndex');
    const pSpaceIndexChange = localStorage.getItem('spaceIndexChange');
    if (pSpace !== 'null') {
      dispatch(setKey({ space: pSpace }));
      setSelected(Number(pSpaceIndex));
      setSelectedElementIndex(pSpaceIndexChange);
      const selection = document.getElementById(Number(pSpaceIndex));
      if (selection) {
        selection.id = pSpaceIndexChange;
      }

      if (selection && selection.id === selectedElementIndex) {
        setActive('active');
        setAriaChecked('true');
      }
    }
  }, []);

  useEffect(() => {
    if (listing.space) {
      localStorage.setItem('space', listing.space);
      localStorage.setItem('spaceIndex', selected);
      localStorage.setItem('spaceIndexChange', selectedElementIndex);
      setActive('active');
      setAriaChecked('true');
      setSelectedElementIndex(-1);
    }
  }, [listing.space, selected, selectedElementIndex]);

  useEffect(() => {
    if (ariaChecked === 'true') {
      setNextButtonActive('');
    } else {
      setNextButtonActive('inactive');
    }
  }, [ariaChecked, setNextButtonActive]);

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

export default Space;
