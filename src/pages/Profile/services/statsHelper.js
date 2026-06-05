export function formatMonth(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  let monthStr = new Intl.DateTimeFormat('uk-UA', { month: 'short' }).format(date)
  monthStr = monthStr.replace('.', '')
  return monthStr.charAt(0).toUpperCase() + monthStr.slice(1)
}

export function extractRecentDonationAmounts(donationHistory, monthsCount = 4) {
  const history = Array.isArray(donationHistory) ? donationHistory : []
  const resultAmounts = []
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  for (let i = monthsCount; i > 0; i--) {
    const targetDate = new Date(currentYear, currentMonth - i, 1)
    const targetYear = targetDate.getFullYear()
    const targetMonth = targetDate.getMonth()

    const foundDonation = history.find((entry) => {
      if (!entry.date) return false
      const entryDate = new Date(entry.date)
      return entryDate.getFullYear() === targetYear && entryDate.getMonth() === targetMonth
    })

    resultAmounts.push(foundDonation ? foundDonation.amount : 0)
  }

  return resultAmounts
}
