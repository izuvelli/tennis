import React from 'react';
import './Bookcourt.css'; // Assuming you have a CSS file for Bookcourt styling
import Navbar from '../../components/navbar.tsx';
import Booking2, { FormValues2 } from '../../components/Booking2';
import Booking1, { BookingFormValues } from '../../components/Booking1.tsx'; // Importing BookingFormValues interface
import { Link } from 'react-router-dom';

import { Row, Col, Card, Button } from 'antd';

const Bookcourt: React.FC = () => {
  const handleSubmit = (values: BookingFormValues) => {
    // Handle form submission logic here
    console.log(values);
  };

  const handleSubmit2 = (values: FormValues2) => {
    console.log(values);
  };

  return (
    <div className="hem">
      <Navbar />
      <div className='main'>
        <center>
          <h1>Boka en Tennishall</h1>
          <p>Välj en ledig tennishall och boka din tid nu!</p>
          <p>När du du har valt en tennishall så får du också ett omklädningsrum</p>
          <p>Priset för en session kostar , 300 SEK </p>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card title="1. Välj Bana">
                <Booking1 onSubmit={handleSubmit}/>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card title="2. Konto">
                <Booking2 onSubmit={handleSubmit2}/>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Button style={{  width:"200px", height:"100%"}} type="primary" block><Link to="/"> Avbryt</Link></Button>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Button  style={{  width:"200px", height:"100%"}} type="primary" block><Link to="/Confirmation"> Nästa</Link></Button>
            </Col>
          </Row>
        </center>
      </div>
    </div>
  );
}

export default Bookcourt;
