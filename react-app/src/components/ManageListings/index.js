import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import ImageSlider from '../ImageSlider';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import './ManageListings.css';

const ManageListings = () => {
  const dispatch = useDispatch();

  const listings = useSelector((state) => Object.values(state.listings));

  const user = useSelector((state) => state.session.user);

  const formatCheckinTime = (time) => {
    const [hour, minutes] = time.split(':');
    if (Number(hour) === 12) {
      return '12:00 PM';
    } else if (Number(hour) > 12) {
      const pmTime = Number(hour) - 12;
      return `${pmTime.toString()}:${minutes} PM`;
    } else {
      return time;
    }
  };

  useEffect(() => {
    dispatch(getListings(user.id));
  }, [dispatch, user.id]);

  return (
    <div className='manage-listings-container'>
      {/* <div className='total-listings-container'>
        <div className='total-listings-text'>Total listings:</div>
        <div>{listings?.length}</div>
      </div> */}
      {listings?.map((listing, index) => (
        <div key={index} className='manage-listings-showcase'>
          <div className='heading'>
            <div className='title-header showcase-element'>
              <div>{listing.title}</div>
            </div>
            <Link
              id={listing.id}
              className='edit-listing-button'
              to={`/listings/${listing.id}/edit`}
            >
              <p id={listing.id}>Edit</p>
            </Link>
          </div>
          <div className='title-subheading '>
            <p>Rating</p>
            <div className='subheading-location'>
              <p>
                {listing.city}, {listing.state}, {listing.country}
              </p>
            </div>
          </div>
          <div className='photos-container'>
            <div className='top-border-info'></div>
            <div className='photos-heading '>Photos</div>
            {listing?.listing_images.length &&
            listing?.listing_images.length >= 1 ? (
              <ImageSlider
                className='manage-listings-slider'
                images={listing?.listing_images}
              />
            ) : (
              <img
                src='https://lahousing.lacity.org/AAHR/Images/No_Image_Available.jpg'
                alt=''
                className='listing-image'
              />
            )}
          </div>
          <div className='listing-info-container'>
            <div className='top-border-info'></div>
            <div className='listing-info-heading'>
              <p>Rooms and spaces</p>
            </div>
            <div className='listing-info-details'>
              <div className='listing-info-left'>
                <div className='left-details'>
                  <p>Bedrooms:</p>
                  {listing?.bedrooms}
                </div>
                <div className='left-details'>
                  <p>Beds:</p>
                  {listing?.beds}
                </div>
                <div className='left-details'>
                  <p>Bathrooms:</p>
                  {listing?.bathrooms}
                </div>
              </div>
              <div className='listing-info-right'>
                <div className='right-details'>
                  <p>Sleeps:</p>
                  {listing?.sleeps}
                </div>
                <div className='right-details'>
                  <p>Space:</p>
                  <div className='space-details-fetch'>{listing?.space}</div>
                </div>
                <div className='right-details space-details'>
                  {listing?.space === 'Entire Place'
                    ? 'Guests share all areas'
                    : 'Common areas shared with tenants'}
                </div>
              </div>
            </div>
          </div>
          {listing?.air_condition === false &&
          listing?.heat === false &&
          listing?.wifi === false ? (
            ''
          ) : (
            <div className='amenities-container'>
              <div className='top-border-info'></div>
              <div className='amenities-heading'>
                <p>Amenities</p>
              </div>
              <div className='amenities-details-container'>
                <div className='amenities-details'>
                  {listing?.air_conditioning === true ? <IoIosSnow /> : null}
                  <p>Air Conditioning</p>
                </div>
                <div className='amenities-details'>
                  {listing?.heat === true ? <GiHeatHaze /> : null}
                  <p>Heat</p>
                </div>
                <div className='amenities-details'>
                  {listing?.wifi === true ? <AiOutlineWifi /> : null}
                  <p>Wifi</p>
                </div>
              </div>
            </div>
          )}

          <div className='checkin-fees-container'>
            <div className='top-border-info'></div>
            <div className='checkin-fees-headings-container'>
              <div className='checkin-fees-heading-1'>
                <p>Check-in</p>
              </div>
              <div className='checkin-fees-heading-2'>
                <p>Fees</p>
              </div>
            </div>
            <div className='checkin-fees-details-container'>
              <div className='checkin-container-left'>
                <div className='checkin-fees-details'>
                  <p>Check-in time: </p>
                  {formatCheckinTime(listing?.check_in_time)}
                  {/* {Number(listing?.check_in_time) > 12 ? (listing?.check_in_time - 12 )'PM' : listing?.check_in_time 'AM'} */}
                </div>
                <div className='checkin-fees-details'>
                  <p>Check-in type: </p>
                  {listing?.check_in_type}
                </div>
              </div>
              <div className='checkin-container-right'>
                <div className='checkin-fees-details'>
                  <p>Nightly Price:</p>
                  <div className='fees-details-formatting'>
                    <p>$</p>
                    {listing?.price_per_night}
                  </div>
                </div>
                <div className='checkin-fees-details'>
                  <p>Cleaning Fee:</p>
                  <div className='fees-details-formatting'>
                    <p>$</p>
                    {listing?.cleaning_fee}
                  </div>
                </div>
              </div>
            </div>
            <div className='bottom-border-info'></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageListings;
