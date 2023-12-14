import React from 'react';
import BookCourt from './components/Bookingform'; // Update the path based on your project structure
import Steg1 from './Pages/Steg1';

const App: React.FC = () => {
  return (
    <div>
      <h1>Your App</h1>
      <BookCourt />
      <Steg1 />
    </div>
  );
};

export default App;