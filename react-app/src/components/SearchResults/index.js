import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './SearchResults.css';

const SearchResults = () => {
  const { cityName, stateName } = useParams();

  const bookings = useSelector((state) => state.bookings);
  const searchResultListings = useSelector((state) => state.searchResults);

  const city = bookings.city;
  const state = bookings.state;

  return (
    <div className='search_results__container'>
      <div className='search-results__listings_container'>
        <div className='search-results__heading-container'>
          <div className='search-results__heading-details'>
            Number of stays · Dates · Number of guests
          </div>
          <div className='search-results__heading-city'>{`Stays in ${cityName}`}</div>
        </div>
        <div className='search-results__bottom-divider'></div>
        <div className='search-results__listings-container'>
          <div className='search-results__listings'>
            <div className='search-results__listing-photo-container'>
              <div className='search-results__listing-photo'></div>
            </div>
            <div className='search-results__listing-details'>
              <div className='search-results__listing-header'>
                <div className='search-results__listing-type-city'>
                  (Space) in (City)
                </div>
                <div className='search-results__listing-title'>title</div>
              </div>
              <div className='search-results__listing-small-divider'></div>
              <div className='search-results_listing-guest-bed-bath'>
                <div className='search-results__listing-info-text'>
                  (Guests)
                </div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>
                  (Bedrooms)
                </div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>(Beds)</div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>(Baths)</div>
              </div>
              <div className='search-results_listing-amenities'>
                <div className='search-results__listing-info-text'>Parking</div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>Wifi</div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>
                  Air conditioning
                </div>
                <div className='search-results__listing-info-text'>·</div>
                <div className='search-results__listing-info-text'>Heat</div>
              </div>
              <div className='search-results_listing-dates-container'>
                <div className='search-results__listing-next-available-dates'>
                  Dates Available within specified start date and end date
                </div>
              </div>
              <div className='search-results__listing-price-container'>
                <div className='amount-text'>$</div>
                <div className='search-results__listing-nightly-price amount-text'>
                  (Price)
                </div>
                <div className='price-text price-divider'>/</div>
                <div className='price-text night-text'>night</div>
              </div>
              <div className='search-results__listing-rating-total-container'>
                <div className='search-results__listing-ratings-container'>
                  <div className='search-results__listing-star-icon  search-results__listing-ratings-text'>
                    (star)
                  </div>
                  <div className='search-results__listing-rating search-results__listing-ratings-text'>
                    (rating)
                  </div>
                  <div className='search-results__listing-total-reviews search-results__listing-ratings-text'>
                    (# reviews)
                  </div>
                </div>
                <div className='search-results__listing-total-container'>
                  <div className='search-results__listing-total-text'>
                    $(total) total
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='search-results__bottom-divider'></div>
        </div>
      </div>
      <div className='search-results__map-container'></div>
    </div>
  );
};

export default SearchResults;
