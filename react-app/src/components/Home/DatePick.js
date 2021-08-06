import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking } from '../../store/bookings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePick.css';

const DatePick = ({ showDatePicker, setShowDatePicker }) => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [clickedOutside, setClickedOutside] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
    }
    const dateRange = {
      start_date: start,
      end_date: end,
    };
    dispatch(setBooking(dateRange));
  };

  const handleDates = () => {
    const dates = {
      start_date: startDate,
      end_date: endDate,
    };
    dispatch(setBooking(dates));
  };

  const handleClearDates = (e) => {
    const dateRange = {
      start_date: '',
      end_date: '',
    };
    dispatch(setBooking(dateRange));
    setClickedOutside(!clickedOutside);
  };

  useEffect(() => {
    if (endDate) {
      setClickedOutside(!clickedOutside);
    }
  }, [endDate]);

  useEffect(() => {
    if (clickedOutside) {
      setShowDatePicker('');
      setTimeout(() => {
        setShowDatePicker('false');
      }, 100);
    }
  }, [clickedOutside, setShowDatePicker]);

  return (
    <>
      <div className='react-datepicker-calendar-container'>
        <DatePicker
          selected={null}
          value={bookings.start_date}
          monthsShown={2}
          onChange={(dates) => onChange(dates)}
          startDate={bookings.start_date}
          endDate={bookings.end_date}
          selectsRange
          shouldCloseOnSelect={true}
          inline
          onCalendarClose={handleDates}
          // onCalendarOpen={handleShowDatePicker}
          minDate={new Date()}
          // onClickOutside={handleClickOutside}
          calendarClassName='calendar-css'
          dayClassName={() => 'calendar-days'}
          dateFormat='dd/MM/yyyy'
          isClearable={true}
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
