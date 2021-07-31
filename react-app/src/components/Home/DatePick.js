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

  console.log(bookings);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [clickedOutside, setClickedOutside] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    const dateRange = {
      start_date: start,
      end_date: end,
    };
    dispatch(setBooking(dateRange));
  };

  const handleClickOutside = (e) => {
    if (!clickedOutside) {
      setClickedOutside(!clickedOutside);
    }
  };

  // const handleShowDatePicker = () => {
  //   if (showDatePicker === 'false') {
  //     setShowDatePicker('true');
  //   } else {
  //     setShowDatePicker('false');
  //   }
  // };

  const handleDates = () => {
    const dates = {
      start_date: startDate,
      end_date: endDate,
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

  // useEffect(() => {
  //   dispatch(
  //     setBooking({
  //       start_date: startDate,
  //       end_date: endDate,
  //     })
  //   );
  // }, []);

  return (
    <>
      <div className='react-datepicker-calendar-container'>
        <DatePicker
          selected={bookings.start_date}
          // shouldCloseOnSelect={false}
          monthsShown={2}
          onChange={onChange}
          startDate={bookings.start_date}
          endDate={bookings.end_date}
          selectsRange
          inline
          onCalendarClose={handleDates}
          // onCalendarOpen={handleShowDatePicker}
          minDate={new Date()}
          onClickOutside={handleClickOutside}
          calendarClassName='calendar-css'
          dayClassName={() => 'calendar-days'}
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
