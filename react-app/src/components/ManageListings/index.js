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

  let render;
  if (listings.length === 0) {
    render = (
      <div className='no-listings__wrapper'>
        <div className='no-listings__header-container'>
          <div className='no-listings__header'>
            You have no listings to show!
          </div>
          <div className='no-listings__details'>
            To create one, please select your profile button in the upper right
            hand corner of the window and select 'Create listing' from the menu.
          </div>
        </div>
      </div>
    );
  } else {
    render = (
      <div className='manage-listings-container'>
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
              <p> </p>
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
              listing?.listing_images.length > 0 ? (
                <ImageSlider
                  className='manage-listings-slider'
                  images={listing?.listing_images}
                  listing={listing}
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
                    {listing?.space === 'Entire place'
                      ? 'Guests share all areas'
                      : 'Common areas shared with tenants'}
                  </div>
                </div>
              </div>
            </div>
            {listing?.air_conditioning === 2 &&
            listing?.heat === 2 &&
            listing?.wifi === 2 ? (
              ''
            ) : (
              <div className='amenities-container'>
                <div className='top-border-info'></div>
                <div className='amenities-heading'>
                  <p>Amenities</p>
                </div>
                <div className='amenities-details-container'>
                  {listing?.air_conditioning === 1 ? (
                    <div className='amenities-details'>
                      <IoIosSnow />
                      <p>Air Conditioning</p>
                    </div>
                  ) : null}
                  {listing?.heat === 1 ? (
                    <div className='amenities-details'>
                      <GiHeatHaze />
                      <p>Heat</p>
                    </div>
                  ) : null}
                  {listing?.wifi === 1 ? (
                    <div className='amenities-details'>
                      <AiOutlineWifi />
                      <p>Wifi</p>
                    </div>
                  ) : null}
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
  }

  useEffect(() => {
    dispatch(getListings(user.id));
  }, [dispatch, user.id]);

  return <>{render}</>;
};

export default ManageListings;
