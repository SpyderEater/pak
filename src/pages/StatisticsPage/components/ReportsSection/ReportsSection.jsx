import { useEffect, useState } from 'react'
import ReportRow from '../ReportRow/ReportRow.jsx'
import PageSwitcher from '../../../../components/PageSwitcher/PageSwitcher.jsx'
import MoreButton from '../../../../components/MoreButton/MoreButton.jsx'
import ArrowDownIcon from '../../../../assets/images/arrow_down.svg?react'
import TriangleRifht from '../../../../assets/images/triangle_right.svg?react'

import './ReportsSection.css'

const PAGE_SIZE = 6

export default function ReportsSection({ reports, googleDriveUrl }) {
  const reportList = Array.isArray(reports) ? reports : []
  const totalItems = reportList.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))

  const [currentPage, setCurrentPage] = useState(1)
  const [visiblePages, setVisiblePages] = useState(1)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setCurrentPage(1)
    setVisiblePages(1)
    setExpanded(false)
  }, [totalItems])

  const handlePageChange = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(clamped)
    setVisiblePages(clamped)
    setExpanded(false)
  }

  const handleShowMore = () => {
    const next = Math.min(visiblePages + 1, totalPages)
    setVisiblePages(next)
    setExpanded(true)
    setCurrentPage(next)
  }

  const visibleReports = expanded
    ? reportList.slice(0, visiblePages * PAGE_SIZE)
    : reportList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <section className="reports-section statistics-page__reports">
      <div className="statistics-page__container">
        <div className="reports-section__header">
          <h2 className="reports-section__title">Звітність</h2>

          <a
            className="reports-section__link"
            href={googleDriveUrl || '/'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Перейти на диск"
          >
            На диск
            <TriangleRifht className="reports-section__link-icon" aria-hidden="true" />
          </a>
        </div>

        <div className="reports-section__content">
          <div className="reports-section__list" role="list" aria-label="Звіти">
            {visibleReports.map((report) => (
              <ReportRow key={report.id} {...report} />
            ))}
          </div>

          <div className="reports-section__pagination">
            {!expanded && visiblePages < totalPages ? (
              <div className="reports-section__more">
                <MoreButton onClick={handleShowMore} rightIcon={<ArrowDownIcon />}>
                  Показати ще
                </MoreButton>
              </div>
            ) : null}

            <PageSwitcher
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
              disableScrollOnDesktop={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
