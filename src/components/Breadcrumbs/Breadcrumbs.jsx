import { Link } from 'react-router'
import triangleRight from '../../assets/images/triangle_right.svg'
import './Breadcrumbs.css'

export default function Breadcrumbs({
  items = [],
  ariaLabel = 'breadcrumb',
  className = '',
  variant = 'inline',
  separatorSrc = triangleRight,
  separatorAlt = '',
}) {
  if (!items.length) {
    return null
  }

  return (
    <nav
      className={`breadcrumbs breadcrumbs--${variant} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div className="breadcrumbs__inner">
        <ol className="breadcrumbs__list">
          {items.map((item, index) => {
            const isCurrent = item.current ?? index === items.length - 1
            const key = `${item.label}-${item.to ?? index}`

            return (
              <li className="breadcrumbs__item" key={key}>
                <Link
                  className={isCurrent ? 'breadcrumbs__current' : 'breadcrumbs__link'}
                  to={item.to || '#'}
                  title={item.title ?? item.label}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </Link>

                {index < items.length - 1 ? (
                  <img
                    className="breadcrumbs__separator"
                    src={separatorSrc}
                    alt={separatorAlt}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
