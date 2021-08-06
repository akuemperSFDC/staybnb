import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentReservation } from '../../store/reservations';
import DatePicker from 'react-datepicker';
import { parseISO, addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../Home/DatePick.css';
import './DatePickEdit.css';

const DatePick = ({ setShowDatePicker, res, currRes }) => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const [dateRange, setDateRange] = useState([
    parseISO(currRes.start_date),
    parseISO(currRes.end_date),
  ]);

  const [startDate, endDate] = dateRange;
  const [clickedOutside, setClickedOutside] = useState(false);

  const handleDates = () => {
    setDateRange([
      new Date(startDate).toISOString(),
      new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
    ]);
    // const dates = {
    //   ...res,
    //   start_date: new Date(startDate).toISOString(),
    //   end_date: new Date(endDate).toISOString(),
    // };
    // dispatch(currentReservation(dates));
  };

  const handleClearDates = (e) => {
    // const dateRange = {
    //   ...res,
    //   start_date: new Date().toISOString(),
    //   end_date: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
    // };
    setDateRange([
      new Date(Date.now()),
      new Date(Date.now() + 3600 * 1000 * 24),
    ]);
    // const dateRange = {
    //   ...res,
    //   start_date: new Date(startDate).toISOString(),
    //   end_date: new Date(endDate).toISOString(),
    // };
    // dispatch(currentReservation(dateRange));
    // setClickedOutside(!clickedOutside);
  };

  useEffect(() => {
    if (clickedOutside) {
      setShowDatePicker('');
      const dates = {
        ...res,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString(),
      };
      dispatch(currentReservation(dates));
      setTimeout(() => {
        setShowDatePicker('false');
      }, 100);
    }
  }, [clickedOutside, setShowDatePicker]);

  useEffect(() => {
    const dates = {
      ...res,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
    };
    dispatch(currentReservation(dates));
  }, [dispatch, res]);

  useEffect(() => {
    if (currRes.end_date) {
      setClickedOutside(false);
    }
  }, [currRes.end_date]);

  return (
    <>
      <div className='react-datepicker-calendar-container edit'>
        <DatePicker
          selected={null}
          // shouldCloseOnSelect={true}
          // value={res.start_date}
          monthsShown={2}
          onChange={(update) => {
            setDateRange(update);
          }}
          // withPortal
          startDate={startDate}
          endDate={endDate}
          selectsRange={true}
          inline
          // onCalendarClose={handleDates}
          // onCalendarOpen={handleShowDatePicker}
          minDate={new Date()}
          // onClickOutside={() => setClickedOutside(!clickedOutside)}
          calendarClassName='calendar-css'
          dayClassName={() => 'calendar-days'}
          dateFormat='yyyy/MM/dd'
          isClearable={true}
          // excludeDates={[new Date(startDate), new Date(startDate)]}
        />
        <div
          className='react-datepicker-calendar-container react-calendar-submit-button'
          onClick={() => setClickedOutside(!clickedOutside)}
        >
          Submit
        </div>
        <div
          className='react-datepicker-calendar-container react-calendar-clear-button'
          onClick={handleClearDates}
        >
          Clear
        </div>
      </div>
    </>
  );
};

export default DatePick;
