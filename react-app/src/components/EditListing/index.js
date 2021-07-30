import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListingByListingId } from '../../store/listing';
import { setKey } from '../../store/createListing';
import { editListingThunk } from '../../store/editListing';
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

  const listing_images = editListing.listing_images;

  delete editListing['listing_images'];

  const handleEditListing = () => {
    // e.preventDefault();
    dispatch(editListingThunk(editListing));
    history.push('/listings');
  };

  const handleDeleteListing = () => {
    //
  };

  useEffect(() => {
    dispatch(getListingByListingId(listingId));
    dispatch(setKey(listing));
  }, [dispatch, listing.type]);

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
