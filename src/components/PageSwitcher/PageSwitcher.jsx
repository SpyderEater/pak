import { useRef, useState, useEffect } from 'react'
import './PageSwitcher.css'
import ArrowLeftIcon from '../../assets/images/arrow_left.svg?react'
import ArrowRightIcon from '../../assets/images/arrow_right.svg?react'

function PageSwitcher({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  hoverColor = '#99a235',
  disabledColor = '#888888',
  onPageChange,
  scrollTargetSelector,
  disableScroll = false,
  disableScrollOnDesktop = false,
}) {
  const switcherRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 480px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = (e) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleResize)
    return () => mediaQuery.removeEventListener('change', handleResize)
  }, [])

  const computedTotalPages = totalItems
    ? Math.max(1, Math.ceil(totalItems / pageSize))
    : Math.max(1, totalPages || 1)
  const pages = []

  const threshold = isMobile ? 7 : 8

  if (computedTotalPages < threshold) {
    for (let page = 1; page <= computedTotalPages; page += 1) {
      pages.push(page)
    }
  } else {
    if (isMobile) {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'dots', computedTotalPages - 1, computedTotalPages)
      } else if (currentPage >= computedTotalPages - 2) {
        pages.push(1, 2, 'dots', computedTotalPages - 2, computedTotalPages - 1, computedTotalPages)
      } else {
        pages.push(1, 'dots', currentPage, 'dots', computedTotalPages)
      }
    } else {
      for (let page = 1; page <= computedTotalPages; page += 1) {
        if (page <= 3 || page > computedTotalPages - 3) {
          pages.push(page)
          continue
        }

        if (pages[pages.length - 1] !== 'dots') {
          pages.push('dots')
        }
      }
    }
  }

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page)

      if (disableScroll) return

      const isMobileSize = window.matchMedia('(max-width: 480px)').matches

      if (disableScrollOnDesktop && !isMobileSize) {
        return
      }

      setTimeout(() => {
        if (switcherRef.current) {
          let targetElement = null

          if (scrollTargetSelector) {
            targetElement = document.querySelector(scrollTargetSelector)
          } else {
            const commonSelectors = [
              '.Catalog-ProductCardList-wrapper',
              '.donations-page__grid',
              '.listings-feed__list',
              '.reports-section__list',
            ]
            for (const selector of commonSelectors) {
              const element = document.querySelector(selector)
              if (element) {
                targetElement = element
                break
              }
            }
          }

          if (targetElement) {
            const rect = targetElement.getBoundingClientRect()
            const header = document.querySelector('.header')
            const headerHeight = header ? header.offsetHeight : 0

            if (rect.top < headerHeight) {
              const absoluteTargetTop = rect.top + window.scrollY
              window.scrollTo({
                top: absoluteTargetTop - headerHeight,
                behavior: 'smooth',
              })
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      }, 50)
    }
  }

  return (
    <div
      ref={switcherRef}
      className="page-switcher"
      style={{
        '--ps-hover-color': hoverColor,
        '--ps-disabled-color': disabledColor,
      }}
    >
      <button
        className="page-switcher__nav"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
      >
        <ArrowLeftIcon className="page-switcher__nav-icon" aria-hidden="true" />
        <span className="page-switcher__nav-text">Попередня</span>
      </button>

      <div className="page-switcher__pages">
        {pages.map((page, index) =>
          page === 'dots' ? (
            <span key={`dots-${index}`} className="page-switcher__dots">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === currentPage
                  ? 'page-switcher__page page-switcher__page--active'
                  : 'page-switcher__page'
              }
              onClick={() => handlePageChange(page)}
              type="button"
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className="page-switcher__nav"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === computedTotalPages}
        type="button"
      >
        <span className="page-switcher__nav-text">Наступна</span>
        <ArrowRightIcon className="page-switcher__nav-icon" aria-hidden="true" />
      </button>
    </div>
  )
}

export default PageSwitcher
