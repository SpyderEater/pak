import { useState, useEffect } from 'react'
import MoreButton from '../MoreButton/MoreButton.jsx'
import miniHeartsFrame from '../../assets/images/impact-mini-hearts.svg'
import stairsBg from '../../assets/images/impact_stats_stairs.svg'
import ArrowRightIcon from '../../assets/images/arrow_right.svg?react'
import { getGlobalStats } from '../../services/statistics.js'

import './ImpactStatsSection.css'

export default function ImpactStatsSection({
  detailsHref = '/statistics',
  showDetailsButton = true,
} = {}) {
  const [stats, setStats] = useState({
    donationsGrowthPercent: 50,
    onlineSystemPercent: 60,
    buySellMethodCount: 2450,
    totalDonatedBillions: 98.9,
    smallDonatesPart: 80,
  })

  useEffect(() => {
    let isMounted = true

    const loadStats = async () => {
      const data = await getGlobalStats()
      if (isMounted && data) {
        setStats(data)
      }
    }

    loadStats()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className={`impact-stats${showDetailsButton ? '' : ' impact-stats--stats-only'}`}>
      <div className="impact-stats__inner">
        <div className="impact-stats__intro">
          <h2 className="impact-stats__title">
            <span>І допомагай</span>
            <span>тим, кому дуже</span>
            <span>потрібно</span>
          </h2>

          {showDetailsButton && (
            <MoreButton
              className="impact-stats__details-btn"
              onClick={() => {
                window.location.href = detailsHref
              }}
              rightIcon={<ArrowRightIcon />}
            >
              Детальніше
            </MoreButton>
          )}
        </div>

        <div className="impact-stats__white-card">
          <p className="impact-stats__label">
            <span>За період війни</span>
            <span>донати виросли</span>
            <span>більше ніж на</span>
          </p>
          <p className="impact-stats__value">{stats.donationsGrowthPercent}%</p>
          <img src={stairsBg} alt="" className="impact-stats__stairs" aria-hidden="true" />
        </div>

        <div className="impact-stats__rate-wrap">
          <div className="impact-stats__rate-card">
            <p className="impact-stats__label">
              <span>Відсоток донатів,</span>
              <span>які надходять</span>
              <span>з онлайн-системи</span>
            </p>

            <p className="impact-stats__value impact-stats__value--highlight">
              {stats.onlineSystemPercent}%
            </p>

            <div className="impact-stats__rate-grid">
              {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="impact-stats__rate-square" />
              ))}
            </div>
          </div>

          <div className="impact-stats__joined-card">
            <p className="impact-stats__label impact-stats__label--light">
              <span>До методу донатів</span>
              <span>&quot;купуй-продавай&quot;</span>
              <span>доєдналось понад</span>
            </p>
            <p className="impact-stats__value impact-stats__value--light">
              {stats.buySellMethodCount}
            </p>
          </div>
        </div>

        <div className="impact-stats__heart-card">
          <p className="impact-stats__label impact-stats__label--light">
            <span>З початку війни українці</span>
            <span>переказали на потреби</span>
            <span>ЗСУ понад</span>
          </p>
          <div className="impact-stats__heart-visual" aria-hidden="true"></div>
          <p className="impact-stats__money">
            {stats.totalDonatedBillions} <span>млрд</span>
          </p>
        </div>

        <div className="impact-stats__bar-card">
          <p className="impact-stats__label impact-stats__label--light">
            <span>Малі внески,</span>
            <span>складають понад</span>
          </p>
          <div className="impact-stats__bar-bottom">
            <p className="impact-stats__big-value">{stats.smallDonatesPart}%</p>
          </div>
        </div>
      </div>
    </section>
  )
}
