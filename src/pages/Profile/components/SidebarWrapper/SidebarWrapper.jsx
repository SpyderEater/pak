import UserIdentity from '../UserIdentity/UserIdentity.jsx'
import SidebarMessage from '../SidebarMessage/SidebarMessage.jsx'
import ImpactStats from '../ImpactStats/ImpactStats.jsx'
import Rewards from '../SidebarRewards/SidebarRewards.jsx'
import SidebarMenu from '../SidebarMenu/SidebarMenu.jsx'
import './SidebarWrapper.css'

export default function SidebarWrapper({
  className = '',
  userIdentity,
  impactStats,
  rewards,
  menuLinks,
}) {
  const rootClassName = className ? `sidebar-wrapper ${className}` : 'sidebar-wrapper'

  return (
    <aside className={rootClassName}>
      <div className="sidebar-wrapper__section sidebar-wrapper__section--identity">
        <UserIdentity
          avatarSrc={userIdentity?.avatarSrc}
          avatarAlt={userIdentity?.avatarAlt}
          name={userIdentity?.name}
          username={userIdentity?.username}
          levelLabel={userIdentity?.levelLabel}
          levelProgress={userIdentity?.levelProgress}
        />
      </div>

      <div className="sidebar-wrapper__section sidebar-wrapper__section--message">
        <SidebarMessage label={userIdentity.messageLabel} icon={userIdentity.messageIcon} />
      </div>

      <div className="sidebar-wrapper__section sidebar-wrapper__section--stats">
        <ImpactStats {...impactStats} />
      </div>

      <div className="sidebar-wrapper__section sidebar-wrapper__section--rewards">
        <Rewards
          title={rewards?.title ?? ''}
          levels={rewards?.levels ?? []}
          arrowIcon={rewards?.arrowIcon ?? null}
        />
      </div>

      <div className="sidebar-wrapper__section sidebar-wrapper__section--menu">
        <SidebarMenu menuLinks={menuLinks} />
      </div>
    </aside>
  )
}
