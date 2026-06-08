import { Navigate } from 'react-router'
import { useAuth } from '/src/contexts/AuthContext.jsx'

/**
 * If not - redirect to /login
 * If user logined — show children
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>Завантаження...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}