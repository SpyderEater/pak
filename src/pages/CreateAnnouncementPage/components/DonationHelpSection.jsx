import { useEffect, useState } from 'react'
import SectionCard from './SectionCard.jsx'
import alertCircleIcon from '../../../assets/images/alert-circle.svg'
import './DonationHelpSection.css'
import { getAllOrganizations } from '../../../services/organizations'

export default function DonationHelpSection({
  donateToFund,
  onDonateToFundChange,
  selectedOrganization,
  onOrganizationChange,
}) {
  const [organizations, setOrganizations] = useState([])
  const [checkboxLoading, setCheckboxLoading] = useState(false)

  useEffect(() => {
    if (!donateToFund) return undefined

    let cancelled = false

    async function loadOrgs() {
      try {
        const data = await getAllOrganizations()
        if (!cancelled) setOrganizations(data || [])
      } catch (err) {
        console.error('Failed to load organizations:', err)
      }
    }

    loadOrgs()

    return () => {
      cancelled = true
    }
  }, [donateToFund])

  async function handleCheckboxToggle(nextChecked) {
    // show a short loading animation before applying the change
    setCheckboxLoading(true)

    // simulate a small async action (e.g., saving preference)
    setTimeout(() => {
      onDonateToFundChange(nextChecked)
      setCheckboxLoading(false)
    }, 300)
  }

  return (
    <SectionCard title="" className="donation-help" bodyClassName="donation-help__body">
      <div className="donation-help__title-row">
        <h3 className="donation-help__heading">Спрямуйте допомогу</h3>
        <img src={alertCircleIcon} alt="" aria-hidden="true" className="donation-help__icon" />
      </div>

      <div className="donation-help__stack">
        <p className="donation-help__hint">Чи бажаєте обрати фонд для донату?</p>
        <label className="donation-help__checkbox-row">
          <input
            type="checkbox"
            checked={donateToFund}
            onChange={(event) => handleCheckboxToggle(event.target.checked)}
            className="donation-help__checkbox-input"
            disabled={checkboxLoading}
          />
          <span
            className={`donation-help__checkbox-custom ${checkboxLoading ? 'is-loading' : ''}`}
            aria-hidden="true"
          />
          <span className="donation-help__checkbox-label">Так, бажаю</span>
        </label>

        {donateToFund && (
          <div className="basic-data-section__group basic-data-section__group--category donation-help__select-row">
            <label className="basic-data-section__label" htmlFor="donation-organization">
              Оберіть куди ви хочете спрямувати кошти:
            </label>
            <select
              id="donation-organization"
              className="basic-data-section__input basic-data-section__select donation-help__select"
              value={selectedOrganization ?? ''}
              onChange={(e) => onOrganizationChange && onOrganizationChange(Number(e.target.value))}
            >
              <option value="">Благодійні організації</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
