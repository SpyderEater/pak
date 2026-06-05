import './Tabs.css'

export default function Tabs({ tabs, activeTabId, onTabChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Розділи профілю">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeTabId}
          className={`tabs__button ${tab.id === activeTabId ? 'tabs__button--active' : 'tabs__button--inactive'}`}
          onClick={() => onTabChange?.(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
