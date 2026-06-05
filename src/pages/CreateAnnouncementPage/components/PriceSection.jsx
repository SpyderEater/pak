import { useEffect, useState } from 'react'
import SectionCard from './SectionCard.jsx'
import chevronDown from '../../../assets/images/chevron-down.svg'
import { getAllCurrencies } from '../../../services/currencies'
import './PriceSection.css'

const donationValues = [15, 25, 50, 75, 100]
const conditionValues = ['Нове', 'Вживане', 'Відновлене']

export default function PriceSection({
  price,
  currency,
  donationPercent,
  condition,
  onPriceChange,
  onCurrencyChange,
  onDonationPercentChange,
  onConditionChange,
}) {
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    let cancelled = false

    async function loadCurrencies() {
      try {
        const data = await getAllCurrencies()
        if (!cancelled) {
          setCurrencies(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to load currencies:', error)
      }
    }

    loadCurrencies()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SectionCard
      title="Дайте ціну товару"
      className="price-section"
      titleClassName="price-section__title"
      bodyClassName="price-section__body"
    >
      <div className="price-section__stack">
        <div className="price-section__group">
          <label className="price-section__label" htmlFor="price-input">
            Вкажіть мінімальну ціну
          </label>
          <div className="price-section__price-row">
            <input
              id="price-input"
              className="price-section__price-input"
              value={price}
              type="number"
              min="1"
              step="1"
              onChange={(event) => onPriceChange(event.target.value)}
              placeholder="Вкажіть суму"
            />
            <span className="price-section__currency">
              <select
                className={`price-section__currency-select ${currency ? 'price-section__currency-select--selected' : ''}`}
                value={currency}
                onChange={(event) => onCurrencyChange(event.target.value)}
              >
                <option value="">Оберіть</option>
                {currencies.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              <img
                src={chevronDown}
                alt=""
                aria-hidden="true"
                className="price-section__currency-icon"
              />
            </span>
          </div>
        </div>

        <div className="price-section__group">
          <label className="price-section__label">Вкажіть відсоток донату</label>
          <div className="price-section__chips">
            {donationValues.map((value) => (
              <button
                key={value}
                type="button"
                className={
                  donationPercent != null && donationPercent === value
                    ? 'price-section__chip price-section__chip--active'
                    : 'price-section__chip'
                }
                onClick={() => onDonationPercentChange(value)}
              >
                {value}%
              </button>
            ))}
          </div>
        </div>

        <div className="price-section__group">
          <label className="price-section__label">Вкажіть стан</label>
          <div className="price-section__chips price-section__chips--condition">
            {conditionValues.map((value) => (
              <button
                key={value}
                type="button"
                className={
                  condition && condition === value
                    ? 'price-section__chip price-section__chip--active'
                    : 'price-section__chip'
                }
                onClick={() => onConditionChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
