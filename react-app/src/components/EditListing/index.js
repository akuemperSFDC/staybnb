import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListingByListingId } from '../../store/listing';
import { setKey } from '../../store/createListing';
import { editListingThunk } from '../../store/editListing';
import { deleteListing, getListings } from '../../store/listings';
import EditType from './EditType';
import EditSpace from './EditSpace';
import EditGuests from './EditGuests';
import EditAmenities from './EditAmenities';
import EditDetails from './EditDetails';
import './EditListing.css';

const EditListing = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const listing = useSelector((state) => state.listing);
  let editListing = useSelector((state) => state.createListing);
  const user = useSelector((state) => state.session.user);

  const listing_images = editListing.listing_images;

  delete editListing['listing_images'];

  const handleEditListing = () => {
    // e.preventDefault();
    dispatch(editListingThunk(editListing));
    dispatch(getListings(user.id));
    history.push('/listings');
  };

  const handleDeleteListing = () => {
    dispatch(deleteListing(listingId));
    history.push('/listings');
    dispatch(getListingByListingId(listingId));
  };

  useEffect(() => {
    dispatch(getListingByListingId(listingId));
    dispatch(setKey(listing));
  }, [dispatch, listing.type, listingId]);

  return (
    <div className='edit-listing-container'>
      <EditType />
      <EditSpace />
      <EditGuests />
      <EditAmenities />
      <EditDetails />
      <div className='edit-form-button-container'>
        <div
          onClick={handleDeleteListing}
          className='delete-button edit-form-buttons'
        >
          Delete
        </div>
        <div
          onClick={handleEditListing}
          className='edit-button edit-form-buttons'
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default EditListing;
