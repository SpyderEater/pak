import apiCall from './api'

export async function getAllOrganizations() {
  try {
    const organizations = await apiCall('/organizations')
    return organizations
  } catch (error) {
    console.error('Failed to fetch organizations:', error)
    throw error
  }
}
