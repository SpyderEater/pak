import './CatalogOverview.css'
import { Link } from 'react-router'

export default function CatalogOverview({ variant = 'catalog', fillerHoverColor }) {
  // Original desktop filler positions
  const desktopBlocks = [
    [1, 1],
    [1, 5],
    [1, 6],
    [1, 8],
    [1, 9],
    [2, 5],
    [2, 10],
    [2, 11],
    [3, 1],
    [3, 2],
    [3, 4],
    [3, 8],
    [3, 10],
    [3, 11],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 7],
    [4, 8],
    [4, 9],
    [4, 10],
    [4, 11],
    [5, 1],
    [5, 3],
    [5, 4],
    [5, 8],
    [5, 9],
  ]

  // Mapped based on your 3-column narrow image design
  const mobileBlocks = [
    [1, 3],
    [3, 1],
    [5, 3],
    [6, 2],
    [7, 1],
    [7, 3],
  ]

  return (
    <div
      className={`CatalogOverview-wrapper CatalogOverview-wrapper--${variant}`}
      style={
        fillerHoverColor ? { '--catalog-overview-filler-hover-color': fillerHoverColor } : undefined
      }
    >
      <div className="CatalogOverview-grid">
        <section className="CatalogOverview-section">
          <h2 className="CatalogOverview-section-heading">Обирай те, що необхідно</h2>
          <p className="CatalogOverview-section-text">
            У нас ти можеш знайти багато речей, але якщо не підбереш, все одно повертайся!
          </p>
        </section>

        <Link className="CatalogOverview-item CatalogOverview-home-product" to="/catalog/home">
          Товари для дому
        </Link>
        <Link
          className="CatalogOverview-item CatalogOverview-beauty-health"
          to="/catalog/health-beauty"
        >
          Краса та здоровʼя
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-clothes" to="/catalog/clothes">
          Одяг та аксесуари
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-kids-product" to="/catalog/kids">
          Дитячі товари
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-zoo-product" to="/catalog/pets">
          Зоотовари
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-hobby" to="/catalog/hobbies">
          Хобі та розваги
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-art" to="/catalog/art-craft">
          Мистецтво та творчість
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-service" to="/catalog/services">
          Послуги
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-book" to="/catalog/books">
          Книги та освітні матеріали
        </Link>
        <Link className="CatalogOverview-item CatalogOverview-applience" to="/catalog/electronics">
          Електроніка та техніка
        </Link>

        {/* Desktop Fillers */}
        {desktopBlocks.map(([row, col]) => (
          <div
            key={`desktop-${row}-${col}`}
            className="CatalogOverview-filler CatalogOverview-filler--desktop"
            style={{ gridRow: row, gridColumn: col }}
          />
        ))}

        {/* Mobile Fillers */}
        {mobileBlocks.map(([row, col]) => (
          <div
            key={`mobile-${row}-${col}`}
            className="CatalogOverview-filler CatalogOverview-filler--mobile"
            style={{ gridRow: row, gridColumn: col }}
          />
        ))}
      </div>
    </div>
  )
}
