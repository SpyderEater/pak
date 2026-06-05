import { createBrowserRouter } from 'react-router'
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import DonationsPage from './pages/DonationsPage/DonationsPage.jsx'
import AnnouncementSuccess from './pages/CreateAnnouncementPage/AnnouncementSuccess.jsx'
import CreateAnnouncementPage from './pages/CreateAnnouncementPage/CreateAnnouncementPage.jsx'
import CatalogOverview from '/src/pages/Catalog/components/CatalogOverview/CatalogOverview.jsx'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'
import ProductPage from '/src/pages/Catalog/components/ProductPage/ProductPage.jsx'

import CardPayment from './pages/Pay/Card/CardPayment.jsx'
import Checkout from './pages/Pay/Checkout/Checkout.jsx'
import Payment from './pages/Pay/Payment/Payment.jsx'
import Success from './pages/Pay/Success/Success.jsx'

// const validCategories = [
//   "home",
//   "health-beauty",
//   "clothes",
//   "kids",
//   "pets",
//   "hobbies",
//   "art-craft",
//   "services",
//   "books",
//   "electronics",
// ];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'donations',
            element: <DonationsPage />,
          },
          {
            path: 'create-announcement',
            element: <CreateAnnouncementPage />,
          },
          {
            path: 'announcement-success',
            element: <AnnouncementSuccess />,
          },
          {
            path: 'catalog',
            // element: <CatalogOverview />,
            children: [
              {
                index: true,
                element: (
                  <CatalogOverview
                    variant="catalog"
                    fillerHoverColor="var(--color-catalog-page-background, #edf0d6)"
                  />
                ),
              },
              {
                path: ':category',
                element: <Catalog />,
              },

              {
                path: ':category/:id',
                element: <ProductPage />,
              },
            ],
          },
          {
            path: 'statistics',
            element: <StatisticsPage />,
          },
          {
            path: 'card',
            element: <CardPayment />,
          },
          {
            path: 'payment',
            element: <Payment />,
          },
          {
            path: 'success',
            element: <Success />,
          },
          {
            path: 'checkout',
            element: <Checkout />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
])
