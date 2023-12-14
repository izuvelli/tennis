import React, { Component } from 'react';
import { Button, DatePicker, Form, Row, Col } from 'antd';
import moment from 'moment';

interface BookingFormProps {
  onSubmit: (values: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [selectedCourt, setSelectedCourt] = React.useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = React.useState<string | null>(null);
  const [lockerRoomNumber, setLockerRoomNumber] = React.useState<number | null>(null);

  const handleCourtButtonClick = (court: string) => {
    setSelectedCourt(court);
    setSelectedTimeRange(null); // Reset selected time range when court changes
    setLockerRoomNumber(null); // Reset locker room number
  };

  const handleTimeRangeButtonClick = (timeRange: string) => {
    setSelectedTimeRange(timeRange);
    setLockerRoomNumber(generateRandomNumber(1, 20)); // Generate and set locker room number
  };

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  const renderTimeRangeButtons = () => {
    const timeRanges = ['12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'];

    const buttonRows = [];
    for (let i = 0; i < timeRanges.length; i += 2) {
      const rowButtons = timeRanges.slice(i, i + 2).map((timeRange) => (
        <Col key={timeRange} span={12} style={{ marginBottom: '10px' }}>
          <Button
            type={selectedTimeRange === timeRange ? 'primary' : 'default'}
            onClick={() => handleTimeRangeButtonClick(timeRange)}
            style={{ width: '100%' }}
          >
            {timeRange}
          </Button>
        </Col>
      ));

      buttonRows.push(
        <Row key={i} gutter={8}>
          {rowButtons}
        </Row>
      );
    }

    return buttonRows;
  };

  const onFinish = (fieldsValue: any) => {
    const selectedRange = fieldsValue['selected-range-picker'];

    const values = {
      'selected-court': selectedCourt,
      'selected-range-picker': [
        selectedRange.format('YYYY-MM-DD'),
        selectedRange.format('YYYY-MM-DD'),
      ],
      'selected-time-range': selectedTimeRange,
      'changing-room-number': lockerRoomNumber,
      'changing-room-code': generateRandomNumber(1000, 9999).toString(), // Generate a random 4-digit code
    };

    onSubmit(values);
  };

  return (
    <Form
      name="tennis_court_booking"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name="selected-court" label="Select Court">
        <Button
          type={selectedCourt === 'court1' ? 'primary' : 'default'}
          htmlType="button"
          onClick={() => handleCourtButtonClick('court1')}
          style={{ marginRight: '8px', width: '100%' }}
        >
          Court 1
        </Button>
        <Button
          type={selectedCourt === 'court2' ? 'primary' : 'default'}
          htmlType="button"
          onClick={() => handleCourtButtonClick('court2')}
          style={{ width: '100%' }}
        >
          Court 2
        </Button>
      </Form.Item>

      <Form.Item name="selected-range-picker" label="Booking Range">
        <DatePicker
          picker="date" // Set picker prop to 'date'
          disabledDate={(current) => current && current < moment().startOf('day')}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Available Times">{renderTimeRangeButtons()}</Form.Item>

      {selectedTimeRange && (
        <Form.Item label="Locker Room Number">
          <span>{lockerRoomNumber}</span>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginLeft: '20%',width: '50%' }}>
          Submit Bookings
        </Button>
      </Form.Item>
    </Form>
  );
};

interface Booking1Props {}

interface Booking1State {}

class Booking1 extends Component<Booking1Props, Booking1State> {
  state: Booking1State = {};

  handleFormSubmit = (values: any) => {
    console.log('Received values of form in booking1: ', values);
    // Add your logic to handle the form submission specific to booking1
  };

  render() {
    return (
      <div>
        <div></div>
        <BookingForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default Booking1;
