import React from 'react';
import Booking1 from './components/Booking1';
import Booking2 from './components/Booking2';
import { Outlet } from 'react-router';

const App: React.FC = () => {
  return (
    <div>
      <h1>Världens Bästa Tennis Klubb</h1>
      <Outlet/>
      <center><Booking1 /></center>
      <center><Booking2 /></center>
    </div>
  );
};

export default App;