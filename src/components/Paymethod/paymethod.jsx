import React from 'react'
import './paymethod.css'

const Paymethod = () => {
  return (
    <div className="payment-container">
      <h2 className="payment-title">Спосіб оплати</h2>
      <p className="payment-subtitle">Оберіть спосіб оплати</p>

      <div className="payment-options">
        <div className="option active">
          <input type="radio" checked readOnly />
          <span className="option-name">VISA</span>
          <div className="mastercard-logo">
            <div className="red-circle"></div>
            <div className="blue-circle"></div>
          </div>
        </div>

        <div className="option">
          <input type="radio" readOnly />
          <span className="option-name">G Pay</span>
        </div>

        <div className="option">
          <input type="radio" readOnly />
          <span className="option-name">Apple Pay</span>
        </div>
      </div>
    </div>
  )
}

export default Paymethod // Це найголовніший рядок!
