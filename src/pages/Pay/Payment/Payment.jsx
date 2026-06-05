import React from 'react'
import './Payment.css'

import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { getProducts } from '/src/services/products'

import gpay from './img/gpay.svg'
import applepay from './img/applepay.svg'
import visamaestro from './img/visamaestro.svg'

const Payment = () => {
  const [adProducts, setAdProducts] = useState([])

  useEffect(() => {
    getProducts().then((all) => {
      const active = all.filter((p) => p.status === 'ACTIVE')
      // беремо 2 випадкових
      const shuffled = active.sort(() => Math.random() - 0.5).slice(0, 2)
      setAdProducts(shuffled)
    })
  }, [])

  const [selectedMethod, setSelectedMethod] = useState(null)
  const navigate = useNavigate()

  const handleSelect = (method) => {
    setSelectedMethod(method)
    localStorage.setItem('selectedMethod', method)
  }

  return (
    <>
      <button className="back-to-home-btn" onClick={() => navigate('/')}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Повернутись
      </button>
      <div className="page-wrapper">
        <div className="payment-container">
          {/* <div className="back-link" onClick={onBack}>&lt; Повернутись</div> */}

          <h1 className="page-title">Оплата товару</h1>

          <div className="payment-content">
            <div className="payment-left">
              <div className="payment-method-card">
                <h3>Спосіб оплати</h3>
                <p>Оберіть спосіб оплати</p>

                <div className="methods-grid">
                  <div
                    className={`method-item ${selectedMethod === 'gpay' ? 'selected' : ''}`}
                    onClick={() => handleSelect('gpay')}
                  >
                    <img src={gpay} />
                  </div>
                  <div
                    className={`method-item ${selectedMethod === 'applepay' ? 'selected' : ''}`}
                    onClick={() => handleSelect('applepay')}
                  >
                    <img src={applepay} />
                  </div>
                  <div
                    className={`method-item ${selectedMethod === 'visamaestro' ? 'selected' : ''}`}
                    onClick={() => handleSelect('visamaestro')}
                  >
                    <img src={visamaestro} />
                  </div>
                </div>
              </div>

              <div className="payment-footer">
                <button className="btn-cancel" onClick={() => navigate('/checkout')}>
                  Скасувати
                </button>
                <button
                  className="btn-pay"
                  disabled={!selectedMethod}
                  onClick={() => navigate('/card')}
                >
                  Оплатити
                </button>
              </div>
            </div>

            <div className="payment-right">
              {adProducts.map((product) => (
                <div key={product.id} className="product-summary-card">
                  <span className="badge">{product.donationPercentage}% донату</span>
                  <h4 className="h4">{product.title}</h4>
                  <p className="price">{product.price} грн</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
