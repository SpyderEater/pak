import { Link } from 'react-router'
import './AddListingButton.css'

export default function AddListingButton({ label, icon, to = '/create-announcement' }) {
  return (
    <Link className="add-listing-button" to={to}>
      {icon ? (
        <span className="add-listing-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="add-listing-button__label">{label}</span>
    </Link>
  )
}
