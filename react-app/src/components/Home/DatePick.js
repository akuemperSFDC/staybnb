import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking } from '../../store/bookings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePick.css';
import { format, parseISO } from 'date-fns/esm';

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
      start_date_object: start,
      end_date_object: end,
    };
    dispatch(setBooking(dateRange));
  };

  const handleClickOutside = (e) => {
    if (!clickedOutside) {
      setClickedOutside(!clickedOutside);
    }

    const dates = {
      start_date_object: startDate,
      end_date_object: endDate,
    };
    dispatch(setBooking(dates));
  };

  const handleDates = () => {
    const dates = {
      start_date_object: startDate,
      end_date_object: endDate,
    };
    dispatch(setBooking(dates));
  };

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
          // shouldCloseOnSelect={true}
          value={bookings.start_date_object}
          monthsShown={2}
          onChange={(dates) => onChange(dates)}
          startDate={bookings.start_date_object}
          endDate={bookings.end_date_object}
          selectsRange
          inline
          onCalendarClose={handleDates}
          // onCalendarOpen={handleShowDatePicker}
          minDate={new Date()}
          onClickOutside={handleClickOutside}
          calendarClassName='calendar-css'
          dayClassName={() => 'calendar-days'}
          dateFormat='dd/MM/yyyy'
        />
        <div
          className='react-calendar-submit-button'
          // onClick={handleClickOutside}
        >
          Submit
        </div>
      </div>
    </>
  );
};

export default DatePick;
