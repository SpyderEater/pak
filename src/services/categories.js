import apiCall from './api'

export async function getAllCategories() {
  try {
    const categories = await apiCall('/categories')
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    throw error
  }
}
