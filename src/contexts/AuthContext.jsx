import { createContext, useContext } from 'react'

// Minimal AuthContext: do not fetch user globally. Profile page will load
// the detailed user when needed. This keeps the app from requesting user
// data unless the profile is opened.

const AuthContext = createContext({ user: null, loading: false })

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ user: null, loading: false }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
