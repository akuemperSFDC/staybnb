import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Type from './Type';
import Space from './Space';
import Autocomplete from './Autocomplete';
import Guests from './Guests';
import Amenities from './Amenities';
import Details from './Details';
import UploadPicture from '../UploadPicture';
import { createListing } from '../../store/createListing';
import { questions } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { getListings } from '../../store/listings';
import './CreateListing.css';

const CreateListing = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const createdListing = useSelector((state) => state.createListing.id);
  const listing = useSelector((state) => state.createListing);
  const user = useSelector((state) => state.session.user);
  const [question, setQuestion] = useState(questions[0]);
  const [index, setIndex] = useState(0);
  const [nextButtonActive, setNextButtonActive] = useState('inactive');
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [newListing, setNewListing] = useState();

  const handleNext = async (e) => {
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
      history.push('/create-listing/details');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/details') {
      history.push('/create-listing/photos');
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index]);
      e.target.innerHTML = 'Submit';
    } else if (pathname === '/create-listing/photos') {
      e.preventDefault();
      dispatch(createListing(listing));
      dispatch(getListings(user.id));
    }
  };

  useEffect(() => {
    // setNewListing(createdListing);

    if (createdListing) {
      const uploadImage = async () => {
        console.log(createdListing);
        const formData = new FormData();
        formData.append('listing_id', createdListing);
        formData.append('image', image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        console.log(formData.get('listing_id'));
        const res = await fetch('/api/images', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          await res.json();
          setImageLoading(false);
          history.push('/listings');
        } else {
          setImageLoading(false);
          // a real app would probably use more advanced
          // error handling
          console.log('error');
        }
      };
      uploadImage();
    }
  }, [createdListing]);

  useEffect(() => {
    listing.user_id = user.id;
  }, [dispatch, listing, user.id, pathname]);

  const handleBack = (e) => {
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
    } else if (pathname === '/create-listing/details') {
      history.push('/create-listing/amenities');
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    } else if (pathname === '/create-listing/photos') {
      history.push('/create-listing/details');
      changeSubmitToNextOnBackButtonPress();
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
    }
  };

  const changeSubmitToNextOnBackButtonPress = (e) => {
    const next = document.getElementById('next');
    if (next.innerHTML === 'Submit') next.innerHTML = 'Next';
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
            <Type
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[1] ? (
          <ProtectedRoute path='/create-listing/space'>
            <Space
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[2] ? (
          <ProtectedRoute path='/create-listing/address'>
            <Autocomplete
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[3] ? (
          <ProtectedRoute path='/create-listing/guests'>
            <Guests
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[4] ? (
          <ProtectedRoute path='/create-listing/amenities'>
            <Amenities
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[5] ? (
          <ProtectedRoute path='/create-listing/details'>
            <Details
              setNextButtonActive={setNextButtonActive}
              nextButtonActive={nextButtonActive}
            />
          </ProtectedRoute>
        ) : null}
        {question === questions[6] ? (
          <ProtectedRoute path='/create-listing/photos'>
            <div className='create-listing__add-photo-container'>
              <form
                className='create-listing__add-photo-form'
                encType='multipart/form-data'
                onSubmit={handleNext}
              >
                <input
                  className='create-listing__add-photo-input'
                  type='file'
                  accept='image/*'
                  onChange={updateImage}
                />
                {imageLoading && <p>Loading...</p>}
              </form>
            </div>
          </ProtectedRoute>
        ) : null}
        <div className='bottom-buttons-container'>
          <div className='bottom-buttons back-btn' onClick={handleBack}>
            Back
          </div>
          <div
            id='next'
            className={`bottom-buttons next-btn ${nextButtonActive}`}
            onClick={handleNext}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
