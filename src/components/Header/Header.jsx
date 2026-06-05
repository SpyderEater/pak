import { useState, useEffect, useRef } from 'react'
import './Header.css'
import { Link } from 'react-router'
import LogoIcon from '../../assets/images/logo.svg?react'
import LogoNoTextIcon from '../../assets/images/logo_no_text.svg?react'
import GridIcon from '../../assets/images/catalog_grid.svg?react'
import UserIcon from '../../assets/images/profile_icon.svg?react'
import CartIcon from '../../assets/images/cart_icon.svg?react'
import SearchIcon from '../../assets/images/search_icon.svg?react'

const defaultLinks = [
  { label: 'Про нас', href: '/' },
  { label: 'Збори', href: '/donations' },
  { label: 'Статистика', href: '/statistics' },
  { label: 'Блог', href: '/' },
]

export default function Header({
  links = defaultLinks,
  ctaText = 'Додати оголошення',
  ctaHref = '/create-announcement',
  topInfoText = 'Профіль/Замовлення',
  transparent = true,
  overlay = false,
  onCartOpen = () => {},
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const headerElement = headerRef.current

    if (!headerElement) return undefined

    const updateHeaderOffset = () => {
      document.documentElement.style.setProperty(
        '--header-offset',
        `${Math.ceil(headerElement.getBoundingClientRect().height)}px`,
      )
    }

    updateHeaderOffset()

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateHeaderOffset)
      resizeObserver.observe(headerElement)

      return () => {
        resizeObserver.disconnect()
      }
    }

    window.addEventListener('resize', updateHeaderOffset)
    return () => window.removeEventListener('resize', updateHeaderOffset)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 425 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className={`header${
        transparent ? ' header--transparent' : ''
      }${overlay ? ' header--overlay' : ''}${scrolled ? ' header--scrolled' : ''}`.trim()}
    >
      {topInfoText && topInfoText.trim() !== '' ? (
        <div className="header__top">{topInfoText}</div>
      ) : null}

      <div className="header__bar">
        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--active' : ''}`}></span>
        </button>

        <Link className="header__logo" to="/" aria-label="На головну" onClick={closeMenu}>
          <LogoIcon className="header__logo-icon logo-desktop" />
          <LogoNoTextIcon className="header__logo-icon logo-mobile" />
        </Link>

        <div className={`header__menu ${isMobileMenuOpen ? 'header__menu--open' : ''}`}>
          <div className="header__main-group">
            <nav className="header__nav" aria-label="Головне меню">
              <Link
                to="/catalog"
                className="header__grid-link"
                aria-label="Каталог"
                onClick={closeMenu}
              >
                <GridIcon className="header__icon-svg" />
                <span className="header__mobile-text">Каталог</span>
              </Link>

              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="header__nav-link"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="header__utility-icons">
              <Link
                to="/profile"
                className="header__icon-btn"
                aria-label="Профіль"
                onClick={closeMenu}
              >
                <UserIcon className="header__icon-svg" />
                <span className="header__mobile-text">Профіль</span>
              </Link>

              <button
                type="button"
                className="header__icon-btn"
                aria-label="Кошик"
                onClick={() => {
                  onCartOpen()
                  closeMenu()
                }}
              >
                <CartIcon className="header__icon-svg" />
                <span className="header__mobile-text">Кошик</span>
              </button>

              <button
                type="button"
                className="header__icon-btn search-mobile-only"
                aria-label="Пошук"
                onClick={closeMenu}
              >
                <SearchIcon className="header__icon-svg" />
                <span className="header__mobile-text">Пошук</span>
              </button>
            </div>
          </div>
        </div>

        <div className="header__actions">
          <Link to={ctaHref} className="header__cta" onClick={closeMenu}>
            {ctaText}
          </Link>

          <button type="button" className="header__icon-btn search-desktop-only" aria-label="Пошук">
            <SearchIcon className="header__icon-svg" />
          </button>
        </div>
      </div>
    </header>
  )
}
