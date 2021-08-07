import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  searchListingsCityState,
  searchAllListings,
} from '../../store/searchResults';
import SmallImageSlider from '../ImageSlider/SmallImageSlider';

import './SearchResults.css';

const SearchResults = () => {
  const dispatch = useDispatch();

  const searchResultListings = useSelector((state) =>
    Object.values(state.searchResults)
  );
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState('');

  const getNumberOfDays = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  };

  const getTotal = (days, ppn) => {
    return days * ppn;
  };

  // const city = bookings.city;
  // const state = bookings.state;

  useEffect(() => {
    if (city && state !== 'null') {
      const location = { city, state };
      dispatch(searchListingsCityState(location));
    }
  }, [city, state]);

  useEffect(() => {
    if (
      city === 'null' &&
      state === 'null' &&
      startDate === 'null' &&
      endDate === 'null' &&
      guests === 'null'
    ) {
      dispatch(searchAllListings());
    }
  }, [dispatch, city, state, startDate, endDate, guests]);

  useEffect(() => {
    const pCity = localStorage.getItem('city');
    const pState = localStorage.getItem('state');
    const pStartDate = localStorage.getItem('start_date');
    const pEndDate = localStorage.getItem('end_date');
    const pGuests = localStorage.getItem('guests');
    setCity(pCity);
    setState(pState);
    setStartDate(pStartDate);
    setEndDate(pEndDate);
    setGuests(pGuests);
  }, [city, state, startDate, endDate, guests]);

  const options = { month: 'short', day: 'numeric' };

  return (
    <div className='search_results__container'>
      <div className='search-results__listings_container'>
        <div className='search-results__heading-container'>
          <div className='search-results__heading-details'>
            {searchResultListings.length === 1
              ? `${searchResultListings.length} stay `
              : `${searchResultListings.length} stays `}

            {startDate === 'null'
              ? ''
              : `· ${new Date(startDate).toLocaleDateString(
                  'en-us',
                  options
                )} - ${new Date(endDate).toLocaleDateString(
                  'en-us',
                  options
                )} `}
            {guests === 'null'
              ? ''
              : guests > 1
              ? `· ${guests} guests `
              : `· ${guests} guest `}
          </div>
          <div className='search-results__heading-city'>
            {city === 'null' ? 'Random stays' : `Stays in ${city}`}
          </div>
        </div>
        <div className='search-results__bottom-divider'></div>

        <div className='search-results__listings-container'>
          {searchResultListings &&
            searchResultListings.map((listing) => (
              <div key={listing.id}>
                <div
                  to={`/listings/view/${listing.title}/${listing.id}`}
                  className='search-results__listings'
                >
                  <div className='search-results__listing-photo-container'>
                    <div className='search-results__listing-photo'>
                      {listing?.listing_images.length &&
                      listing?.listing_images.length >= 1 ? (
                        <SmallImageSlider
                          className='small-listing-image'
                          images={listing?.listing_images}
                          listing={listing}
                        />
                      ) : (
                        <img
                          src='https://lahousing.lacity.org/AAHR/Images/No_Image_Available.jpg'
                          alt=''
                          className='small-listing-image'
                        />
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/listings/view/${listing.title}/${listing.id}`}
                    className='search-results__listing-details'
                  >
                    <div className='search-results__listing-header'>
                      <div className='search-results__listing-type-city'>
                        {listing.space} in {listing.city}
                      </div>
                      <div className='search-results__listing-title'>
                        {listing.title}
                      </div>
                    </div>
                    <div className='search-results__listing-small-divider'></div>
                    <div className='search-results_listing-guest-bed-bath'>
                      <div className='search-results__listing-info-text'>
                        {listing.sleeps > 1
                          ? `${listing.sleeps} guests`
                          : `${listing.sleeps} guest`}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.bedrooms > 1
                          ? `${listing.bedrooms} bedrooms`
                          : `${listing.bedrooms} bedroom`}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.beds > 1
                          ? `${listing.beds} beds`
                          : `${listing.beds} bed`}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.bathrooms > 1
                          ? `${listing.bathrooms} baths`
                          : `${listing.bathrooms} bath`}
                      </div>
                    </div>
                    <div className='search-results_listing-amenities'>
                      <div className='search-results__listing-info-text'>
                        {listing.parking}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.wifi && 'Wifi'}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.air_conditioning && 'Air Conditioning'}
                      </div>
                      <div className='search-results__listing-info-text'>·</div>
                      <div className='search-results__listing-info-text'>
                        {listing.heat && 'Heat'}
                      </div>
                    </div>
                    <div className='search-results_listing-dates-container'>
                      <div className='search-results__listing-next-available-dates'>
                        {startDate === 'null' && endDate === 'null'
                          ? 'No dates selected'
                          : `${new Date(startDate).toLocaleDateString(
                              'en-us',
                              options
                            )} - ${new Date(endDate).toLocaleDateString(
                              'en-us',
                              options
                            )}`}
                      </div>
                    </div>
                    <div className='search-results__listing-price-container'>
                      <div className='amount-text'>$</div>
                      <div className='search-results__listing-nightly-price amount-text'>
                        {listing.price_per_night}
                      </div>
                      <div className='price-text price-divider'>/</div>
                      <div className='price-text night-text'>night</div>
                    </div>
                    <div className='search-results__listing-rating-total-container'>
                      <div className='search-results__listing-ratings-container'>
                        <div className='search-results__listing-star-icon  search-results__listing-ratings-text'>
                          {' '}
                        </div>
                        <div className='search-results__listing-rating search-results__listing-ratings-text'>
                          {' '}
                        </div>
                        <div className='search-results__listing-total-reviews search-results__listing-ratings-text'>
                          {' '}
                        </div>
                      </div>
                      <div className='search-results__listing-total-container'>
                        <div className='search-results__listing-total-text'>
                          {isNaN(getNumberOfDays(startDate, endDate)) === false
                            ? `$${getTotal(
                                getNumberOfDays(startDate, endDate),
                                listing.price_per_night
                              )} total`
                            : '$0 total'}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='search-results__bottom-divider'></div>
              </div>
            ))}
        </div>
      </div>
      <div className='search-results__map-container'></div>
    </div>
  );
};

export default SearchResults;
