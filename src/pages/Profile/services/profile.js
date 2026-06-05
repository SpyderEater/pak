import { getUserById } from '/src/services/users'
import { getProductsBySellerId, getProductById } from '/src/services/products'
import { getOrdersByBuyerId } from '/src/services/orders'
import { extractRecentDonationAmounts } from './statsHelper'
import defaultRewardIcon from '../images/default_reward.svg'
import defaultAvatar from '../images/default_avatar.svg'

const ACTIVE_STATUS = 'ACTIVE'
const DRAFT_STATUS = 'DRAFT'
const SOLD_STATUS = 'SOLD'

function mapUserIdentity(user) {
  return {
    avatarSrc: user.avatarUrl || defaultAvatar,
    avatarAlt: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Користувач',
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'Користувач',
    username: user.username || '',
    levelLabel: user.level ? `${user.level} рівень` : '',
    levelProgress: user.levelProgress || 0,
  }
}

function mapRewards(userRewards) {
  if (!Array.isArray(userRewards) || !userRewards.length) {
    return null
  }

  const levels = userRewards
    .filter((reward) => reward && typeof reward === 'object')
    .map((reward) => ({
      id: reward.id,
      label: reward.label,
      unlocked: !!reward.unlocked,
      iconSrc: reward.iconSrc || defaultRewardIcon,
      iconAlt: reward.iconAlt || reward.label || '',
    }))

  if (!levels.length) {
    return null
  }

  return {
    title: 'Нагороди:',
    levels,
  }
}

function mapProductsToListingsByTab(products) {
  const listings = {
    announcements: [],
    drafts: [],
    orders: [],
  }

  for (const product of products) {
    const firstImage = Array.isArray(product.images) ? product.images[0] : null
    const baseCard = {
      id: `prod-${product.id}`,
      imageSrc: firstImage || null,
      imagePlaceholder: !firstImage,
      imageAlt: product.title || 'Продукт',
      title: product.title || '',
      subtitle:
        product.status === DRAFT_STATUS
          ? null
          : product.status === SOLD_STATUS
            ? 'Статус: продано'
            : 'Статус: продається',
      priceText: product.price ? `від ${product.price} ${product.currency || 'грн'}` : '0 грн',
      showMessageAction: product.status !== DRAFT_STATUS,
      showDeleteAction: true,
      primaryActionLabel: 'Редагувати',
      muted: product.status === SOLD_STATUS,
      imageMuted: product.status === SOLD_STATUS,
      actionsDisabled: false,
    }

    if (product.status === DRAFT_STATUS) {
      listings.drafts.push(baseCard)
      continue
    }

    if (product.status === ACTIVE_STATUS || product.status === SOLD_STATUS) {
      listings.announcements.push(baseCard)
    }
  }

  listings.announcements.sort((a, b) => {
    if (a.muted === b.muted) return 0
    return a.muted ? 1 : -1
  })

  return listings
}

async function mapOrdersToListings(orders = []) {
  const listings = []

  for (const order of orders) {
    if (!order || !Array.isArray(order.items)) continue

    const productPromises = order.items.map((itemId) => getProductById(itemId).catch(() => null))

    const products = await Promise.all(productPromises)

    for (let i = 0; i < order.items.length; i++) {
      const itemId = order.items[i]
      const product = products[i] || null

      const firstImage = product && Array.isArray(product.images) ? product.images[0] : null

      listings.push({
        id: `order-${order.id}-item-${itemId}`,
        imageSrc: firstImage || null,
        imagePlaceholder: !firstImage,
        imageAlt: (product && (product.title || product.name)) || `Товар #${itemId}`,
        title: (product && (product.title || product.name)) || `Товар #${itemId}`,
        subtitle: null,
        priceText:
          product && product.price
            ? `${product.price} ${product.currency || 'грн'}`
            : `${order.totalAmount} грн`,
        showMessageAction: false,
        showDeleteAction: false,
        primaryActionLabel: 'Відслідкувати',
        muted: false,
        imageMuted: false,
        actionsDisabled: false,
      })
    }
  }

  return listings
}

function mapImpactStats(user) {
  const totalSum = Array.isArray(user.donationHistory)
    ? user.donationHistory.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0

  return {
    title: 'Ваша допомога:',
    value: `${totalSum} грн`,
    dataPoints: extractRecentDonationAmounts(user.donationHistory, 4),
  }
}

export async function getProfileData(userId) {
  if (userId == null) {
    throw new Error('getProfileData: userId is required')
  }

  const [user, products, orders] = await Promise.all([
    getUserById(userId),
    getProductsBySellerId(userId),
    getOrdersByBuyerId(userId),
  ])

  if (!user) {
    throw new Error(`User not found for id=${userId}`)
  }

  return {
    userIdentity: mapUserIdentity(user),
    impactStats: mapImpactStats(user),
    rewards: mapRewards(user.rewards),
    listingsByTab: {
      ...mapProductsToListingsByTab(Array.isArray(products) ? products : []),
      orders: await mapOrdersToListings(Array.isArray(orders) ? orders : []),
    },
  }
}

export default {
  getProfileData,
}
