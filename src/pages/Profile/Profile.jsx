import { useState, useEffect } from 'react'
import './Profile.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.jsx'
import SidebarWrapper from './components/SidebarWrapper/SidebarWrapper.jsx'
import ListingsFeed from './components/ListingsFeed/ListingsFeed.jsx'

import AddPlusIcon from './images/add_plus_icon.svg?react'
import BinIcon from './images/bin_icon.svg?react'
import LeaveIcon from './images/leave_icon.svg?react'
import MessagesIcon from './images/messages_icon.svg?react'
import SettingsIcon from './images/settings_icon.svg?react'
import SupportIcon from './images/support_icon.svg?react'

import defaultAvatar from './images/default_avatar.svg'
import ArrowRightIcon from '../../assets/images/arrow_right.svg?react'

import { getCurrentUserId } from '/src/services/session'
import { getProfileData } from './services/profile'

const PROFILE_TABS = [
  { id: 'announcements', label: 'Оголошення' },
  { id: 'drafts', label: 'Чернетки' },
  { id: 'orders', label: 'Замовлення' },
]

const MENU_LINKS = [
  { id: 'support', label: 'Підтримка', icon: <SupportIcon />, iconAlt: 'Підтримка' },
  {
    id: 'settings',
    label: 'Налаштування',
    icon: <SettingsIcon />,
    iconAlt: 'Налаштування',
  },
  { id: 'logout', label: 'Вийти', icon: <LeaveIcon />, iconAlt: 'Вийти' },
]

export default function Profile() {
  const [activeTabId, setActiveTabId] = useState(PROFILE_TABS[0].id)

  const [userIdentity, setUserIdentity] = useState({
    avatarSrc: defaultAvatar,
    avatarAlt: 'Користувач',
    name: 'Завантаження...',
    username: '',
    levelLabel: '',
    messageLabel: 'Повідомлення',
    messageIcon: <MessagesIcon />,
    levelProgress: 0,
  })

  const [impactStats, setImpactStats] = useState({
    title: 'Ваша допомога:',
    value: '0 грн',
    arrowIcon: <ArrowRightIcon />,
    dataPoints: [],
  })

  const [rewards, setRewards] = useState(null)
  const [listingsByTab, setListingsByTab] = useState({
    announcements: [],
    drafts: [],
    orders: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (mounted) {
        setIsLoading(true)
        setError(null)
      }

      try {
        const userId = getCurrentUserId()
        const profileData = await getProfileData(userId)
        if (!mounted || !profileData) return

        setUserIdentity({
          avatarSrc: profileData.userIdentity.avatarSrc,
          avatarAlt: profileData.userIdentity.avatarAlt,
          name: profileData.userIdentity.name,
          username: profileData.userIdentity.username,
          levelLabel: profileData.userIdentity.levelLabel,
          levelProgress: profileData.userIdentity.levelProgress,
          messageLabel: 'Повідомлення',
          messageIcon: <MessagesIcon />,
        })

        setImpactStats({
          title: profileData.impactStats.title,
          value: profileData.impactStats.value,
          dataPoints: profileData.impactStats.dataPoints,
          arrowIcon: <ArrowRightIcon />,
        })

        setRewards(
          profileData.rewards ? { ...profileData.rewards, arrowIcon: <ArrowRightIcon /> } : null,
        )
        setListingsByTab(profileData.listingsByTab)
      } catch (err) {
        if (mounted) {
          setError(err)
        }
        console.error('Failed to load profile data', err)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    })()
    return () => (mounted = false)
  }, [])

  const breadcrumbItems = [
    { label: 'Головна', to: '/' },
    { label: 'Профіль', current: true },
  ]

  const bannerLeftContent = <Breadcrumbs variant="inline" items={breadcrumbItems} />

  const bannerRightContent = (
    <h1 className="profile-banner-title">Донать, досягай нового рівня, отримуй нагороди!</h1>
  )

  return (
    <div
      className="profile-page"
      data-loading={isLoading ? 'true' : 'false'}
      data-has-error={error ? 'true' : 'false'}
    >
      <div className="profile-page__hero">
        <HeroBanner
          variant="solid"
          leftContent={bannerLeftContent}
          rightContent={bannerRightContent}
        />
      </div>

      <main className="profile-page__container profile-page__layout">
        <div className="profile-page__sidebar-column">
          <SidebarWrapper
            className="profile-page__sidebar-card"
            userIdentity={userIdentity}
            impactStats={impactStats}
            rewards={rewards}
            menuLinks={MENU_LINKS}
          />
        </div>

        <div className="profile-page__listings-column">
          <ListingsFeed
            tabs={PROFILE_TABS}
            activeTabId={activeTabId}
            onTabChange={setActiveTabId}
            addListingLabel="Додати оголошення"
            addListingIcon={<AddPlusIcon />}
            cards={listingsByTab[activeTabId] ?? []}
            messageIcon={<MessagesIcon />}
            deleteIcon={<BinIcon />}
          />
        </div>
      </main>
    </div>
  )
}
