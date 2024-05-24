import React from 'react';
import './confirmation.css';
import Navbar from '../../components/navbar';

import Comp from './comp.tsx';

const Confirmation: React.FC = () => {
  return (
    <div className="confirmation">
      <Navbar />
      <div className='main'>
        <center>
        <Comp/>
        
          
        </center>
      </div>
    </div>
  );
}

export default Confirmation;
