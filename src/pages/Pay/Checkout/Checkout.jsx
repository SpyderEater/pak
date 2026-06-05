


import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import './Checkout.css'
import { useCart } from '/src/contexts/CartContext'
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

const getAddressMode = (deliveryId) => {
  if (!deliveryId) return null
  if (deliveryId === 'nova_branch') return 'nova_branch'
  if (deliveryId === 'nova_courier') return 'nova_courier'
  if (deliveryId === 'ukrposhta') return 'ukrposhta'
  return null
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
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)

  const cityRef = useRef(null)
  const branchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setShowCityDropdown(false)
      }
      if (branchRef.current && !branchRef.current.contains(e.target)) {
        setShowBranchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    email: '',
    city: '',
    branch: '',
    street: '',
    house: '',
    apartment: '',
    postcode: '',
  })

  const [touched, setTouched] = useState({})

  const handleDeliverySelect = (id) => {
    setSelectedDelivery(id)
    setSelectedCity(null)
    setShowCityDropdown(false)
    setShowBranchDropdown(false)
    setForm((prev) => ({
      ...prev,
      city: '',
      branch: '',
      street: '',
      house: '',
      apartment: '',
      postcode: '',
    }))
    setTouched((prev) => ({
      ...prev,
      city: false,
      branch: false,
      street: false,
      house: false,
      apartment: false,
      postcode: false,
    }))
  }

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
    setShowCityDropdown(true)
    clearTimeout(window._npTimer)
    window._npTimer = setTimeout(() => searchCities(val), 400)
  }

  const handleCitySelect = (city) => {
    setForm((prev) => ({ ...prev, city: city.Present, branch: '' }))
    setSelectedCity(city)
    setShowCityDropdown(false)
    if (selectedDelivery === 'nova_branch') {
      fetchBranches(city.DeliveryCity)
    }
  }

  const handleBranchSelect = (branch) => {
    setForm((prev) => ({ ...prev, branch: branch.Description }))
    setTouched((prev) => ({ ...prev, branch: true }))
    setShowBranchDropdown(false)
  }

  const addressMode = getAddressMode(selectedDelivery)

  const errors = {
    firstName: !form.firstName.trim() ? 'Введіть імʼя' : '',
    lastName: !form.lastName.trim() ? 'Введіть прізвище' : '',
    phone: !PHONE_REGEX.test(form.phone) ? 'Невірний номер телефону' : '',
    email: !EMAIL_REGEX.test(form.email) ? 'Невірний email' : '',
    city: !form.city ? 'Оберіть місто' : '',
    ...(addressMode === 'nova_branch' && {
      branch: !form.branch ? 'Оберіть відділення' : '',
    }),
    ...(addressMode === 'nova_courier' && {
      street: !form.street.trim() ? 'Введіть вулицю' : '',
      house: !form.house.trim() ? 'Введіть номер будинку' : '',
    }),
    ...(addressMode === 'ukrposhta' && {
      postcode: !form.postcode.trim() ? 'Введіть поштовий індекс' : '',
    }),
  }

  const formValid = Object.values(errors).every((e) => e === '')
  const isValid = selectedDelivery !== null && formValid

  const getInputClass = (name) => {
    if (!touched[name]) return ''
    return errors[name] ? 'input-error' : 'input-success'
  }

  return (
    <div className="page-wrapper">
      <button className="back-to-home-btn" onClick={() => navigate('/')}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Повернутись
      </button>

      <div className="checkout-container">
        <h1 className="page-title">Оформлення замовлення</h1>

        <div className="checkout-content">
          <div className="checkout-left">

            {/* ДОСТАВКА */}
            <div className="section-card">
              <h3 className="section-title">Служба доставки</h3>
              <p className="section-subtitle">Оберіть спосіб отримання замовлення</p>

              {DELIVERY_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className={`delivery-option ${selectedDelivery === option.id ? 'delivery-option--selected' : ''}`}
                  onClick={() => handleDeliverySelect(option.id)}
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

            {/* КОНТАКТНІ ДАНІ */}
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
                <label className="field-label">
                  По-батькові <span className="field-optional">(необов'язково)</span>
                </label>
                <input
                  name="patronymic"
                  placeholder="Степанович"
                  value={form.patronymic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="form-group">
                <label className="field-label">Номер телефону</label>
                <div className={`phone-wrapper ${getInputClass('phone')}`}>
                  <div className="phone-prefix">
                    <span className="country-code">UKR</span>
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

              {/* МІСТО */}
              {addressMode && (
                <div className="form-group" ref={cityRef}>
                  <label className="field-label">Місто</label>
                  <input
                    name="city"
                    placeholder="Введіть місто..."
                    value={form.city}
                    onChange={handleCitySearch}
                    onFocus={() => cities.length > 0 && !selectedCity && setShowCityDropdown(true)}
                    onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                    className={getInputClass('city')}
                    autoComplete="off"
                  />
                  {loadingCities && <span className="field-hint">Пошук...</span>}
                  {showCityDropdown && cities.length > 0 && !selectedCity && (
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
              )}

              {/* ВІДДІЛЕННЯ — кастомний список як у міст */}
              {addressMode === 'nova_branch' && (
                <div className="form-group" ref={branchRef}>
                  <label className="field-label">Відділення</label>
                  <input
                    name="branch"
                    placeholder={loadingBranches ? 'Завантаження...' : 'Оберіть відділення'}
                    value={form.branch}
                    readOnly
                    onClick={() => selectedCity && !loadingBranches && setShowBranchDropdown((v) => !v)}
                    onBlur={() => setTouched((prev) => ({ ...prev, branch: true }))}
                    className={`${getInputClass('branch')} ${!selectedCity ? 'input-disabled' : ''}`}
                    style={{ cursor: selectedCity && !loadingBranches ? 'pointer' : 'not-allowed' }}
                    autoComplete="off"
                  />
                  {showBranchDropdown && branches.length > 0 && (
                    <div className="autocomplete-list">
                      {branches.map((b) => (
                        <div
                          key={b.Ref}
                          className="autocomplete-item"
                          onMouseDown={() => handleBranchSelect(b)}
                        >
                          {b.Description}
                        </div>
                      ))}
                    </div>
                  )}
                  {touched.branch && errors.branch && (
                    <span className="field-error">{errors.branch}</span>
                  )}
                </div>
              )}

              {/* ВУЛИЦЯ + БУДИНОК + КВАРТИРА — тільки для кур'єра */}
              {addressMode === 'nova_courier' && (
                <>
                  <div className="form-group">
                    <label className="field-label">Вулиця</label>
                    <input
                      name="street"
                      placeholder="вул. Шевченка"
                      value={form.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClass('street')}
                    />
                    {touched.street && errors.street && (
                      <span className="field-error">{errors.street}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="field-label">Будинок</label>
                      <input
                        name="house"
                        placeholder="12А"
                        value={form.house}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClass('house')}
                      />
                      {touched.house && errors.house && (
                        <span className="field-error">{errors.house}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="field-label">
                        Квартира <span className="field-optional">(необов'язково)</span>
                      </label>
                      <input
                        name="apartment"
                        placeholder="34"
                        value={form.apartment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ПОШТОВИЙ ІНДЕКС — тільки для укрпошти */}
              {addressMode === 'ukrposhta' && (
                <div className="form-group">
                  <label className="field-label">Поштовий індекс</label>
                  <input
                    name="postcode"
                    placeholder="79000"
                    value={form.postcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClass('postcode')}
                    maxLength={5}
                  />
                  {touched.postcode && errors.postcode && (
                    <span className="field-error">{errors.postcode}</span>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="checkout-footer">
              <button className="btn-cancel" onClick={() => navigate('/catalog')}>
                Скасувати
              </button>
              <button
                className="btn-pay"
                disabled={!isValid}
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
  )
}

export default Checkout