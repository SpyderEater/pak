import apiCall from './api'

function getCampaignStatus(targetAmount, gatheredAmount) {
  if (typeof targetAmount !== 'number') {
    return 'active'
  }

  return gatheredAmount >= targetAmount ? 'closed' : 'active'
}

function shuffle(array) {
  const items = [...array]

  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[items[index], items[randomIndex]] = [items[randomIndex], items[index]]
  }

  return items
}

function normalizeCampaign(campaign, organizationsMap) {
  return {
    id: campaign.id,
    title: campaign.title,
    category: campaign.tag,
    foundation: organizationsMap.get(campaign.organizationId) ?? 'Організація',
    status: getCampaignStatus(campaign.targetAmount, campaign.gatheredAmount),
    collected: campaign.gatheredAmount,
    goal: campaign.targetAmount,
    image: campaign.imageUrl,
  }
}

export async function getCampaigns() {
  const [campaigns, organizations] = await Promise.all([
    apiCall('/campaigns'),
    apiCall('/organizations'),
  ])

  const organizationsMap = new Map(
    organizations.map((organization) => [organization.id, organization.name]),
  )

  return campaigns.map((campaign) => normalizeCampaign(campaign, organizationsMap))
}

export async function getRandomCampaigns(limit = 3) {
  const campaigns = await getCampaigns()
  return shuffle(campaigns).slice(0, limit)
}
