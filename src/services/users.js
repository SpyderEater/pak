import apiCall from './api'
import { getCurrentUserId } from './session'

/**
 * Fetch a single user by ID.
 * @param {number|string} userId
 * @returns {Promise<object|null>}
 */
export async function getUserById(userId) {
  if (userId == null) {
    throw new Error('getUserById: userId is required')
  }

  return apiCall(`/users/${userId}`)
}

/**
 * Fetch the current user using the persisted session user id.
 * @returns {Promise<object|null>}
 */
export async function getCurrentUserProfile() {
  return getUserById(getCurrentUserId())
}

export default {
  getUserById,
  getCurrentUserProfile,
}
