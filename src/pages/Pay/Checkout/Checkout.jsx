import React from 'react'
import { useNavigate } from 'react-router'
import './Checkout.css'
import { useCart } from '/src/contexts/CartContext'
import { useState, useEffect } from 'react'
import { getProducts } from '/src/services/products'

import novaposhta from './img/novaposhta.svg'
import ukrposhta from './img/ukrposhta.svg'

import { useNovaPoshtaAPI } from './useNovaPoshtaAPI'

const DELIVERY_OPTIONS = [
  {
    id: 'ukrposhta',
    name: 'Укрпошта',
    price: 'Безкоштовно',
    days: 'Доставка протягом 2-5 днів',
    icon: ukrposhta,
  },
  {
    id: 'nova_branch',
    name: 'Відділення Нова пошта',
    price: 'Від 60 грн',
    days: 'Доставка протягом 1-3 днів',
    icon: novaposhta,
  },
  {
    id: 'nova_courier',
    name: 'Курʼєр Нова пошта',
    price: 'Від 95 грн',
    days: 'Доставка протягом 1-3 днів',
    icon: novaposhta,
  },
]

const PHONE_REGEX = /^\+380 \d{2} \d{3} \d{2} \d{2}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formatPhone = (raw) => {
  const digits = raw.replace(/\D/g, '')

  const normalized = digits.startsWith('380') ? digits : '380' + digits.replace(/^0/, '')

  const d = normalized.slice(3)

  let result = '+380'
  if (d.length > 0) result += ' ' + d.slice(0, 2)
  if (d.length > 2) result += ' ' + d.slice(2, 5)
  if (d.length > 5) result += ' ' + d.slice(5, 7)
  if (d.length > 7) result += ' ' + d.slice(7, 9)

  return result
}

const Checkout = ({ onNext, onBack }) => {
  const [adProducts, setAdProducts] = useState([])

  useEffect(() => {
    getProducts().then((all) => {
      const active = all.filter((p) => p.status === 'ACTIVE')
      const shuffled = active.sort(() => Math.random() - 0.5).slice(0, 2)
      setAdProducts(shuffled)
    })
  }, [])

  const { items } = useCart()

  const navigate = useNavigate()

  const { cities, branches, loadingCities, loadingBranches, searchCities, fetchBranches } =
    useNovaPoshtaAPI()
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedDelivery, setSelectedDelivery] = useState(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    email: '',
    // region: "",
    city: '',
    branch: '',
  })

  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value,
    }))
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleCitySearch = (e) => {
    const val = e.target.value
    setForm((prev) => ({ ...prev, city: val, branch: '' }))
    setSelectedCity(null)
    clearTimeout(window._npTimer)
    window._npTimer = setTimeout(() => searchCities(val), 400)
  }

  const handleCitySelect = (city) => {
    setForm((prev) => ({ ...prev, city: city.Present, branch: '' }))
    setSelectedCity(city)
    fetchBranches(city.DeliveryCity)
  }

  const handleBranchSelect = (e) => {
    setForm((prev) => ({ ...prev, branch: e.target.value }))
    setTouched((prev) => ({ ...prev, branch: true }))
  }

  const errors = {
    firstName: !form.firstName.trim() ? 'Введіть імʼя' : '',
    lastName: !form.lastName.trim() ? 'Введіть прізвище' : '',
    patronymic: !form.patronymic.trim() ? 'Введіть по-батькові' : '',
    phone: !PHONE_REGEX.test(form.phone) ? 'Невірний номер телефону' : '',
    email: !EMAIL_REGEX.test(form.email) ? 'Невірний email' : '',
    // region: !form.region ? "Оберіть область" : "",
    city: !form.city ? 'Оберіть місто' : '',
    branch: !form.branch ? 'Оберіть відділення' : '',
  }

  const formValid = Object.values(errors).every((e) => e === '')
  const isValid = selectedDelivery !== null && formValid

  const getInputClass = (name) => {
    if (!touched[name]) return ''
    return errors[name] ? 'input-error' : 'input-success'
  }

  return (
    <>
      <div className="page-wrapper">
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
        <div className="checkout-container">
          <h1 className="page-title">Оформлення замовлення</h1>

          <div className="checkout-content">
            {/* LEFT */}
            <div className="checkout-left">
              {/* DELIVERY */}
              <div className="section-card">
                <h3 className="section-title">Служба доставки</h3>
                <p className="section-subtitle">Оберіть спосіб отримання замовлення</p>

                {DELIVERY_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={`delivery-option ${selectedDelivery === option.id ? 'delivery-option--selected' : ''}`}
                    onClick={() => setSelectedDelivery(option.id)}
                  >
                    <div className="radio-circle">
                      {selectedDelivery === option.id && <div className="radio-dot" />}
                    </div>
                    <img src={option.icon} alt={option.name} className="delivery-icon" />
                    <div className="delivery-info">
                      <p className="delivery-name">{option.name}</p>
                      <p className="delivery-days">{option.days}</p>
                    </div>
                    <span className="delivery-price">{option.price}</span>
                  </div>
                ))}
              </div>

              {/* CONTACT FORM */}
              <div className="section-card">
                <h3 className="section-title">Контактні дані</h3>
                <p className="section-subtitle">Заповніть контактні дані отримувача</p>

                <div className="form-group">
                  <label className="field-label">Вкажіть імʼя</label>
                  <input
                    name="firstName"
                    placeholder="Василь"
                    value={form.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('firstName')}
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="field-error">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="field-label">Вкажіть прізвище</label>
                  <input
                    name="lastName"
                    placeholder="Симоненко"
                    value={form.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('lastName')}
                  />
                  {touched.lastName && errors.lastName && (
                    <span className="field-error">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="field-label">Вкажіть по-батькові</label>
                  <input
                    name="patronymic"
                    placeholder="Степанович"
                    value={form.patronymic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('patronymic')}
                  />
                  {touched.patronymic && errors.patronymic && (
                    <span className="field-error">{errors.patronymic}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="field-label">Номер телефону</label>
                  <div className={`phone-wrapper ${getInputClass('phone')}`}>
                    <div className="phone-prefix">
                      {/*<span className="flag">🇺🇦</span>*/}
                      <span className="country-code">UKR</span>
                      <span className="prefix-chevron">∨</span>
                    </div>
                    <input
                      name="phone"
                      placeholder="+380 97 978 9876"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="phone-input"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="field-label">Вкажіть пошту</label>
                  <div className={`email-wrapper ${getInputClass('email')}`}>
                    <span className="email-icon">✉</span>
                    <input
                      name="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="email-input"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                {/* МІСТО  */}
                <div className="form-group">
                  <label className="field-label">Місто</label>
                  <input
                    name="city"
                    placeholder="Введіть місто..."
                    value={form.city}
                    onChange={handleCitySearch}
                    onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                    className={getInputClass('city')}
                    autoComplete="off"
                  />
                  {loadingCities && <span className="field-hint">Пошук...</span>}
                  {cities.length > 0 && !selectedCity && (
                    <div className="autocomplete-list">
                      {cities.map((c) => (
                        <div
                          key={c.Ref}
                          className="autocomplete-item"
                          onMouseDown={() => handleCitySelect(c)}
                        >
                          {c.Present}
                        </div>
                      ))}
                    </div>
                  )}
                  {touched.city && errors.city && (
                    <span className="field-error">{errors.city}</span>
                  )}
                </div>

                {/* ВІДДІЛЕННЯ */}
                <div className="form-group">
                  <label className="field-label">Відділення</label>
                  <div
                    className={`select-wrapper ${getInputClass('branch')} ${!selectedCity ? 'select-disabled' : ''}`}
                  >
                    <select
                      name="branch"
                      value={form.branch}
                      onChange={handleBranchSelect}
                      onBlur={() => setTouched((prev) => ({ ...prev, branch: true }))}
                      disabled={!selectedCity}
                    >
                      <option value="">
                        {loadingBranches ? 'Завантаження...' : 'Оберіть відділення'}
                      </option>
                      {branches.map((b) => (
                        <option key={b.Ref} value={b.Description}>
                          {b.Description}
                        </option>
                      ))}
                    </select>
                    <span className="select-chevron">∨</span>
                  </div>
                  {touched.branch && errors.branch && (
                    <span className="field-error">{errors.branch}</span>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="checkout-footer">
                <button className="btn-cancel" onClick={() => navigate('/catalog')}>
                  Скасувати
                </button>
                <button
                  className="btn-pay"
                  disabled={!selectedDelivery || !formValid}
                  onClick={() => navigate('/payment')}
                >
                  Оплатити
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="checkout-right">
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

export default Checkout
