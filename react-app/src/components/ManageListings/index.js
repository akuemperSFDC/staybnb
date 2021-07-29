import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../store/listings';
import { useEffect } from 'react';

import './ManageListings.css';

const ManageListings = () => {
  const dispatch = useDispatch();

  const listings = useSelector((state) => Object.values(state.listings));

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getListings(user.id));
  }, [dispatch, user.id]);

  return (
    <div className='manage-listings-container'>
      {listings?.map((listing, index) => (
        <div key={index} className='manage-listings-showcase'>
          <div className='title-header'>
            <div>{listing.title}</div>
          </div>
          <div className='title-subheading'>
            <div>Rating</div>
            <div className='subheading-location'>
              {listing.city}, {listing.state}, {listing.country}
            </div>
          </div>

          {listing?.listing_images.map((img, i) => (
            <img
              key={[index, i]}
              className='manage-listings-images'
              src={img.img_url}
              alt=''
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ManageListings;
