import React from 'react'
// import "../Payment/Payment.css";
// import {Payment} "../Payment/Payment";
import './CardPayment.css'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { getProducts } from '/src/services/products'

import gpay from '../Payment/img/gpay.svg'
import applepay from '../Payment/img/applepay.svg'
import visamaestro from '../Payment/img/visamaestro.svg'

const CardPayment = ({ onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(() => localStorage.getItem('selectedMethod'))

  const handleSelect = (method) => {
    setSelectedMethod(method)
    localStorage.setItem('selectedMethod', method)
  }

  const [adProducts, setAdProducts] = useState([])

  useEffect(() => {
    getProducts().then((all) => {
      const active = all.filter((p) => p.status === 'ACTIVE')
      const shuffled = active.sort(() => Math.random() - 0.5).slice(0, 2)
      setAdProducts(shuffled)
    })
  }, [])

  useEffect(() => {
    getProducts().then((all) => {
      console.log('all products:', all)
      const active = all.filter((p) => p.status === 'ACTIVE')
      console.log('active:', active)
      const shuffled = active.sort(() => Math.random() - 0.5).slice(0, 2)
      console.log('shuffled:', shuffled)
      setAdProducts(shuffled)
    })
  }, [])

  const navigate = useNavigate()

  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const handleCardNumber = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 16)
    setCardNumber(v.match(/.{1,4}/g)?.join(' ') || v)
  }

  const handleCardKeyDown = (e) => {
    if (e.key === 'Backspace' && cardNumber.endsWith(' ')) {
      e.preventDefault()
      setCardNumber((prev) => prev.slice(0, -2))
    }
  }

  const handleExpiry = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (!raw) {
      setExpiry('')
      return
    }
    let mm = raw.slice(0, 2)
    if (parseInt(mm[0]) > 1) mm = '0' + mm[0]
    if (mm.length === 2 && parseInt(mm) > 12) mm = '12'
    setExpiry(raw.length > 2 ? mm + '/' + raw.slice(2) : mm)
  }

  const handleExpiryKeyDown = (e) => {
    if (e.key === 'Backspace' && expiry.endsWith('/')) {
      e.preventDefault()
      setExpiry((prev) => prev.slice(0, -1))
    }
  }

  const isFormValid =
    cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length === 3

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
          <h1 className="page-title">Оплата товару</h1>

          <div className="payment-content">
            {/* LEFT SIDE */}
            <div className="payment-left">
              <div className="payment-method-card">
                <h3>Спосіб оплати</h3>
                <p>Оберіть спосіб оплати</p>

                <div className="methods-grid">
                  <div className={`method-item ${selectedMethod === 'gpay' ? 'selected' : ''}`}>
                    <img src={gpay} />
                  </div>
                  <div className={`method-item ${selectedMethod === 'applepay' ? 'selected' : ''}`}>
                    <img src={applepay} />
                  </div>
                  <div
                    className={`method-item ${selectedMethod === 'visamaestro' ? 'selected' : ''}`}
                  >
                    <img src={visamaestro} />
                  </div>
                </div>
              </div>

              <div className="card-form">
                <h3>Інформація про платіжну картку</h3>
                <p>Заповніть поля нижче, щоб завершити операцію</p>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9101 1121"
                    value={cardNumber}
                    onChange={handleCardNumber}
                    onKeyDown={handleCardKeyDown}
                    maxLength={19}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiry}
                      onKeyDown={handleExpiryKeyDown}
                      maxLength={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="checkbox">
                  <input type="checkbox" id="save" />
                  <label htmlFor="save">Save card details</label>
                </div>
              </div>

              <div className="payment-footer">
                <button className="btn-cancel" onClick={() => navigate('/payment')}>
                  Скасувати
                </button>
                <button
                  className="btn-pay"
                  disabled={!isFormValid}
                  onClick={() => navigate('/success')}
                >
                  Оплатити
                </button>
              </div>
            </div>

            {/* RIGHT SIDE */}
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

export default CardPayment
