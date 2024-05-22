import React from 'react';
import './Bookcourt.css'; // Assuming you have a CSS file for Bookcourt styling
import Navbar from '../../components/navbar.tsx';
import Footer from '../../components/footer.tsx';
import Booking2, { FormValues2 } from '../../components/Booking2';
import Booking1, { BookingFormValues } from '../../components/Booking1.tsx'; // Importing BookingFormValues interface

import { Row, Col } from 'antd';

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
          <p>När du du har valt en tennishall så får du också en </p>

          <Row gutter={20}> {/* Set gutter to add space between columns */}
            <Col span={12}> {/* Set span to determine column width */}
              <Booking1 onSubmit={handleSubmit}/>
            </Col>
            <Col span={12}> {/* Set span to determine column width */}
              <Booking2 onSubmit={handleSubmit2}/>  
            </Col>
          </Row>
        </center>
      </div>
      <Footer />
    </div>
  );
}

export default Bookcourt;
