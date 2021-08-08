import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getListingByListingId } from '../../store/listing';
import { createBooking, setBooking } from '../../store/bookings';
import { getReservations } from '../../store/reservations';
import { IoIosArrowDown } from 'react-icons/io';
import LargeImageSlider from '../ImageSlider/LargeImageSlider';
import BookingDatePick from './BookingDatePick';
import BookingGuests from './BookingGuests';
import { AiOutlineWifi } from 'react-icons/ai';
import { GiHeatHaze } from 'react-icons/gi';
import { IoIosSnow } from 'react-icons/io';
import './ViewListing.css';

const ViewListing = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const history = useHistory();

  const listing = useSelector((state) => state.listing);
  const bookings = useSelector((state) => state.bookings);
  const { id } = useSelector((state) => state.session.user);

  const [showDatePicker, setShowDatePicker] = useState('false');
  const [showGuestSelect, setShowGuestSelect] = useState('false');
  const [reserveButtonActive, setReserveButtonActive] = useState('');
  const [guestCount, setGuestCount] = useState();

  const options = { month: 'short', day: 'numeric' };

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

  const handleShowDatePicker = () => {
    if (showDatePicker === 'false') {
      setShowDatePicker('true');
    } else {
      setShowDatePicker('false');
    }
  };

  const priceNights = (ppn, days) => {
    return ppn * days;
  };

  const serviceFee = (ppn, days) => {
    return ppn * days * 0.01;
  };

  const totalPrice = (ppn, cleaningFee, serviceFee) => {
    return ppn + cleaningFee + serviceFee;
  };

  const handleShowGuests = () => {
    if (showGuestSelect === 'false') {
      setShowGuestSelect('true');
    } else {
      setShowGuestSelect('false');
    }
  };

  const handleReservationSubmit = () => {
    dispatch(createBooking(bookings));
    dispatch(getReservations(id));
    history.push('/reservations');
    setTimeout(() => {
      dispatch(
        setBooking({
          listing_id: null,
          user_id: null,
          guestCount: null,
          start_date: null,
          end_date: null,
          start_date_object: null,
          end_date_object: null,
          cityState: null,
          city: null,
          state: null,
        })
      );
    }, 100);
  };

  useEffect(() => {
    dispatch(getListingByListingId(Number(listingId)));
    dispatch(
      setBooking({
        ...bookings,
        listing_id: Number(listingId),
        user_id: id,
        guestCount,
      })
    );
  }, [dispatch, guestCount]);

  useEffect(() => {
    const pGuests = localStorage.getItem('guests');
    if (bookings.guestCount && pGuests !== 'null') {
      localStorage.setItem('guests', bookings.guestCount);
      setGuestCount(Number(pGuests));
      dispatch(setBooking({ guestCount }));
    } else if (bookings.guestCount && pGuests === 'null') {
      setGuestCount(Number(pGuests));
      localStorage.setItem('guests', bookings.guestCount);
      dispatch(setBooking({ guestCount }));
    } else if (!bookings.guestCount && pGuests !== 'null') {
      setGuestCount(Number(pGuests));
      dispatch(setBooking({ guestCount: Number(pGuests) }));
    } else {
      localStorage.setItem('guests', null);
      dispatch(setBooking({ guestCount }));
    }
  }, []);

  useEffect(() => {
    if (bookings.start_date && bookings.end_date && bookings.guestCount) {
      setReserveButtonActive('');
    } else {
      setReserveButtonActive('inactive');
    }
  }, [bookings.start_date, bookings.end_date, bookings.guestCount]);

  useEffect(() => {}, [guestCount]);

  return (
    <div className='view-listing__page-wrapper'>
      <div className='view-listing__container'>
        <div className='view-listing__header-container'>
          <div className='view-listing__main-header'>{listing?.title}</div>
          <div className='view-listing__sub-header-container'>
            <div className='view-listing__sub-header-rating'>{''}</div>
            <div className='view-listing__sub-header-location'>
              <div className='sub-header__city sub-header__location'>
                {listing?.city},
              </div>
              <div className='sub-header__state sub-header__location'>
                {listing?.state},
              </div>
              <div className='sub-header__country sub-header__location'>
                {listing?.country}
              </div>
            </div>
          </div>
        </div>
        <div className='view-listing__photos-container'>
          <LargeImageSlider
            images={listing?.listing_images}
            listing={listing}
          />
        </div>
        <div className='view-listing__details-booking-contianer'>
          <div className='view-listing__details-container'>
            <div className='view-isting__details-header-container'>
              <div className='view-listing__details-header-left'>
                <div className='view-listing__details-header'>
                  {`${listing.space} hosted by ${listing?.Listing_User?.first_name}`}
                </div>
                <div className='view-listing__details-subheader'>
                  <div className='details-subheader__guests'>
                    {`${listing.sleeps} guests`}
                  </div>
                  <div className='dot'>·</div>
                  <div className='details-subheader__bedrooms'>
                    {`${listing.bedrooms} bedrooms`}
                  </div>
                  <div className='dot'>·</div>
                  <div className='details-subheader__beds'>{`${listing.beds} beds`}</div>
                  <div className='dot'>·</div>
                  <div className='details-subheader__baths'>
                    {`${listing.bathrooms} baths`}
                  </div>
                </div>
              </div>
              <div className='view-listing__details-header-left'>
                <img
                  className='viewlisting__listing-owner-picture'
                  src={listing?.Listing_User?.img_url}
                  alt=''
                />
              </div>
            </div>
            <div className='view-listing__small-divider'></div>
            <div className='view-listing__description-container'>
              <div className='view-listing__desciption-header'>About</div>
              <div className='view-listing__desiption-text'>
                {listing.description}
              </div>
            </div>
            <div className='view-listing__small-divider'></div>
            <div className='view-listing__amenities-container'>
              <div className='view-listing__amenities-header'>
                What this place offers
              </div>
              <div className='view-listing__amenities-list'>
                <div className='view-listing__amenities-wifi view-listing__amenity-container'>
                  <AiOutlineWifi className='view-listing__amenity-icon' />
                  <div className='view-listing__amenity-name'>Wifi</div>
                </div>
                <div className='view-listing__amenities-ac view-listing__amenity-container'>
                  <IoIosSnow className='view-listing__amenity-icon' />
                  <div className='view-listing__amenity-name'>
                    Air Conditioning
                  </div>
                </div>
                <div className='view-listing__amenities-heat view-listing__amenity-container'>
                  <GiHeatHaze className='view-listing__amenity-icon' />
                  <div className='view-listing__amenity-name'>Heat</div>
                </div>
              </div>
            </div>
            <div className='view-listing__small-divider'></div>
          </div>
          <div className='view-listing__booking-container'>
            <div className='view-listing__bookings-form-container'>
              <div className='view-listing__booking-header'>
                <div className='view-listing__nightly-price'>
                  <div className='nightly-price__price'>
                    <div className='price-nights-number'>{`$${listing.price_per_night}`}</div>
                    <div className='price-nights-text'>/ night</div>
                  </div>
                  <div className=''>(Rating)</div>
                </div>
              </div>
              <div className='view-listing__booking-form'>
                <div
                  onClick={handleShowDatePicker}
                  className='booking-form__dates'
                >
                  <div className='booking-form__check-in'>
                    <div className='booking-form__check-in-label booking-form__small-labels'>
                      CHECK-IN
                    </div>
                    <div className='booking-form__check-in-date-label'>
                      {bookings.start_date
                        ? bookings.start_date.toLocaleDateString(
                            'en-us',
                            options
                          )
                        : 'Start date'}
                    </div>
                  </div>
                  <div className='booking-form__vert-divider'></div>
                  <div className='booking-form__check-out'>
                    <div className='booking-form__check-out-label booking-form__small-labels'>
                      CHECK-OUT
                    </div>
                    <div className='booking-form__check-out-date-label'>
                      {bookings.end_date
                        ? bookings.end_date.toLocaleDateString('en-us', options)
                        : 'End date'}
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleShowGuests}
                  className='booking-form__guests'
                >
                  <div className='booking-form__guests-left-container'>
                    <div className='booking-form__guests-label booking-form__small-labels'>
                      GUESTS
                    </div>
                    <div className='booking-form__guests-amount'>
                      {guestCount && guestCount
                        ? `${
                            guestCount > 1
                              ? `${guestCount} guests`
                              : `${guestCount} guest`
                          }`
                        : 'Add guests'}
                    </div>
                  </div>
                  <div className='booking-form__guests-right-container'>
                    <div className='booking-form__guests-arrow-icon'>
                      <IoIosArrowDown />
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={handleReservationSubmit}
                className={`view-listing__reserve-button ${reserveButtonActive}`}
              >
                Reserve
              </div>
              <div className='view-listing__subtotal-container'>
                <div className='subtotal-container__nights_cost'>
                  <div className='subtotal-container__nights subtotal-text'>
                    {isNaN(
                      getNumberOfDays(bookings.start_date, bookings.end_date)
                    ) === false
                      ? `$${listing.price_per_night}
                    x ${
                      getNumberOfDays(bookings.start_date, bookings.end_date) >
                      1
                        ? `${getNumberOfDays(
                            bookings.start_date,
                            bookings.end_date
                          )} nights`
                        : `${getNumberOfDays(
                            bookings.start_date,
                            bookings.end_date
                          )} night`
                    }
                    `
                      : `$${listing.price_per_night} x 0 nights`}
                  </div>
                  <div className='subtotal-container__total_cost subtotal-price'>
                    {isNaN(
                      getNumberOfDays(bookings.start_date, bookings.end_date)
                    ) === true
                      ? 0
                      : `$${priceNights(
                          listing.price_per_night,
                          getNumberOfDays(
                            bookings.start_date,
                            bookings.end_date
                          )
                        )}`}
                  </div>
                </div>
                <div className='subtotal-container__cleaning-fee'>
                  <div className='subtotal-container__cleaning-fee-text subtotal-text'>
                    Cleaning fee
                  </div>
                  <div className='subtotal-container__cleaning-fee-price subtotal-price'>
                    {`$${listing.cleaning_fee}`}
                  </div>
                </div>
                <div className='subtotal-container__service-fee'>
                  <div className='subtotal-container__service-fee-text subtotal-text'>
                    Service fee
                  </div>
                  <div className='subtotal-container__service-fee-price subtotal-price'>
                    {isNaN(
                      getNumberOfDays(bookings.start_date, bookings.end_date)
                    ) === true
                      ? 0
                      : `$${serviceFee(
                          priceNights(
                            listing.price_per_night,
                            getNumberOfDays(
                              bookings.start_date,
                              bookings.end_date
                            )
                          ),
                          getNumberOfDays(
                            bookings.start_date,
                            bookings.end_date
                          )
                        )}`}
                  </div>
                </div>
                <div className='total-container__divider'></div>
                <div className='subtotal-container__total'>
                  <div className='total-container__total-text'>Total</div>
                  <div className='total-container__total-price'>
                    {isNaN(
                      getNumberOfDays(bookings.start_date, bookings.end_date)
                    ) === true
                      ? 0
                      : `$${totalPrice(
                          priceNights(
                            listing.price_per_night,
                            getNumberOfDays(
                              bookings.start_date,
                              bookings.end_date
                            )
                          ),
                          listing.cleaning_fee,
                          serviceFee(
                            priceNights(
                              listing.price_per_night,
                              getNumberOfDays(
                                bookings.start_date,
                                bookings.end_date
                              )
                            ),
                            getNumberOfDays(
                              bookings.start_date,
                              bookings.end_date
                            )
                          )
                        )}`}
                  </div>
                </div>
              </div>
              {showDatePicker === 'true' ? (
                <BookingDatePick
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                />
              ) : null}
              {showGuestSelect === 'true' ? (
                <BookingGuests
                  setGuestCount={setGuestCount}
                  guestCount={guestCount}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListing;
