import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClientContextProvider } from './context/ClientContext.jsx';
import reportWebVitals from './reportWebVitals.js';

// Styles
import './styles/index.css';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CreateProductPage from './pages/CreateProductPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProductListPage />
      },
      {
        path: '/landing',
        element: <LandingPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />
      },
      {
        path: '/newproduct',
        element: <CreateProductPage />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClientContextProvider>
      <RouterProvider router={router} />
    </ClientContextProvider>
  </React.StrictMode>
);

reportWebVitals();