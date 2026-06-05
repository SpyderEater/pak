import HomePage from './pages/HomePage/HomePage.jsx'
import DonationsPage from './pages/DonationsPage/DonationsPage.jsx'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage.jsx'
import CreateAnnouncementPage from './pages/CreateAnnouncementPage/CreateAnnouncementPage.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Header from './components/Header/Header.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import CatalogOverview from './pages/Catalog/components/CatalogOverview/CatalogOverview.jsx'

import { Outlet, ScrollRestoration } from 'react-router'
import { useState } from 'react'
import Cart from '/src/components/Cart/Cart.jsx'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartPos, setCartPos] = useState({ top: 0, right: 0 })

  const handleCartOpen = () => {
    const btn = document.querySelector('[aria-label="Кошик"]')
    if (btn) {
      const rect = btn.getBoundingClientRect()
      setCartPos({
        top: rect.bottom + 10,
        right: window.innerWidth - rect.right,
      })
    }
    setCartOpen((v) => !v)
  }

  return (
    <>
      <Header topInfoText="" onCartOpen={handleCartOpen} />
      <ScrollRestoration />
      <div className="app-content">
        <Outlet context={{ handleCartOpen }} />
      </div>
      <Footer></Footer>
      {cartOpen && (
        <Cart
          onClose={() => setCartOpen(false)}
          anchorStyle={{
            position: 'fixed',
            top: cartPos.top,
            right: cartPos.right,
          }}
        />
      )}
    </>
  )
}

export default App
