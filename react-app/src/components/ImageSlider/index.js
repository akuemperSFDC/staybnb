import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../store/listings';
import { useEffect } from 'react';

import './ImageSlider.css';

const ImageSlider = () => {
  const dispatch = useDispatch();

  const listings = useSelector((state) => Object.values(state.listings));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getListings(user.id));
  }, [dispatch, user.id]);

  return <div></div>;
};

export default ImageSlider;
