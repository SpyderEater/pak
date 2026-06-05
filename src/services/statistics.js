import apiCall from './api'

export async function getGlobalStats() {
  try {
    return await apiCall('/globalStats')
  } catch (error) {
    return null
  }
}
