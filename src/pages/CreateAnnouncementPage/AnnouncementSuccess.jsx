import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getProductById, saveProduct } from '../../services/products'
import './AnnouncementSuccess.css'

const AnnouncementSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const announcementId = location.state?.announcementId ?? null

  async function handleReceiveReport() {
    try {
      setIsSubmitting(true)

      if (announcementId && email.trim()) {
        const product = await getProductById(announcementId)

        if (product) {
          await saveProduct({
            ...product,
            reportEmail: email.trim(),
          })
        }
      }

      navigate('/profile')
    } catch (error) {
      console.error('Failed to save announcement email', error)
      navigate('/profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="success-page-container">
      <button className="back-to-home-btn" type="button" onClick={() => navigate('/')}>
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

      <div className="grid-mosaic-container">
        <div className="tile tile-lime" style={{ gridColumn: 3, gridRow: 1 }} />
        <div className="tile tile-khaki" style={{ gridColumn: 7, gridRow: 1 }} />

        <div className="tile tile-lime" style={{ gridColumn: 2, gridRow: 2 }} />
        <div className="tile tile-lime-dark" style={{ gridColumn: 3, gridRow: 2 }} />
        <div className="tile tile-lime" style={{ gridColumn: 4, gridRow: 2 }} />
        <div className="tile tile-lime" style={{ gridColumn: 6, gridRow: 2 }} />
        <div className="tile tile-khaki" style={{ gridColumn: 7, gridRow: 2 }} />
        <div className="tile tile-khaki" style={{ gridColumn: 8, gridRow: 2 }} />

        <div className="tile tile-lime-light" style={{ gridColumn: 1, gridRow: 3 }} />
        <div className="tile tile-lime-light" style={{ gridColumn: 2, gridRow: 3 }} />
        <div className="tile tile-khaki" style={{ gridColumn: 8, gridRow: 3 }} />
        <div className="tile tile-gray" style={{ gridColumn: 9, gridRow: 3 }} />

        <div className="tile tile-lime-light" style={{ gridColumn: 2, gridRow: 4 }} />
        <div className="tile tile-gray" style={{ gridColumn: 8, gridRow: 4 }} />

        <div className="tile tile-gray" style={{ gridColumn: 4, gridRow: 6 }} />
        <div className="tile tile-gray" style={{ gridColumn: 5, gridRow: 6 }} />
        <div className="tile tile-gray" style={{ gridColumn: 6, gridRow: 6 }} />

        <div className="tile tile-gray" style={{ gridColumn: 5, gridRow: 7 }} />

        <div className="success-card">
          <h1 className="success-title">Дякуємо! Оголошення опубліковано</h1>

          <p className="success-message">
            Ми щиро вдячні вам за підтримку. Кожна ваша річ важлива та сприяє змінам!
          </p>

          <div className="email-form-container">
            <p className="email-label">
              Введіть пошту, якщо бажаєте отримати звіт щодо цього оголошення
            </p>

            <div className="email-section">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="✉ Email address"
                  className="email-input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
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
              <button
                className="email-button"
                type="button"
                onClick={handleReceiveReport}
                disabled={isSubmitting}
              >
                Отримати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementSuccess
