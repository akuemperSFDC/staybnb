import { useSelector, useDispatch } from 'react-redux';
import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import './ManageListings.css';

const ManageListings = () => {
  const dispatch = useDispatch();

  const listings = useSelector((state) => Object.values(state.listings));
  const user = useSelector((state) => state.session.user);

  console.log(listings);

  useEffect(() => {
    dispatch(getListings(user.id));
  });

  return (
    <div>
      {listings?.map((listing) => (
        <div>
          <div>{listing.title}</div>
          <div>{listing.description}</div>
          <div>{listing.type}</div>
        </div>
      ))}
    </div>
  );
};

export default ManageListings;
