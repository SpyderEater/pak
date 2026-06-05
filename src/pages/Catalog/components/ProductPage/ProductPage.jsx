import { useCart } from '/src/contexts/CartContext'
import { useOutletContext } from 'react-router'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import './ProductPage.css'

import { getProductById } from '/src/services/products'
import { getCampaigns } from '/src/services/campaigns'
import Breadcrumbs from '/src/components/Breadcrumbs/Breadcrumbs.jsx'
import FeaturedProductsSection from '/src/components/FeaturedProductsSection/FeaturedProductsSection.jsx'

export default function ProductPage(props) {
  const { addItem } = useCart()
  const { handleCartOpen } = useOutletContext()

  const params = useParams()
  const productId = params.id

  const [product, setProduct] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFoundationId, setSelectedFoundationId] = useState('')

  // NEW: State to track which image is currently displayed in the main view
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [productData, campaignsData] = await Promise.all([
          getProductById(productId),
          getCampaigns(),
        ])

        setProduct(productData)
        setCampaigns(campaignsData)
      } catch (error) {
        console.error('Failed to fetch product page data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [productId])

  if (isLoading) {
    return (
      <div className="product-page-wrapper">
        <p>Завантаження товару...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-page-wrapper">
        <p>Товар не знайдено</p>
      </div>
    )
  }

  const productPriceAddPercent = 10 ** Math.floor(product.price / 100).toString().length

  // Ensure we always have an array of images to work with
  const allImages =
    product.images && product.images.length > 0 ? product.images : ['/src/assets/images/vector.svg']

  // The main image is now driven by the state index
  const mainImage = allImages[currentImageIndex]

  // Navigation handlers for the carousel
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? allImages.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === allImages.length - 1 ? 0 : prevIndex + 1))
  }

  const conditionMap = {
    new: 'Новий',
    used: 'Вживаний',
    restored: 'Відреставрований',
  }

  const catalogCategories = {
    home: 'Товари для дому',
    'health-beauty': 'Краса та здоровʼя',
    clothes: 'Одяг та аксесуари',
    kids: 'Дитячі товари',
    pets: 'Зоотовари',
    hobbies: 'Хобі та розваги',
    'art-craft': 'Мистецтво та творчість',
    services: 'Послуги',
    books: 'Книги та освітні матеріали',
    electronics: 'Електроніка та техніка',
  }

  const breadcrumbItems = [
    { label: 'Головна', to: '/' },
    { label: 'Каталог', to: '/catalog' },
    {
      label: `${catalogCategories[params.category]}`,
      to: `/catalog/${params.category}`,
    },
    { label: `${product.title}`, current: true },
  ]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      donation: productPriceAddPercent,
      image: mainImage,
      note:
        product.linkedCampaignId === null
          ? '*При оформленні оберіть фонд на який піде донат.'
          : null,
    })
    handleCartOpen()
  }

  return (
    <>
      <Breadcrumbs className="product-page-breadcrumbs" items={breadcrumbItems} />

      <div className="product-page-wrapper">
        <aside className="product-page-aisde-wrapper">
          <div className="product-page-images-top">
            <div className="product-page-image-main-wrapper">
              {/* Left Arrow Button (Only show if there's more than 1 image) */}
              {allImages.length > 1 && (
                <button className="product-page-carousel-btn prev" onClick={handlePrevImage}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              <img className="product-page-image-main" src={mainImage} alt="product img" />

              {/* Right Arrow Button */}
              {allImages.length > 1 && (
                <button className="product-page-carousel-btn next" onClick={handleNextImage}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className="product-page-images-bottom">
              {allImages.map((url, i) => (
                <div
                  key={i}
                  className={`product-page-image-extra-wrapper ${i === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(i)} // Make thumbnails clickable!
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    className="product-page-image-extra"
                    src={url}
                    alt={`product extra img ${i}`}
                  />
                </div>
              ))}
            </div>
          )}
        </aside>

        <section className="product-page-section-wrapper">
          <header className="product-page-section-header">
            <section className="product-page-main-info">
              <span className="product-page-donation-box product-page-green-box">
                {`${product.donationPercentage}% донату`}
              </span>
              <h3 className="product-page-section-heading">{product.title}</h3>
              <div className="product-page-price-wrapper">
                <figure className="product-page-price">{`${product.price} грн`}</figure>
                <button className="product-page-price-add product-page-green-box">{`+${productPriceAddPercent} грн`}</button>
              </div>
            </section>

            {product.linkedCampaignId === null && (
              <section className="product-page-section-foundation">
                <div className="product-page-section-foundation-top-wrapper">
                  <img
                    className="product-page-section-foundation-alert-icon"
                    src="/src/assets/images/alert_icon.svg"
                    alt="exclamation icon"
                  />
                  <div className="product-page-section-foundation-text-wrapper">
                    <p className="product-page-section-foundation-text">
                      Продавець цього не обрав фонд для спрямування коштів від покупки. Маєте шанс
                      підтримати важливу вам ініціативу!
                    </p>
                    <p className="product-page-section-foundation-text">
                      Відмовляючись від вибору, кошти буде спрямовано на нагальні збори.
                    </p>
                  </div>
                </div>

                <label
                  className="product-page-section-foundation-label"
                  htmlFor="product-page-foundation-select"
                >
                  Оберіть благодійну організацію
                </label>

                <select
                  className="product-page-section-foundation-select"
                  id="product-page-foundation-select"
                  name="foundations"
                  required
                  value={selectedFoundationId}
                  onChange={(e) => setSelectedFoundationId(e.target.value)}
                >
                  <option value="">Благодійні організації</option>
                  {campaigns.map((campaign) => (
                    <option
                      key={campaign.id}
                      value={campaign.id}
                    >{`${campaign.title} від ${campaign.foundation}`}</option>
                  ))}
                </select>
              </section>
            )}
            <button className="product-page-button-buy" onClick={handleAddToCart}>
              Додати до корзини
            </button>
          </header>
          <main className="product-page-section-main">
            <section className="product-page-section-description">
              <span className="product-page-section-span">Опис товару:</span>
              <p className="product-page-section-text">{product.description}</p>
            </section>
            <section className="product-page-section-info">
              <span className="product-page-info-heading product-page-section-span">
                Основна інформація
              </span>
              <ul className="product-page-info-list product-page-section-text">
                {product.attributes &&
                  Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key} className="product-page-info-item">
                      <span className="product-page-section-span" style={{ display: 'inline' }}>
                        {key}:
                      </span>{' '}
                      {value}
                    </li>
                  ))}
                {product.condition && (
                  <li className="product-page-info-item">
                    <span className="product-page-section-span" style={{ display: 'inline' }}>
                      Стан:
                    </span>{' '}
                    <p className="product-page-section-text" style={{ display: 'inline' }}>
                      {conditionMap[product.condition] || product.condition}
                    </p>
                  </li>
                )}
              </ul>
            </section>

            {(product.shippingMethods?.length > 0 || product.location) && (
              <section className="product-page-section-info">
                <span className="product-page-info-heading product-page-section-span">
                  Спосіб доставки
                </span>
                <ul className="product-page-info-list product-page-section-text">
                  {product.shippingMethods?.filter((m) => m !== 'Самовивіз').length > 0 && (
                    <li className="product-page-info-item">
                      <span className="product-page-section-span" style={{ display: 'inline' }}>
                        Доставка:
                      </span>{' '}
                      {product.shippingMethods.filter((m) => m !== 'Самовивіз').join(', ')}
                    </li>
                  )}
                  {product.shippingMethods?.includes('Самовивіз') && product.location && (
                    <li className="product-page-info-item">
                      <span className="product-page-section-span" style={{ display: 'inline' }}>
                        Самovивіз:
                      </span>{' '}
                      {product.location}
                    </li>
                  )}
                </ul>
              </section>
            )}

            {product.paymentMethods?.length > 0 && (
              <section className="product-page-section-info">
                <span className="product-page-info-heading product-page-section-span">Оплата</span>
                <ul className="product-page-info-list product-page-section-text">
                  {product.paymentMethods.map((method, index) => (
                    <li key={index} className="product-page-info-item">
                      {method}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <footer className="product-page-section-footer">
              <p className="product-page-section-footer-text">
                Кошти від продажу цього товару йдуть на підтримку армії, зокрема на проєкт закупівлі
                дронів та розвідувального обладнання для підвищення безпеки військових на передовій.
              </p>
              <p className="product-page-section-footer-text-green">
                *Частина коштів (5% від оплаченої суми) піде на обслуговування платформи.
              </p>
            </footer>
          </main>
        </section>
      </div>
      <FeaturedProductsSection title="Схожі пропозиції" />
    </>
  )
}
