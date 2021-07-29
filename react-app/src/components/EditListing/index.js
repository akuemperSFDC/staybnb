import { useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getListingByListingId } from '../../store/listing';
import { setKey } from '../../store/createListing';
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

  const handleEditListing = () => {
    //
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
          onClick={handleEditListing}
          className='delete-button edit-form-buttons'
        >
          Delete
        </div>
        <div
          onClick={handleDeleteListing}
          className='edit-button edit-form-buttons'
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default EditListing;
