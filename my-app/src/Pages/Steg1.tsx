import React, { Component } from 'react';
import { Button, DatePicker, Form } from 'antd';


interface BookingFormProps {
  onSubmit: (values: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [selectedCourt, setSelectedCourt] = React.useState<string | null>(null);

  const handleCourtButtonClick = (court: string) => {
    setSelectedCourt(court);
  };

  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    const selectedRange = fieldsValue['selected-range-picker'];

    const values = {
      'selected-court': selectedCourt,
      'selected-range-picker': [
        selectedRange[0].format('YYYY-MM-DD HH:mm:ss'),
        selectedRange[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
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
          style={{ marginRight: '8px' }}
        >
          Court 1
        </Button>
        <Button
          type={selectedCourt === 'court2' ? 'primary' : 'default'}
          htmlType="button"
          onClick={() => handleCourtButtonClick('court2')}
        >
          Court 2
        </Button>
      </Form.Item>

      <Form.Item name="selected-range-picker" label="Booking Range">
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Booking
        </Button>
      </Form.Item>
    </Form>
  );
};

interface Steg1Props {}

interface Steg1State {}

class Steg1 extends Component<Steg1Props, Steg1State> {
  state: Steg1State = {};

  handleFormSubmit = (values: any) => {
    console.log('Received values of form in Steg1: ', values);
    // Add your logic to handle the form submission specific to Steg1
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

export default Steg1;
