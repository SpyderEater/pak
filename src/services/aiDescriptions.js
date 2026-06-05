import apiCall from './api'

function getRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length)

  return items[randomIndex]
}

export async function getRandomAiDescription() {
  const descriptions = await apiCall('/aiDescriptions')

  return getRandomItem(descriptions)
}
