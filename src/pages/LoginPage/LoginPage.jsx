import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '/src/contexts/AuthContext.jsx'
import './LoginPage.css'

export default function LoginPage() {
  const { login, register, error, loading } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  })
  const [localError, setLocalError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setLocalError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (!formData.email || !formData.password) {
      setLocalError('Заповніть всі поля')
      return
    }
    try {
      await login(formData.email, formData.password)
      navigate('/profile')
    } catch (err) {
      setLocalError(err.message)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLocalError('')
    if (!formData.email || !formData.password || !formData.firstName) {
      setLocalError('Заповніть всі обов\'язкові поля')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Паролі не співпадають')
      return
    }
    if (formData.password.length < 4) {
      setLocalError('Пароль має бути не менше 4 символів')
      return
    }
    try {
      await register(formData)
      navigate('/profile')
    } catch (err) {
      setLocalError(err.message)
    }
  }

  const displayError = localError || error

  return (
    <div className="login-page">
      <div className="login-page__card">
        <Link to="/" className="login-page__back">← На головну</Link>

        <div className="login-page__logo-row">
          <h1 className="login-page__title">
            {mode === 'login' ? 'Вхід в акаунт' : 'Реєстрація'}
          </h1>
          <p className="login-page__subtitle">
            {mode === 'login'
              ? 'Увійдіть щоб керувати профілем та оголошеннями'
              : 'Створіть акаунт щоб почати донатити та продавати'}
          </p>
        </div>

        {/* Tabs */}
        <div className="login-page__tabs">
          <button
            className={`login-page__tab ${mode === 'login' ? 'login-page__tab--active' : ''}`}
            onClick={() => { setMode('login'); setLocalError('') }}
            type="button"
          >
            Вхід
          </button>
          <button
            className={`login-page__tab ${mode === 'register' ? 'login-page__tab--active' : ''}`}
            onClick={() => { setMode('register'); setLocalError('') }}
            type="button"
          >
            Реєстрація
          </button>
        </div>

        {/* Error */}
        {displayError && (
          <div className="login-page__error">{displayError}</div>
        )}

        {mode === 'login' ? (
          <form className="login-page__form" onSubmit={handleLogin} noValidate>
            <div className="login-page__field">
              <label className="login-page__label">Email</label>
              <input
                className="login-page__input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="olly@example.com"
                autoComplete="email"
              />
            </div>
            <div className="login-page__field">
              <label className="login-page__label">Пароль</label>
              <input
                className="login-page__input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              className="login-page__submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Завантаження...' : 'Увійти'}
            </button>
            <p className="login-page__hint">
              Тестовий акаунт: <strong>olly@example.com</strong> / <strong>1234</strong>
            </p>
          </form>
        ) : (
          <form className="login-page__form" onSubmit={handleRegister} noValidate>
            <div className="login-page__field-row">
              <div className="login-page__field">
                <label className="login-page__label">Ім'я *</label>
                <input
                  className="login-page__input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Олександра"
                />
              </div>
              <div className="login-page__field">
                <label className="login-page__label">Прізвище</label>
                <input
                  className="login-page__input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Лисак"
                />
              </div>
            </div>
            <div className="login-page__field">
              <label className="login-page__label">Email *</label>
              <input
                className="login-page__input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
            <div className="login-page__field">
              <label className="login-page__label">Пароль *</label>
              <input
                className="login-page__input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Мінімум 4 символи"
                autoComplete="new-password"
              />
            </div>
            <div className="login-page__field">
              <label className="login-page__label">Повторіть пароль *</label>
              <input
                className="login-page__input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="new-password"
              />
            </div>
            <button
              className="login-page__submit"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Завантаження...' : 'Зареєструватись'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}