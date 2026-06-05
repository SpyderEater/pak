import apiCall from './api'

/**
 * Fetch products belonging to a specific seller.
 * @param {number|string} sellerId
 * @returns {Promise<object[]>}
 */
export async function getProductsBySellerId(sellerId) {
  if (sellerId == null) {
    throw new Error('getProductsBySellerId: sellerId is required')
  }

  return apiCall(`/products?sellerId=${sellerId}`)
}

/**
 * Fetch a single product by ID.
 * @param {number|string} productId
 * @returns {Promise<object|null>}
 */
export async function getProductById(productId) {
  if (productId == null) {
    throw new Error('getProductById: productId is required')
  }

  return apiCall(`/products/${productId}`)
}

/**
 * Fetch products belonging to a specific category.
 * @param {string} category
 * @returns {Promise<object[]>}
 */
export async function getProductsByCategory(category) {
  if (!category) {
    throw new Error('getProductsByCategory: category is required')
  }
  return apiCall(`/products?category=${category}`)
}

export async function saveDraft(product) {
  if (!product) throw new Error('saveDraft: product required')

  const payload = { ...product, status: product.status ?? 'DRAFT' }

  if (product.id) {
    return apiCall(`/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  return apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function saveProduct(product) {
  if (!product) throw new Error('saveProduct: product required')

  const payload = { ...product }

  if (product.id) {
    return apiCall(`/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  return apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function deleteProduct(productId) {
  if (!productId) throw new Error('deleteProduct: productId required')
  return apiCall(`/products/${productId}`, { method: 'DELETE' })
}

/**
 * Fetch all products (useful for home page featured lists).
 * @returns {Promise<object[]>}
 */
export async function getAllProducts() {
  // If you are using json-server, you can even do "/products?_limit=4" to only fetch 4!
  return apiCall('/products')
}

export async function getProducts() {
  return apiCall('/products')
}

export default {
  getProducts,
  getProductsBySellerId,
  getProductById,
  getProductsByCategory,
  getAllProducts,

  saveDraft,
  saveProduct,
  deleteProduct,
}
