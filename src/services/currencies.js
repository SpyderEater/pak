import apiCall from './api'

export async function getAllCurrencies() {
  try {
    return await apiCall('/currencies')
  } catch (error) {
    console.error('Failed to fetch currencies:', error)
    throw error
  }
}

export default {
  getAllCurrencies,
}
