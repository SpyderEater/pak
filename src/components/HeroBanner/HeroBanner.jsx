import React from 'react'
import './HeroBanner.css'

/**
 * HeroBanner
 * Props:
 * - variant: 'light' | 'solid' (controls background color)
 * - leftContent: React node for left column
 * - rightContent: React node for right column
 */
export default function HeroBanner({ variant = 'light', leftContent, rightContent }) {
  return (
    <header className="hero-banner" data-variant={variant}>
      {/* background pattern - stepped rectangles */}
      <div className="hero-banner__pattern" aria-hidden>
        <svg
          className="hero-banner__svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="80" y="60" width="170" height="50" fill="var(--hero-pattern)" />
          <rect x="150" y="30" width="150" height="80" fill="var(--hero-pattern)" />
          <rect x="500" y="20" width="220" height="90" fill="var(--hero-pattern)" />
          <rect x="980" y="70" width="150" height="40" fill="var(--hero-pattern)" />
        </svg>
      </div>

      <div className="hero-banner__inner">
        <div className="hero-banner__row">
          <div className="hero-banner__col hero-banner__col--left">{leftContent}</div>
          <div className="hero-banner__col hero-banner__col--right">{rightContent}</div>
        </div>
      </div>
    </header>
  )
}
