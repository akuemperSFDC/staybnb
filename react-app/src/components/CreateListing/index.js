import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Type from './Type';
import Space from './Space';
import Autocomplete from './Autocomplete';
import Guests from './Guests'
import Amenities from './Amenities'
import { questions } from './data';
import { useDispatch, useSelector } from 'react-redux';
import './CreateListing.css';

const CreateListing = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [question, setQuestion] = useState(questions[0]);
  const [index, setIndex] = useState(0);

  const handleNext = (e) => {
    if (pathname === '/create-listing/type') {
      history.push('/create-listing/space');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/space') {
      history.push('/create-listing/address');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/address') {
      history.push('/create-listing/guests');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/guests') {
      history.push('/create-listing/amenities');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/amenities') {
      history.push('/create-listing/photos');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
      e.target.innerHTML = 'Submit';
    } else if (pathname === '/create-listing/photos') {
      history.push('/listings');
    }
  };

  const handleBack = () => {
    if (pathname === '/create-listing/type') {
      history.push('/');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/space') {
      history.push('/create-listing/type');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/address') {
      history.push('/create-listing/space');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/guests') {
      history.push('/create-listing/address');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/amenities') {
      history.push('/create-listing/guests');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/photos') {
      history.push('/create-listing/amenities');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    }
  };

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index]);

  return (
    <div className='create-listing-container'>
      <div className='left-side-question-container'>{question}</div>
      <div className='right-side-selection-container'>
        {question === questions[0] ? (
          <ProtectedRoute path='/create-listing/type'>
            <Type />
          </ProtectedRoute>
        ) : null}
        {question === questions[1] ? (
          <ProtectedRoute path='/create-listing/space'>
            <Space />
          </ProtectedRoute>
        ) : null}
        {question === questions[2] ? (
          <ProtectedRoute path='/create-listing/address'>
            <Autocomplete />
          </ProtectedRoute>
        ) : null}
        {question === questions[3] ? (
          <ProtectedRoute path='/create-listing/guests'>
            <Guests />
          </ProtectedRoute>
        ) : null}
        {question === questions[4] ? (
          <ProtectedRoute path='/create-listing/amenities'>
            <Amenities />
          </ProtectedRoute>
        ) : null}
        {question === questions[5] ? (
          <ProtectedRoute path='/create-listing/photos'>
            <div>Photos</div>
          </ProtectedRoute>
        ) : null}
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
