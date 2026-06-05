import { useEffect, useState } from 'react'
import ImpactStatsSection from '../../components/ImpactStatsSection/ImpactStatsSection.jsx'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import ReportsSection from './components/ReportsSection/ReportsSection.jsx'
import './StatisticsPage.css'
import { getReports } from '../../services/reports.js'

export default function StatisticsPage() {
  const [reportsData, setReportsData] = useState({ googleDriveUrl: '', reportList: [] })

  useEffect(() => {
    let isActive = true

    async function loadReports() {
      try {
        const nextReports = await getReports()
        if (isActive) {
          setReportsData({
            googleDriveUrl: nextReports?.googleDriveUrl ?? '',
            reportList: Array.isArray(nextReports?.reportList) ? nextReports.reportList : [],
          })
        }
      } catch {
        if (isActive) {
          setReportsData({ googleDriveUrl: '', reportList: [] })
        }
      }
    }

    loadReports()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="statistics-page">
      <div className="statistics-page__container statistics-page__breadcrumbs-wrap">
        <Breadcrumbs
          variant="inline"
          items={[
            { label: 'Головна', to: '/' },
            { label: 'Статистика', current: true },
          ]}
        />
      </div>

      <ImpactStatsSection showDetailsButton={false} />

      <ReportsSection
        reports={reportsData.reportList}
        googleDriveUrl={reportsData.googleDriveUrl}
      />
    </main>
  )
}
