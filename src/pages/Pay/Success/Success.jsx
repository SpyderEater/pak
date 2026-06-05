import React from 'react'
import './Success.css'

import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

const Success = () => {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const navigate = useNavigate()

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
        На головну
      </button>

      <div className="success-page-container">
        <div className="grid-mosaic-container">
          <div className="tile tile-lime" style={{ gridColumn: 3, gridRow: 1 }}></div>
          <div className="tile tile-khaki" style={{ gridColumn: 7, gridRow: 1 }}></div>

          {/* Ряд 2 */}
          <div className="tile tile-lime" style={{ gridColumn: 2, gridRow: 2 }}></div>
          <div className="tile tile-lime-dark" style={{ gridColumn: 3, gridRow: 2 }}></div>
          <div className="tile tile-lime" style={{ gridColumn: 4, gridRow: 2 }}></div>
          <div className="tile tile-lime" style={{ gridColumn: 6, gridRow: 2 }}></div>
          <div className="tile tile-khaki" style={{ gridColumn: 7, gridRow: 2 }}></div>
          <div className="tile tile-khaki" style={{ gridColumn: 8, gridRow: 2 }}></div>

          {/* Ряд 3 */}
          <div className="tile tile-lime-light" style={{ gridColumn: 1, gridRow: 3 }}></div>
          <div className="tile tile-lime-light" style={{ gridColumn: 2, gridRow: 3 }}></div>
          <div className="tile tile-khaki" style={{ gridColumn: 8, gridRow: 3 }}></div>
          <div className="tile tile-gray" style={{ gridColumn: 9, gridRow: 3 }}></div>

          {/* Ряд 4 */}
          <div className="tile tile-lime-light" style={{ gridColumn: 2, gridRow: 4 }}></div>
          <div className="tile tile-gray" style={{ gridColumn: 8, gridRow: 4 }}></div>

          {/* Ряд 5 */}
          <div className="tile tile-gray" style={{ gridColumn: 4, gridRow: 6 }}></div>
          <div className="tile tile-gray" style={{ gridColumn: 5, gridRow: 6 }}></div>
          <div className="tile tile-gray" style={{ gridColumn: 6, gridRow: 6 }}></div>

          {/* Ряд 6 */}
          <div className="tile tile-gray" style={{ gridColumn: 5, gridRow: 7 }}></div>

          <div className="success-card">
            <h1 className="success-title">Оплата пройшла успішно!</h1>

            <p className="success-message">
              Ми щиро вдячні вам за підтримку. Кожна гривня важлива та сприяє змінам!
            </p>

            <div className="email-form-container">
              <p className="email-label">
                Введіть пошту, якщо бажаєте отримати звіт з цієї покупки
              </p>

              <div className="email-section">
                <div className="input-wrapper">
                  <input type="email" placeholder="✉ Email address" className="email-input" />
                  <svg
                    className="chevron-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <button className="email-button">Отримати</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Success
