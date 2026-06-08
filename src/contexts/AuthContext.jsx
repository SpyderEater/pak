import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const USERS_API = 'http://localhost:3001/users'
const SESSION_KEY = 'paketdobra.currentUserId'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedId = localStorage.getItem(SESSION_KEY)
    return savedId ? { id: Number(savedId), _loading: true } : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = useCallback(async (id) => {
    const res = await fetch(`${USERS_API}/${id}`)
    if (!res.ok) throw new Error('Користувача не знайдено')
    return res.json()
  }, [])

  const login = useCallback(
    async (email, password) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${USERS_API}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        )
        const users = await res.json()
        if (!users || users.length === 0) {
          throw new Error('Невірний email або пароль')
        }
        const found = users[0]
        localStorage.setItem(SESSION_KEY, String(found.id))
        setUser(found)
        return found
      } catch (err) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const register = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const checkRes = await fetch(`${USERS_API}?email=${encodeURIComponent(data.email)}`)
      const existing = await checkRes.json()
      if (existing && existing.length > 0) {
        throw new Error('Цей email вже зареєстрований')
      }

      const newUser = {
        email: data.email,
        password: data.password,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        username: data.username || `@${data.email.split('@')[0]}`,
        avatarUrl: '',
        level: 1,
        levelProgress: 0,
        donationHistory: [],
        rewards: [
          { id: 'lvl-1', label: '1 lvl', unlocked: false, iconAlt: 'Нагорода 1 рівня' },
          { id: 'lvl-2', label: '2 lvl', unlocked: false, iconAlt: 'Нагорода 2 рівня' },
          { id: 'lvl-3', label: '3 lvl', unlocked: false, iconAlt: 'Нагорода 3 рівня' },
        ],
      }

      const res = await fetch(USERS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      const created = await res.json()
      localStorage.setItem(SESSION_KEY, String(created.id))
      setUser(created)
      return created
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateUser = useCallback(async (updates) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const updated = { ...user, ...updates }
      const res = await fetch(`${USERS_API}/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error('Помилка збереження')
      const saved = await res.json()
      setUser(saved)
      return saved
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [user])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout, updateUser, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthContext