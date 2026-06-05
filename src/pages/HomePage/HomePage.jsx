import { useEffect, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import HomeHeroSection from '../../components/HomeHeroSection/HomeHeroSection.jsx'
import ImpactStatsSection from '../../components/ImpactStatsSection/ImpactStatsSection.jsx'
import CampaignCard from '../../components/CampaignCard/CampaignCard.jsx'
import MoreButton from '../../components/MoreButton/MoreButton.jsx'
import LogoIcon from '../../assets/images/logo.svg?react'
import { Link } from 'react-router'
import { getRandomCampaigns } from '../../services/campaigns.js'
import './HomePage.css'

import CatalogOverview from '../Catalog/components/CatalogOverview/CatalogOverview.jsx'

// Import your brand new component
import FeaturedProductsSection from '/src/components/FeaturedProductsSection/FeaturedProductsSection.jsx'

const fallbackSupportCampaigns = [
  {
    id: 1,
    title: "Рій помсти 24/7: б'ємо ворога вдень та вночі",
    category: 'Технічне забезпечення',
    foundation: 'Фонд "Сергія Притули"',
    collected: 7568879,
    goal: 8000000,
    image:
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Зброєносці',
    category: 'Технічне забезпечення',
    foundation: 'Фонд "Повернись живим"',
    collected: 7568879,
    goal: 7568879,
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { handleCartOpen } = useOutletContext()
  const [supportSlide, setSupportSlide] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [supportCampaigns, setSupportCampaigns] = useState(fallbackSupportCampaigns)
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
  })

  useEffect(() => {
    let isMounted = true

    const loadSupportCampaigns = async () => {
      try {
        const campaigns = await getRandomCampaigns(2)

        if (!isMounted || campaigns.length === 0) return

        setSupportCampaigns(campaigns)
      } catch (error) {
        console.error('Failed to load support campaigns:', error)
      }
    }

    loadSupportCampaigns()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSupportPointerDown = (event) => {
    if (event.button !== 0) return

    event.preventDefault()

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
    }
  }

  const handleSupportPointerMove = (event) => {
    const dragState = dragStateRef.current

    if (!dragState.isDragging) return

    event.preventDefault()
    setDragOffset(event.clientX - dragState.startX)
  }

  const stopSupportDragging = () => {
    if (!dragStateRef.current.isDragging) return

    if (dragOffset <= -80) {
      setSupportSlide(1)
    } else if (dragOffset >= 80) {
      setSupportSlide(0)
    }

    dragStateRef.current.isDragging = false
    setDragOffset(0)
  }

  const handleSupportWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return
    }

    event.preventDefault()
    const delta = event.deltaX
    setSupportSlide((currentSlide) => {
      if (delta > 0) return 1
      if (delta < 0) return 0
      return currentSlide
    })
  }
  return (
    <main className="home-page">
      <HomeHeroSection onCartOpen={handleCartOpen} />
      <CatalogOverview
        variant="home"
        fillerHoverColor="var(--color-home-page-background, #eaebe6)"
      />
      <ImpactStatsSection detailsHref="/statistics" />

      <FeaturedProductsSection title="Товари для тебе" isLink={true} />

      <section className="home-page__support">
        <div className="home-page__support-inner">
          <div className="home-page__support-viewport">
            <div
              className="home-page__support-track"
              style={{
                transform: `translateX(calc((-1 * ${supportSlide}) * (var(--support-card-width) + var(--support-gap)) + ${dragOffset}px))`,
              }}
              role="list"
              aria-label="Актуальні збори"
              onPointerDown={handleSupportPointerDown}
              onPointerMove={handleSupportPointerMove}
              onPointerUp={stopSupportDragging}
              onPointerLeave={stopSupportDragging}
              onPointerCancel={stopSupportDragging}
              onWheel={handleSupportWheel}
              onDragStart={(event) => event.preventDefault()}
            >
              <article
                className="home-page__support-card home-page__support-card--intro"
                role="listitem"
              >
                <div className="home-page__support-intro-top">
                  <h2 className="home-page__support-title">
                    <span>Потрібна ваша</span>
                    <span>допомога, щоб</span>
                    <span>завершити збори!</span>
                  </h2>
                </div>
                <div className="home-page__support-intro-bottom">
                  <p className="home-page__support-text">
                    <span>Обирай збір, який тобі найшвидше</span>
                    <span>хочеться закрити, обирай речі</span>
                    <span>та донать чим побільше!</span>
                  </p>
                </div>
              </article>

              {supportCampaigns.map((campaign) => (
                <div className="home-page__support-card" role="listitem" key={campaign.id}>
                  <CampaignCard {...campaign} />
                </div>
              ))}

              <article
                className="home-page__support-card home-page__support-card--cta"
                role="listitem"
              >
                <div className="home-page__support-card-content">
                  <h2 className="home-page__support-title home-page__support-title--cta">
                    <span>Не знайшли той,</span>
                    <span>який хотілося б?</span>
                  </h2>
                  <p className="home-page__support-text home-page__support-text--cta">
                    <span>Ви можете переглянути всі</span>
                    <span>актуальні збори, перейшовши</span>
                    <span>на іншу сторінку.</span>
                  </p>
                  <p className="home-page__support-text home-page__support-text--cta">
                    <span>Не засмучуйтесь, там точно</span>
                    <span>зможете обрати!</span>
                  </p>
                </div>

                <MoreButton
                  className="home-page__support-btn"
                  onClick={() => navigate('/donations')}
                >
                  Переглянути інші
                </MoreButton>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
