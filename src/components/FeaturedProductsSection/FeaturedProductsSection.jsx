import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import ProductCard from '/src/components/ProductCard/ProductCard.jsx'
import { getAllProducts } from '/src/services/products.js'
import './FeaturedProductsSection.css'

export default function FeaturedProductsSection(props) {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const allProducts = await getAllProducts()

        if (!isMounted) return

        if (allProducts && allProducts.length > 0) {
          const firstFour = allProducts.slice(0, 4).map((product) => ({
            id: product.id,
            imgUrl:
              product.images && product.images[0]
                ? product.images[0]
                : '/src/assets/images/vector.svg',
            name: product.title,
            price: product.price,
            percentNumber: product.donationPercentage,
            type: product.type,
            condition: product.condition,
            category: product.category,
          }))

          setFeaturedProducts(firstFour)
        }
      } catch (error) {
        console.error('Failed to load featured products:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="home-page__products">
      <div className="home-page__container">
        <div className="home-page__section-head">
          <h2 className="home-page__section-title">{props.title}</h2>
          {/* Товари для тебе Схожі пропозиції */}
          {props.isLink && (
            <Link to="/catalog" className="home-page__section-link">
              <span>Переглянути більше</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#181D27"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className="home-page__products-grid">
          {isLoading ? (
            <p className="home-page__products-message">Завантаження товарів...</p>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p className="home-page__products-message">Немає товарів для відображення.</p>
          )}
        </div>
      </div>
    </section>
  )
}
