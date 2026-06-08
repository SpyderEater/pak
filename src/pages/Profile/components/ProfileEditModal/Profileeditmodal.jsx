import { useState, useRef } from 'react'
import { useAuth } from '/src/contexts/AuthContext.jsx'
import './ProfileEditModal.css'

export default function ProfileEditModal({ onClose }) {
  const { user, updateUser, loading } = useAuth()
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    avatarUrl: user?.avatarUrl || '',
  })
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
    setSuccess(false)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Фото занадто велике (макс. 2MB)')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target.result
      setAvatarPreview(base64)
      setForm((prev) => ({ ...prev, avatarUrl: base64 }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.firstName.trim()) {
      setError('Ім\'я обов\'язкове')
      return
    }
    try {
      await updateUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        avatarUrl: form.avatarUrl,
      })
      setSuccess(true)
      setTimeout(() => onClose(), 900)
    } catch (err) {
      setError(err.message || 'Помилка збереження')
    }
  }

  const initials =
    ((form.firstName?.[0] || '') + (form.lastName?.[0] || '')).toUpperCase() || '?'

  return (
    <div className="pedit-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pedit-modal">
        <button className="pedit-close" onClick={onClose} type="button" aria-label="Закрити">
          ✕
        </button>

        <h2 className="pedit-title">Редагування профілю</h2>

        <form className="pedit-form" onSubmit={handleSubmit} noValidate>
          {/* Avatar */}
          <div className="pedit-avatar-section">
            <div
              className="pedit-avatar"
              onClick={() => fileInputRef.current?.click()}
              title="Змінити фото"
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Аватар" className="pedit-avatar__img" />
              ) : (
                <span className="pedit-avatar__initials">{initials}</span>
              )}
              <div className="pedit-avatar__overlay">
                <span>Змінити</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="pedit-avatar__input"
              onChange={handleAvatarChange}
            />
            <p className="pedit-avatar__hint">Клікніть на фото щоб змінити (макс. 2MB)</p>
          </div>

          {/* Fields */}
          <div className="pedit-field-row">
            <div className="pedit-field">
              <label className="pedit-label">Ім'я *</label>
              <input
                className="pedit-input"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Олександра"
              />
            </div>
            <div className="pedit-field">
              <label className="pedit-label">Прізвище</label>
              <input
                className="pedit-input"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Лисак"
              />
            </div>
          </div>

          <div className="pedit-field">
            <label className="pedit-label">Нікнейм</label>
            <input
              className="pedit-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="@username"
            />
          </div>

          <div className="pedit-field">
            <label className="pedit-label">Email</label>
            <input
              className="pedit-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>

          {error && <div className="pedit-error">{error}</div>}
          {success && <div className="pedit-success">Збережено!</div>}

          <div className="pedit-actions">
            <button
              type="button"
              className="pedit-btn pedit-btn--cancel"
              onClick={onClose}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="pedit-btn pedit-btn--save"
              disabled={loading}
            >
              {loading ? 'Збереження...' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}