import { useState, useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router'
import './Catalog.css'

import ProductCard from '/src/components/ProductCard/ProductCard.jsx'
import MoreButton from '/src/components/MoreButton/MoreButton.jsx'
import ArrowDownIcon from '/src/assets/images/arrow_down.svg?react'
import Filters from './components/Filters/Filters.jsx'
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher'
import HeroSection from '/src/components/HeroSection/HeroSection.jsx'
import Breadcrumbs from '/src/components/Breadcrumbs/Breadcrumbs.jsx'

import { getProductsByCategory } from '/src/services/products'
import { getCampaigns } from '/src/services/campaigns'

const PAGE_SIZE = 6

export default function Catalog(props) {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [pagesToShow, setPagesToShow] = useState(1) // Tracks expanded pages for "Показати ще"

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [productsData, campaignsData] = await Promise.all([
          getProductsByCategory(params.category),
          getCampaigns(),
        ])

        const campaignsMap = new Map(campaignsData.map((c) => [c.id, c]))

        const enrichedProducts = productsData.map((product) => {
          const linkedCampaign = campaignsMap.get(product.linkedCampaignId)
          return {
            ...product,
            campaignStatus: linkedCampaign?.status || 'active',
            projectType: linkedCampaign?.category || 'Інше',
            organization: linkedCampaign?.foundation || 'Без фонду',
          }
        })

        setProducts(enrichedProducts)
        setCurrentPage(1)
        setPagesToShow(1)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.category])

  const handleFilterChange = (newParams) => {
    setSearchParams(newParams, { preventScrollReset: true })
    setCurrentPage(1)
    setPagesToShow(1)
  }

  const onLoadMore = () => {
    setPagesToShow((prev) => prev + 1)
  }

  const onPageChange = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
    setPagesToShow(1)
  }

  function filterProducts(currentSearchParams, productArr) {
    let filtered = productArr

    const exactFilters = ['type', 'donationPercentage', 'condition', 'campaignStatus']
    for (let key of exactFilters) {
      const values = currentSearchParams.getAll(key)
      if (values.length > 0) {
        filtered = filtered.filter((p) => p[key] && values.includes(p[key].toString()))
      }
    }

    const projectTypes = currentSearchParams.getAll('projectType')
    if (projectTypes.length > 0) {
      filtered = filtered.filter((p) => {
        if (!p.projectType) return false
        const ptLower = p.projectType.toLowerCase()

        return projectTypes.some((pt) => {
          if (pt === 'tech') return ptLower.includes('технічне забезпечення')
          if (pt === 'medicine') return ptLower.includes('медицина')
          if (pt === 'transport') return ptLower.includes('транспорт')
          return false
        })
      })
    }

    const orgs = currentSearchParams.getAll('organization')
    if (orgs.length > 0) {
      filtered = filtered.filter((p) => {
        if (!p.organization) return false
        const orgLower = p.organization.toLowerCase()

        return orgs.some((org) => {
          if (org === 'savelife') return orgLower.includes('повернись живим')
          if (org === 'prytula') return orgLower.includes('притули')
          if (org === 'dobrisertsya') return orgLower.includes('добрі серця')
          if (org === 'none') return orgLower.includes('без фонду')
          return false
        })
      })
    }

    const serviceTypes = currentSearchParams.getAll('serviceType')
    if (serviceTypes.length > 0) {
      filtered = filtered.filter((p) => {
        return serviceTypes.some((st) => {
          if (st === 'consultation') return p.serviceType === 'consultation'
          if (st === 'training') return p.serviceType === 'training'
          if (st === 'other') {
            return (
              p.serviceType !== null &&
              p.serviceType !== 'consultation' &&
              p.serviceType !== 'training'
            )
          }
          return false
        })
      })
    }

    const tiers = currentSearchParams.getAll('donationTier')
    if (tiers.length > 0) {
      filtered = filtered.filter((p) => {
        return tiers.some((tier) => {
          if (tier === 'under_500') return p.price < 500
          if (tier === '500_1000') return p.price >= 500 && p.price <= 1000
          if (tier === 'over_1000') return p.price > 1000
          return false
        })
      })
    }

    const regions = currentSearchParams.getAll('region')
    if (regions.length > 0) {
      filtered = filtered.filter((p) => {
        if (!p.location) return false
        const locLower = p.location.toLowerCase()

        return regions.some((r) => {
          if (r === 'online') return locLower.includes('онлайн')
          if (r === 'kyiv') return locLower.includes('м. київ')
          if (r === 'lviv') return locLower.includes('м. львів')
          if (r === 'odesa') return locLower.includes('м. одеса')
          if (r === 'other') {
            return (
              !locLower.includes('м. київ') &&
              !locLower.includes('м. львів') &&
              !locLower.includes('м. одеса') &&
              !locLower.includes('онлайн')
            )
          }
          return false
        })
      })
    }

    return filtered
  }

  const filteredProducts = useMemo(() => {
    return filterProducts(searchParams, products)
  }, [searchParams, products])

  const totalPages = useMemo(() => {
    if (filteredProducts.length === 0) return 1
    return Math.ceil(filteredProducts.length / PAGE_SIZE)
  }, [filteredProducts.length])

  const visibleProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const endIndex = startIndex + pagesToShow * PAGE_SIZE
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, pagesToShow])

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
    { label: `${catalogCategories[params.category]}`, current: true },
  ]

  const hasEnoughItemsForPagination = filteredProducts.length > PAGE_SIZE
  const startIndexForButton = (currentPage - 1) * PAGE_SIZE
  const showMoreButton = startIndexForButton + pagesToShow * PAGE_SIZE < filteredProducts.length

  return (
    <>
      <Breadcrumbs className="Catalog-breadcrumbs" items={breadcrumbItems} />
      <div className="Catalog-hero-wrapper">
        <HeroSection
          title={
            <>
              Рій помсти 24/7: <br /> б'ємо ворога вдень <br /> та вночі
            </>
          }
          description="Залишилось зібрати зовсім трохи. Без тебе не впораємось!"
          buttonText="Підтримати"
        />
      </div>

      <div className="Catalog-wrapper">
        <Filters searchParams={searchParams} setSearchParams={handleFilterChange} />

        <div className="Catalog-listAndButton-wrapper">
          <div className="Catalog-ProductCardList-wrapper">
            {isLoading ? (
              <p>Завантаження товарів...</p>
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  imgUrl={
                    product.images && product.images[0]
                      ? product.images[0]
                      : '/src/assets/images/vector.svg'
                  }
                  name={product.title}
                  price={product.price}
                  percentNumber={product.donationPercentage}
                  type={product.type}
                  condition={product.condition}
                  category={product.category}
                  id={product.id}
                />
              ))
            ) : (
              <p className="Catalog-empty">За цими фільтрами товарів не знайдено.</p>
            )}
          </div>

          {hasEnoughItemsForPagination && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {showMoreButton && (
                <div>
                  <MoreButton
                    className="Catalog-moreButton-products"
                    rightIcon={<ArrowDownIcon />}
                    onClick={onLoadMore}
                  >
                    Показати ще
                  </MoreButton>
                </div>
              )}
              <PageSwitcher
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
