import './SidebarMenu.css'

export default function SidebarMenu({ menuLinks, onMenuAction }) {
  return (
    <div className="sidebar-menu">
      {menuLinks.map((link) => (
        <button
          key={link.id}
          type="button"
          className="sidebar-menu__item"
          onClick={() => onMenuAction?.(link.id)}
        >
          {link.icon ? (
            <span className="sidebar-menu__icon" aria-hidden="true">
              {link.icon}
            </span>
          ) : null}
          <span className="sidebar-menu__label">{link.label}</span>
        </button>
      ))}
    </div>
  )
}