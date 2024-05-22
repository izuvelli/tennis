import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Hem from './Pages/Hem/Hem';
import Bookcourt from './Pages/Bookcourt/Bookcourt';
import Changingrm from './Pages/changingrm/changingrm';
import Aboutus from './Pages/Aboutus/Aboutus';


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
    path: '/Boka-Omk',
    element: <Changingrm/>,
  },
  {
    path: '/Boka-Bastu',
        element: <Changingrm/>,
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