import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './Profile.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.jsx'
import SidebarWrapper from './components/SidebarWrapper/SidebarWrapper.jsx'
import ListingsFeed from './components/ListingsFeed/ListingsFeed.jsx'
import ProfileEditModal from './components/ProfileEditModal/Profileeditmodal.jsx'

import AddPlusIcon from './images/add_plus_icon.svg?react'
import BinIcon from './images/bin_icon.svg?react'
import LeaveIcon from './images/leave_icon.svg?react'
import MessagesIcon from './images/messages_icon.svg?react'
import SettingsIcon from './images/settings_icon.svg?react'
import SupportIcon from './images/support_icon.svg?react'

import defaultAvatar from './images/default_avatar.svg'
import ArrowRightIcon from '../../assets/images/arrow_right.svg?react'

import { useAuth } from '/src/contexts/AuthContext.jsx'
import { getProfileData } from './services/profile'
import { deleteProduct } from '../../services/products'

const PROFILE_TABS = [
  { id: 'announcements', label: 'Оголошення' },
  { id: 'drafts', label: 'Чернетки' },
  { id: 'orders', label: 'Замовлення' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTabId, setActiveTabId] = useState(PROFILE_TABS[0].id)
  const [showEditModal, setShowEditModal] = useState(false)

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

  // Якщо не залогінений — редирект на логін
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login')
    }
  }, [user, isLoading, navigate])

  // Оновлюємо userIdentity коли змінився user (після редагування)
  useEffect(() => {
    if (!user) return
    setUserIdentity((prev) => ({
      ...prev,
      avatarSrc: user.avatarUrl || defaultAvatar,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Користувач',
      username: user.username || '',
    }))
  }, [user])

  useEffect(() => {
    let mounted = true
    const userId = user?.id
    if (!userId) return

    ;(async () => {
      if (mounted) {
        setIsLoading(true)
        setError(null)
      }
      try {
        const profileData = await getProfileData(userId)
        if (!mounted || !profileData) return

        setUserIdentity({
          avatarSrc: user.avatarUrl || profileData.userIdentity.avatarSrc || defaultAvatar,
          avatarAlt: profileData.userIdentity.avatarAlt,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || profileData.userIdentity.name,
          username: user.username || profileData.userIdentity.username,
          levelLabel: profileData.userIdentity.levelLabel,
          levelProgress: user.levelProgress ?? profileData.userIdentity.levelProgress,
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

        const localOrders = JSON.parse(localStorage.getItem('orders') || '[]')

        setListingsByTab({
          ...profileData.listingsByTab,
          drafts: profileData.listingsByTab.drafts ?? [],
          orders: [
            ...localOrders.map((order) => ({
              id: order.id,
              title: `Замовлення від ${order.date}`,
              subtitle: order.items.map((i) => i.name).join(', '),
              priceText: `${order.total} грн`,
              primaryActionLabel: 'Відслідкувати',
              imagePlaceholder: true,
            })),
            ...(profileData.listingsByTab.orders ?? []),
          ],
        })
      } catch (err) {
        if (mounted) setError(err)
      } finally {
        if (mounted) setIsLoading(false)
      }
    })()

    return () => (mounted = false)
  }, [user?.id])

  const handleMenuAction = (id) => {
    if (id === 'logout') {
      logout()
      navigate('/')
    } else if (id === 'settings') {
      setShowEditModal(true)
    }
  }

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

  const breadcrumbItems = [
    { label: 'Головна', to: '/' },
    { label: 'Профіль', current: true },
  ]

  const bannerLeftContent = <Breadcrumbs variant="inline" items={breadcrumbItems} />
  const bannerRightContent = (
    <h1 className="profile-banner-title">Донать, досягай нового рівня, отримуй нагороди!</h1>
  )

  const draftsWithHandlers = (listingsByTab.drafts ?? []).map((card) => ({
    ...card,
    onPrimaryAction: () => navigate(`/edit-announcement/${String(card.id).replace('prod-', '')}`),
    onDeleteAction: async () => {
      try {
        const numericId = String(card.id).replace('prod-', '')
        await deleteProduct(numericId)
        setListingsByTab((prev) => ({
          ...prev,
          drafts: prev.drafts.filter((d) => d.id !== card.id),
        }))
      } catch (err) {
        console.error('Failed to delete draft', err)
      }
    },
  }))

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
            onMenuAction={handleMenuAction}
            onEditProfile={() => setShowEditModal(true)}
          />
        </div>

        <div className="profile-page__listings-column">
          <ListingsFeed
            tabs={PROFILE_TABS}
            activeTabId={activeTabId}
            onTabChange={setActiveTabId}
            addListingLabel="Додати оголошення"
            addListingIcon={<AddPlusIcon />}
            cards={
              activeTabId === 'drafts'
                ? draftsWithHandlers
                : (listingsByTab[activeTabId] ?? [])
            }
            messageIcon={<MessagesIcon />}
            deleteIcon={<BinIcon />}
          />
        </div>
      </main>

      {showEditModal && (
        <ProfileEditModal onClose={() => setShowEditModal(false)} />
      )}
    </div>
  )
}