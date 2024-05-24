import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';

const { Title } = Typography;

interface Booking {
  id: number;
  selectedCourt: string;
  selectedRangePickerStart: string;
  selectedRangePickerEnd: string;
  selectedTimeRange: string;
  changingRoomNumber: number;
  changingRoomCode: string;
}

interface Registration {
  id: number;
  email: string;
}

const Comp: React.FC = () => {
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [latestRegistration, setLatestRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        // Fetch the latest booking
        const bookingResponse: AxiosResponse<Booking> = await axios.get('http://localhost:5000/latest-booking');
        setLatestBooking(bookingResponse.data);

        // Fetch the latest registration
        const registrationResponse: AxiosResponse<Registration> = await axios.get('http://localhost:5000/latest-registration');
        setLatestRegistration(registrationResponse.data);
      } catch (error) {
        console.error('Error fetching latest data:', error);
      }
    };

    fetchLatestData();
  }, []);

  return (
    <div className="confirmation" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Konfirmation/Kvitto</Title>
      {latestRegistration && (
        <Card
          title="Kvitto skickas till;"
          bordered={false}
          style={{
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}><strong>Email:</strong></Col>
            <Col span={12}>{latestRegistration.email}</Col>
          </Row>
          <Row justify="center" style={{ marginTop: '20px' }}>
          </Row>
        </Card>
      )}
      {latestBooking && (
        <Card
          title="Booking Details"
          bordered={false}
          style={{
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}><strong>Boknings ID :</strong></Col>
            <Col span={12}>{latestBooking.id}</Col>

            <Col span={12}><strong>Pris :</strong></Col>
            <Col span={12}>300kr</Col>

            <Col span={12}><strong>Bana :</strong></Col>
            <Col span={12}>{latestBooking.selectedCourt}</Col>

            <Col span={12}><strong>Datum :</strong></Col>
            <Col span={12}>{latestBooking.selectedRangePickerStart}</Col>
            <Col span={12}><strong>Tid :</strong></Col>
            <Col span={12}>{latestBooking.selectedTimeRange}</Col>
            <Col span={12}><strong>Omklädningsrums nummer :</strong></Col>
            <Col span={12}>{latestBooking.changingRoomNumber}</Col>
            <Col span={12}><strong>Kod till omklädningsrum :</strong></Col>
            <Col span={12}>{latestBooking.changingRoomCode}</Col>
          </Row>
          
          <Row justify="center" style={{ marginTop: '20px' }}>
            <Button href="/">Klar</Button>
          </Row>
        </Card>
     
         ) }</div>
  );
};

export default Comp;
