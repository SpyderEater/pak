import { useEffect, useState } from 'react'
import DashboardToolbar from '../DashboardToolbar/DashboardToolbar.jsx'
import ListingCard from '../ListingCard/ListingCard.jsx'
import PageSwitcher from '/src/components/PageSwitcher/PageSwitcher.jsx'
import MoreButton from '/src/components/MoreButton/MoreButton.jsx'
import ArrowDownIcon from '/src/assets/images/arrow_down.svg?react'

import './ListingsFeed.css'

const PAGE_SIZE = 4

export default function ListingsFeed({
  tabs,
  activeTabId,
  onTabChange,
  addListingLabel,
  addListingIcon,
  cards,
  messageIcon,
  deleteIcon,
}) {
  const totalItems = Array.isArray(cards) ? cards.length : 0
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))

  const [currentPage, setCurrentPage] = useState(1)
  const [pagesShown, setPagesShown] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
    setPagesShown(1)
  }, [activeTabId, totalItems])

  const handlePageChange = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(clamped)
    setPagesShown(1)
  }

  const handleShowMore = () => {
    if (currentPage + pagesShown - 1 < totalPages) {
      setPagesShown((prev) => prev + 1)
    }
  }

  const startIdx = (currentPage - 1) * PAGE_SIZE
  const endIdx = startIdx + pagesShown * PAGE_SIZE
  const itemsToRender = cards.slice(startIdx, endIdx)

  const maxVisiblePage = currentPage + pagesShown - 1
  const canShowMore = maxVisiblePage < totalPages

  return (
    <section className="listings-feed">
      <DashboardToolbar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabChange={onTabChange}
        addListingLabel={addListingLabel}
        addListingIcon={addListingIcon}
      />

      <div className="listings-feed__list">
        {itemsToRender.map((card) => (
          <ListingCard
            key={card.id}
            {...card}
            messageIcon={card.messageIcon ?? messageIcon}
            deleteIcon={card.deleteIcon ?? deleteIcon}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="listings-feed__pagination">
          {canShowMore ? (
            <div className="listings-feed__more">
              <MoreButton onClick={handleShowMore} rightIcon={<ArrowDownIcon />}>
                Показати ще
              </MoreButton>
            </div>
          ) : null}

          <div className="listings-feed__pages">
            <PageSwitcher
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
              scrollTargetSelector=".listings-feed__list"
            />
          </div>
        </div>
      )}
    </section>
  )
}
