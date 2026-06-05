import './ReportRow.css'
import DownloadIcon from '../../images/download_icon.svg?react'
import { buildReportDownloadUrl, buildReportPreviewUrl } from '../../../../services/reports.js'

export default function ReportRow({ title, type, driveFileId }) {
  const downloadUrl = buildReportDownloadUrl(driveFileId)
  const previewUrl = buildReportPreviewUrl(driveFileId)

  return (
    <article className="report-row" role="listitem">
      <div className="report-row__content">
        <h3 className="report-row__title">{title}</h3>
        <p className="report-row__type">{type}</p>
      </div>

      <div className="report-row__actions">
        <a
          href={downloadUrl}
          download
          className="report-row__download"
          aria-label={`Завантажити ${title} ${type}`}
        >
          <DownloadIcon aria-hidden="true" className="report-row__download-icon" />
        </a>

        <a
          href={previewUrl}
          className="report-row__view-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Переглянути
        </a>
      </div>
    </article>
  )
}
