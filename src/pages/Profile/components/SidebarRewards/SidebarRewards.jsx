import './SidebarRewards.css'
import defaultRewardIcon from '../../images/default_reward.svg'

export default function SidebarRewards({ title, levels, arrowIcon }) {
  return (
    <div className="sidebar-rewards">
      <button type="button" className="sidebar-rewards__header">
        <h3 className="sidebar-rewards__title">{title}</h3>
        {arrowIcon ? (
          <span className="sidebar-rewards__arrow" aria-hidden="true">
            {arrowIcon}
          </span>
        ) : null}
      </button>

      <div className="sidebar-rewards__levels">
        {levels.map((level) => (
          <div key={level.id} className="sidebar-rewards__level">
            <div
              className={`sidebar-rewards__badge ${level.unlocked ? 'sidebar-rewards__badge--unlocked' : 'sidebar-rewards__badge--locked'}`}
            >
              <img
                src={level.iconSrc}
                alt={level.iconAlt}
                className="sidebar-rewards__badge-icon"
                onError={(e) => {
                  console.warn(
                    'SidebarRewards: reward icon failed to load, using default:',
                    e.currentTarget.src,
                  )
                  e.currentTarget.src = defaultRewardIcon
                }}
              />
            </div>

            <span className="sidebar-rewards__label">{level.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
