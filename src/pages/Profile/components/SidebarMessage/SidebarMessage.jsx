import './SidebarMessage.css'

export default function SidebarMessage({ label, icon }) {
  return (
    <div className="sidebar-message">
      <button type="button" className="sidebar-message__button">
        {icon ? (
          <span className="sidebar-message__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="sidebar-message__label">{label}</span>
      </button>
    </div>
  )
}
