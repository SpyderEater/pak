import { useEffect, useMemo, useState } from 'react'

import Header from '../../components/Header/Header.jsx'
import HeroSection from '../../components/HeroSection/HeroSection.jsx'
import CampaignCard from '../../components/CampaignCard/CampaignCard.jsx'
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher.jsx'
import MoreButton from '../../components/MoreButton/MoreButton.jsx'
import { filterByFields, getUniqueFieldValues } from '../../helpers/filterByFields.js'
import { getCampaigns } from '../../services/campaigns.js'

import FiltersBar from './components/FiltersBar/FiltersBar.jsx'
import './DonationsPage.css'

const PAGE_SIZE = 9
const DEFAULT_FILTERS = {
  category: 'all',
  status: 'all',
  foundation: 'all',
}

function DonationsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesShown, setPagesShown] = useState(1)
  const [campaigns, setCampaigns] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadCampaigns = async () => {
      try {
        const data = await getCampaigns()

        if (!isMounted) return

        setCampaigns(data)
        setCurrentPage(1)
        setPagesShown(1)
      } catch (error) {
        console.error('Failed to load campaigns:', error)
      }
    }

    loadCampaigns()

    return () => {
      isMounted = false
    }
  }, [])

  const typeOptions = useMemo(
    () => [
      { value: 'all', label: 'Тип збору' },
      ...getUniqueFieldValues(campaigns, 'category').map((value) => ({
        value,
        label: value,
      })),
    ],
    [campaigns],
  )

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: 'Завершення збору' },
      { value: 'active', label: 'Активні' },
      { value: 'closed', label: 'Завершені' },
    ],
    [],
  )

  const organizationOptions = useMemo(
    () => [
      { value: 'all', label: 'Організація' },
      ...getUniqueFieldValues(campaigns, 'foundation').map((value) => ({
        value,
        label: value,
      })),
    ],
    [campaigns],
  )

  const filteredCampaigns = useMemo(
    () =>
      filterByFields(campaigns, [
        { field: 'category', value: appliedFilters.category },
        { field: 'status', value: appliedFilters.status },
        { field: 'foundation', value: appliedFilters.foundation },
      ]),
    [campaigns, appliedFilters],
  )

  const totalPages = useMemo(() => {
    if (filteredCampaigns.length === 0) return 1
    return Math.ceil(filteredCampaigns.length / PAGE_SIZE)
  }, [filteredCampaigns.length])

  const visibleCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + pagesShown * PAGE_SIZE
    return filteredCampaigns.slice(startIndex, endIndex)
  }, [filteredCampaigns, currentPage, pagesShown])

  const onLoadMore = () => {
    if (currentPage + pagesShown - 1 < totalPages) {
      setPagesShown((prev) => prev + 1)
    }
  }

  const onPageChange = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
    setPagesShown(1)
  }

  const onFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const onApplyFilters = () => {
    setAppliedFilters({ ...filters })
    setCurrentPage(1)
    setIsMobileFiltersOpen(false)
  }

  const onResetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS })
    setAppliedFilters({ ...DEFAULT_FILTERS })
    setCurrentPage(1)
    setIsMobileFiltersOpen(false)
  }

  const hasEnoughItemsForPagination = filteredCampaigns.length > PAGE_SIZE
  const showMoreButton = currentPage + pagesShown - 1 < totalPages

  return (
    <>
      <section className="donations-page__top">
        <HeroSection
          title="Рій помсти 24/7: б'ємо ворога вдень та вночі"
          description="Залишилось зібрати зовсім трохи. Без тебе не впораємось!"
          buttonText="Підтримати"
        />

        <div className="donations-page__mobile-heading">
          <h1 className="donations-page__mobile-title">Усі збори</h1>
          <button
            type="button"
            className="donations-page__mobile-filter-toggle"
            aria-label={isMobileFiltersOpen ? 'Закрити фільтри' : 'Відкрити фільтри'}
            aria-expanded={isMobileFiltersOpen}
            onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 6h16l-6.2 7.1v4.7l-3.6 1.8V13.1L4 6Z" />
            </svg>
          </button>
        </div>

        <div className="donations-page__container donations-page__filters-strip">
          <div className="donations-page__filters">
            <FiltersBar
              typeOptions={typeOptions}
              statusOptions={statusOptions}
              organizationOptions={organizationOptions}
              filters={filters}
              onFilterChange={onFilterChange}
              onApply={onApplyFilters}
              onReset={onResetFilters}
            />
          </div>
        </div>

        {isMobileFiltersOpen ? (
          <div className="donations-page__mobile-filters">
            <FiltersBar
              typeOptions={typeOptions}
              statusOptions={statusOptions}
              organizationOptions={organizationOptions}
              filters={filters}
              onFilterChange={onFilterChange}
              onApply={onApplyFilters}
              onReset={onResetFilters}
            />
          </div>
        ) : null}
      </section>

      <section className="donations-page__content">
        <div className="donations-page__container donations-page__content-shell">
          <div className="donations-page__content-frame">
            {visibleCampaigns.length > 0 ? (
              <div className="donations-page__grid">
                {visibleCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
              </div>
            ) : (
              <p className="donations-page__empty">За цими фільтрами зборів не знайдено.</p>
            )}

            {hasEnoughItemsForPagination && (
              <div className="donations-page__pagination-container">
                {showMoreButton && (
                  <div className="donations-page__load-more">
                    <MoreButton onClick={onLoadMore}>Показати ще ↓</MoreButton>
                  </div>
                )}

                <PageSwitcher
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  scrollTargetSelector=".donations-page__grid"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default DonationsPage
