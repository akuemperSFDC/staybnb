import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooking } from '../../store/bookings';
import { currentReservation } from '../../store/reservations';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import '../Home/DatePick.css';

const DatePick = ({ setShowDatePicker, res }) => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);

  const [dateRange, setDateRange] = useState([
    parseISO(res.start_date),
    parseISO(res.end_date),
  ]);
  const [startDate, endDate] = dateRange;
  const [clickedOutside, setClickedOutside] = useState(false);

  const onChange = (dates) => {
    // const [start, end] = dates;
    // console.log(start, end);
    // if (start && end) {
    //   setStartDate(start);
    //   setEndDate(end);
    // }
    // const dateRange = {
    //   ...res,
    //   start_date: start,
    //   end_date: end,
    // };
    // dispatch(currentReservation(dateRange));
  };

  const handleDates = () => {
    const dates = {
      ...res,
      start_date: startDate,
      end_date: endDate,
    };
    dispatch(currentReservation(dates));
  };

  const handleClearDates = (e) => {
    const dateRange = {
      ...res,
      start_date: '',
      end_date: '',
    };
    dispatch(currentReservation(dateRange));
    setClickedOutside(!clickedOutside);
  };

  useEffect(() => {
    if (clickedOutside) {
      setShowDatePicker('');
      setTimeout(() => {
        setShowDatePicker('false');
      }, 100);
    }
  }, [clickedOutside, setShowDatePicker]);

  useEffect(() => {
    const dates = {
      ...res,
      start_date: startDate,
      end_date: endDate,
    };
    dispatch(currentReservation(dates));
  }, [dispatch, startDate, endDate, res.start_date, res.end_date, res]);

  return (
    <>
      <div className='react-datepicker-calendar-container'>
        <DatePicker
          selected={null}
          shouldCloseOnSelect={true}
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
          onCalendarClose={handleDates}
          // onCalendarOpen={handleShowDatePicker}
          minDate={new Date()}
          onClickOutside={() => setClickedOutside(!clickedOutside)}
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
