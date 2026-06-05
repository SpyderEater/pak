import './DonationPercent.css'

export default function DonationPercent({ percentNumber, suffix = '%', className = '' }) {
  const componentClassName = ['DonatoinPercent-container', className].filter(Boolean).join(' ')

  return (
    <div className={componentClassName}>
      {percentNumber}
      {suffix}
    </div>
  )
}
