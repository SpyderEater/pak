import { useEffect, useState } from 'react'
import MoreButton from '../MoreButton/MoreButton.jsx'
import PixelHeart from '../PixelHeart/PixelHeart.jsx'
import { useNavigate } from 'react-router'
import { getRandomCampaigns } from '../../services/campaigns.js'
import './HomeHeroSection.css'

const fallbackCampaignCards = [
  {
    id: 'winter',
    title: 'Зимовий збір на такмед',
    collected: 7658879,
    goal: 7658879,
  },
  {
    id: 'radio',
    title: "Почуй своїх: збір на радіозв'язок",
    collected: 7658879,
    goal: 7658879,
  },
  {
    id: 'revenge',
    title: "Рій помсти 24/7: б'ємо ворога вдень та вночі",
    collected: 7100879,
    goal: 7658879,
  },
]

const heroCardClasses = [
  'home-hero__card home-hero__card--top',
  'home-hero__card home-hero__card--middle',
  'home-hero__card home-hero__card--bottom',
]

function splitTitleIntoLines(title) {
  const words = title.trim().split(/\s+/)

  if (words.length <= 2) {
    return [title]
  }

  const totalLength = words.join(' ').length
  const lineCount = totalLength > 34 ? 3 : 2
  const targetLength = totalLength / lineCount
  const lines = []
  let currentLine = []
  let currentLength = 0

  words.forEach((word, index) => {
    const separatorLength = currentLine.length > 0 ? 1 : 0
    const nextLength = currentLength + separatorLength + word.length
    const remainingWords = words.length - index
    const remainingLines = lineCount - lines.length
    const shouldBreak =
      currentLine.length > 0 && nextLength > targetLength && remainingWords >= remainingLines

    if (shouldBreak) {
      lines.push(currentLine.join(' '))
      currentLine = [word]
      currentLength = word.length
      return
    }

    currentLine.push(word)
    currentLength = nextLength
  })

  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '))
  }

  return lines
}

function formatHeroAmount(value) {
  if (typeof value === 'number') {
    return `${value.toLocaleString('uk-UA')}$`
  }

  return value
}

function getHeroProgressStyle(collected, goal) {
  if (typeof collected !== 'number' || typeof goal !== 'number' || goal <= 0) {
    return undefined
  }

  const progressPercent = Math.min((collected / goal) * 100, 100)

  return {
    background: `linear-gradient(90deg, #cddc39 0 ${progressPercent}%, #fafceb ${progressPercent}% 100%)`,
  }
}

function HomeHeroTitle() {
  return (
    <h1 className="home-hero__title">
      <span className="home-hero__title-line">Підтримуй</span>
      <span className="home-hero__title-line">добро,купуй</span>
      <span className="home-hero__title-line">та змінюй!</span>
    </h1>
  )
}

export default function HomeHeroSection({ onCartOpen = () => {} }) {
  const navigate = useNavigate()
  const [campaignCards, setCampaignCards] = useState(fallbackCampaignCards)
  const goToDonations = () => navigate('/donations')

  useEffect(() => {
    let isMounted = true

    const loadHeroCampaigns = async () => {
      try {
        const campaigns = await getRandomCampaigns(3)

        if (!isMounted || campaigns.length === 0) return

        setCampaignCards(campaigns)
      } catch (error) {
        console.error('Failed to load hero campaigns:', error)
      }
    }

    loadHeroCampaigns()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="home-hero">
      <div className="home-hero__layout">
        <div className="home-hero__content">
          <div className="home-hero__intro">
            <HomeHeroTitle />
            <p className="home-hero__description">
              Кожна покупка на нашій
              <br />
              платформі - це донат тому,
              <br />
              кому справді потрібно!
            </p>
          </div>

          <div className="home-hero__cta">
            <p className="home-hero__hint">Переглянь інші збори, які чекають на твою допомогу</p>
            <MoreButton className="home-hero__button" onClick={goToDonations}>
              Переглянути інші
            </MoreButton>
          </div>
        </div>

        <div className="home-hero__stage">
          <div className="home-hero__bg" aria-hidden="true">
            <PixelHeart className="home-hero__mosaic" variant="hero-figma" />
          </div>
          <div className="home-hero__cards">
            {campaignCards.map((card, index) => (
              <article key={card.id} className={heroCardClasses[index] ?? heroCardClasses[0]}>
                <h3 className="home-hero__card-title">
                  {splitTitleIntoLines(card.title).map((line) => (
                    <span key={line} className="home-hero__card-title-line">
                      {line}
                    </span>
                  ))}
                </h3>

                <div className="home-hero__card-footer">
                  <div className="home-hero__numbers">
                    <p>
                      Зібрано:
                      <br />
                      {formatHeroAmount(card.collected)}
                    </p>
                    <p>
                      Ціль:
                      <br />
                      {formatHeroAmount(card.goal)}
                    </p>
                  </div>

                  <div
                    className="home-hero__progress"
                    style={getHeroProgressStyle(card.collected, card.goal)}
                  />
                  <MoreButton className="home-hero__card-btn" onClick={goToDonations}>
                    Підтримати
                  </MoreButton>
                </div>
              </article>
            ))}
          </div>

          <div className="home-hero__mobile-cta">
            <p className="home-hero__hint home-hero__hint--mobile">
              Переглянь інші збори, які чекають на твою допомогу
            </p>
            <MoreButton
              className="home-hero__button home-hero__button--mobile"
              onClick={goToDonations}
            >
              Переглянути
            </MoreButton>
          </div>
        </div>
      </div>
    </section>
  )
}
