const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Generic API call handler
 * @param {string} endpoint - API endpoint path (e.g., '/products', '/users/1')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - Parsed JSON response
 * @throws {Error} - On API errors
 */
export async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export default apiCall
