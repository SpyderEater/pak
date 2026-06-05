import apiCall from './api'

const STORAGE_KEY = 'paketdobra.currentUserId'
const DEFAULT_USER_ID = 1

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getStoredUserId() {
  if (!isBrowser()) return DEFAULT_USER_ID
  const v = localStorage.getItem(STORAGE_KEY)
  return v ? Number(v) : DEFAULT_USER_ID
}

export function getCurrentUserId() {
  return getStoredUserId()
}

export async function fetchCurrentUser() {
  const id = getCurrentUserId()
  return apiCall(`/users/${id}`)
}

export default {
  getCurrentUserId,
  fetchCurrentUser,
}
