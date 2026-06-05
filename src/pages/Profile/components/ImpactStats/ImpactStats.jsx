import './ImpactStats.css'
import { generateGraphPaths } from '../../services/generateGraphPaths'

export default function ImpactStats({ title, value, arrowIcon, dataPoints = [] }) {
  const { linePath, areaPath } = generateGraphPaths(dataPoints)
  const hasData = dataPoints.length > 1

  return (
    <div className="profile-impact-stats">
      <button type="button" className="profile-impact-stats__header">
        <h3 className="profile-impact-stats__title">{title}</h3>
        {arrowIcon ? (
          <span className="profile-impact-stats__arrow" aria-hidden="true">
            {arrowIcon}
          </span>
        ) : null}
      </button>

      <div className="profile-impact-stats__body">
        <span className="profile-impact-stats__value">{value}</span>

        <div className="profile-impact-stats__chart">
          {hasData ? (
            <svg
              viewBox="0 0 100 40"
              className="profile-impact-stats__chart-svg"
              preserveAspectRatio="none"
            >
              <path d={areaPath} fill="#e5efb6" opacity="0.85" />
              <path d={linePath} fill="none" stroke="#bfcd2d" strokeWidth="2" />
            </svg>
          ) : (
            <div className="profile-impact-stats__no-data">Немає даних</div>
          )}
        </div>
      </div>
    </div>
  )
}
