import React, { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Col } from 'antd';
import moment, { Moment } from 'moment';
import axios from 'axios';

export interface BookingFormProps {
  onSubmit: (values: BookingFormValues) => void;
}

export interface BookingFormValues {
  'selectedCourt': string | null;
  'selectedRangePicker': [string, string];
  'selectedTimeRange': string | null;
  'changingRoomNumber': number | null;
  'changingRoomCode': string;
}

const Booking1: React.FC<BookingFormProps> = ({onSubmit}) => {
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null);
  const [lockerRoomNumber, setLockerRoomNumber] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      fetchBookedSlots(selectedCourt, selectedDate);
    }
  }, [selectedCourt, selectedDate]);

  const fetchBookedSlots = (court: string, date: string) => {
    axios.get(`http://localhost:5000/get-booked-slots?court=${court}&date=${date}`)
      .then(response => {
        const { bookedSlots } = response.data;
        setBookedSlots(bookedSlots);
      })
      .catch(error => {
        console.error('Error fetching booked slots:', error);
      });
  };

  const handleCourtButtonClick = (court: string) => {
    setSelectedCourt(court);
    setSelectedTimeRange(null);
    setLockerRoomNumber(null); 
  };

  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setSelectedDate(date.format('YYYY-MM-DD'));
    }
  };

  const handleTimeRangeButtonClick = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
    setLockerRoomNumber(generateRandomNumber(1, 20)); 
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  const renderTimeRangeButtons = () => {
    const timeRanges = ['12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'];

    return timeRanges.map((timeRange) => {
      const isBooked = bookedSlots.includes(timeRange);
      return (
        <Col key={timeRange} span={12} style={{ marginBottom: '10px', marginLeft: "10px" }}>
          <Button
            type={selectedTimeRange === timeRange ? 'primary' : 'default'}
            onClick={() => handleTimeRangeButtonClick(timeRange)}
            style={{
              width: '300%',
              backgroundColor: isBooked ? 'red' : undefined,
              pointerEvents: isBooked ? 'none' : 'auto',
            }}
            disabled={isBooked}
          >
            {timeRange}
          </Button>
        </Col>
      );
    });
  };

  const onFinish = (fieldsValue: { 'selected-range-picker': Moment }) => {
    const selectedRange = fieldsValue['selected-range-picker'];

    const values: BookingFormValues = {
      'selectedCourt': selectedCourt,
      'selectedRangePicker': [
        selectedRange.format('YYYY-MM-DD'),
        selectedRange.format('YYYY-MM-DD'),
      ],
      'selectedTimeRange': selectedTimeRange,
      'changingRoomNumber': lockerRoomNumber,
      'changingRoomCode': generateRandomNumber(1000, 9999).toString(), 
    };

  
    axios.post('http://localhost:5000/submit-booking', values)
      .then(() => {
        console.log('Booking submitted successfully');
        setSubmitted(true);
        onSubmit(values);
      })
      .catch(error => {
        console.error('Error submitting booking:', error);
      });
  };


  const handleGorOmClick = () => {
    axios.delete('http://localhost:5000/delete-latest-booking')
      .then(() => {
        console.log('Latest booking deleted successfully');
        setSubmitted(false);
        setSelectedCourt(null);
        setSelectedTimeRange(null);
        setLockerRoomNumber(null);
      })
      .catch(error => {
        console.error('Error deleting latest booking:', error);
      });
  };

  return (
    <Form
      name="tennis_court_booking"
      onFinish={onFinish}
      style={{
        maxWidth: '50%', 
        marginBottom: '2rem', 
      }}
    >
     
      <Form.Item name="selected-court" label="Välj bana" style={{ marginBottom: '1rem' }}>
        <Button
          type={selectedCourt === 'court1' ? 'primary' : 'default'}
          htmlType="button"
          onClick={() => handleCourtButtonClick('court1')}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          Bana 1
        </Button>
        <br></br>
        <Button
          type={selectedCourt === 'court2' ? 'primary' : 'default'}
          htmlType="button"
          onClick={() => handleCourtButtonClick('court2')}
          style={{ width: '100%' }} 
        >
          Bana 2
        </Button>
      </Form.Item>

      <Form.Item name="selected-range-picker" label="Datum">
        <DatePicker
          picker="date"
          onChange={handleDateChange}
          disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Tillgängliga tider">{renderTimeRangeButtons()}</Form.Item>

      {selectedTimeRange && (
        <Form.Item label="Omklädningsrums nummer">
          <span>{lockerRoomNumber}</span>
        </Form.Item>
      )}

      {submitted && (
        <Form.Item>
          <Button type="primary" disabled>
            Skickad
          </Button>
          <Button
            type="default"
            onClick={() => {
              handleGorOmClick();
              setSelectedTimeRange(null);
            }}
          >
            Gör om
          </Button>
        </Form.Item>
      )}

      {!submitted && (
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '0%', width: '100%' }}>
            Boka
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
  export default Booking1;