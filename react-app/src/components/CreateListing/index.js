import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Type from './Type';
import Space from './Space';
import Autocomplete from './Autocomplete';
import Guests from './Guests';
import Amenities from './Amenities';
import Details from './Details';
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
  const [pageIndex, setPageIndex] = useState(0);

  const handleNext = async (e) => {
    if (pageIndex === 5) {
      setQuestion(questions[index]);
      e.target.innerHTML = 'Submit';
    }
    if (pageIndex === 6) {
      e.preventDefault();
      dispatch(createListing(listing));
      dispatch(getListings(user.id));
      localStorage.setItem('pageIndex', 0);
      localStorage.setItem('type', null);
      localStorage.setItem('space', null);
      localStorage.setItem('address', null);
      localStorage.setItem('city', null);
      localStorage.setItem('country', null);
      localStorage.setItem('latitude', null);
      localStorage.setItem('longitude', null);
      localStorage.setItem('sleeps', null);
      localStorage.setItem('beds', null);
      localStorage.setItem('bedrooms', null);
      localStorage.setItem('bathrooms', null);
      localStorage.setItem('wifi', null);
      localStorage.setItem('air_conditioning', null);
      localStorage.setItem('heat', null);
      localStorage.setItem('title', null);
      localStorage.setItem('description', null);
      localStorage.setItem('pricePerNight', null);
      localStorage.setItem('cleaningFee', null);
      localStorage.setItem('checkInTime', null);
      localStorage.setItem('checkInType', null);
      localStorage.setItem('parking', null);
    }
    setIndex((prevIndex) => prevIndex + 1);
    setQuestion(questions[index]);
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  useEffect(() => {
    // setNewListing(createdListing);

    if (createdListing) {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append('listing_id', createdListing);
        formData.append('image', image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
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
          // error handling
          // console.log('error');
        }
      };
      uploadImage();
    }
  }, [createdListing, history, image]);

  useEffect(() => {
    listing.user_id = user.id;
  }, [dispatch, listing, user.id, pathname]);

  const handleBack = (e) => {
    setNextButtonActive('');
    setPageIndex((prevPageIndex) => prevPageIndex - 1);
    if (pageIndex === 0) {
      history.push('/');
      return;
    }

    if (pageIndex === 6) {
      setIndex((prevIndex) => prevIndex - 1);
      setQuestion(questions[index]);
      changeSubmitToNextOnBackButtonPress();
      return;
    }

    setIndex((prevIndex) => prevIndex - 1);
    setQuestion(questions[index]);
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

  useEffect(() => {
    const pPageIndex = Number(localStorage.getItem('pageIndex') || 0);
    setPageIndex(pPageIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem('pageIndex', Number(pageIndex));
  }, [pageIndex]);

  return (
    <div className='create-listing-container'>
      <div className='left-side-question-container'>{question}</div>
      <div className='right-side-selection-container'>
        {pageIndex === 0 ? (
          <Type
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 1 ? (
          <Space
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 2 ? (
          <Autocomplete
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 3 ? (
          <Guests
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 4 ? (
          <Amenities
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 5 ? (
          <Details
            setNextButtonActive={setNextButtonActive}
            nextButtonActive={nextButtonActive}
          />
        ) : null}
        {pageIndex === 6 ? (
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
