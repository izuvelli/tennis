import React from 'react';

const contactInfo = {
  name: 'Världens Bästa Tennisklubb',
  address: '123 Tennis gatan, Anytown, Sverige',
  phone: '079 9990 999',
  email: 'info@världensbästa-tclub.se',
  Öppettider: '12:00 - 20:00',
};

const Footer: React.FC = () => {
  return (
    <>
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          background: '#f0f2f5',
          padding: '1rem',
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        <style>
          {`
            footer div {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 10%;
            }
            
            @media screen and (min-width: 500px) {
              footer div {
                flex-direction: row;
                justify-content: center;
                
                
              }
              footer div p {
                margin: 0 1rem;
              }
            }
          `}
        </style>

        <div>
          <p>{contactInfo.address}</p>
          <p>Telefon: {contactInfo.phone}</p>
          <p>Email: {contactInfo.email}</p>
          <p>Öppettider: {contactInfo.Öppettider}</p>
        </div>
      </footer>

      <style>
        {`
          .content-wrapper {
            padding-bottom: 5rem; /* Adjust based on footer height */
          }
        `}
      </style>
    </>
  );
};

export default Footer;
