import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Hem from './Pages/Hem/Hem';
import Bookcourt from './Pages/Bookcourt/Bookcourt';
import Confirmation from './Pages/confirmation/confirmation';
import Aboutus from './Pages/Aboutus/Aboutus';
import Booksauna from './Pages/Booksauna/Booksauna';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Hem />,
    // errorElement: <NotFoundPage />,
  },

  {
    path: '/Boka-Hall',
    element: <Bookcourt />,
  },
  {
    path: '/Confirmation',
    element: <Confirmation/>,
  },
  {
    path: '/Boka-Bastu',
        element: <Booksauna/>,
  },
  {
    path:"/Om-Oss",
    element: <Aboutus/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);