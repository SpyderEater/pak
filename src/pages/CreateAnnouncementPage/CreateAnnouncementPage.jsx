import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import BasicDataSection from './components/BasicDataSection.jsx'
import PhotoSection from './components/PhotoSection.jsx'
import PriceSection from './components/PriceSection.jsx'
import DescriptionSection from './components/DescriptionSection.jsx'
import DonationHelpSection from './components/DonationHelpSection.jsx'
import MoreButton from '../../components/MoreButton/MoreButton.jsx'
import './CreateAnnouncementPage.css'
import { saveProduct, deleteProduct, getProductById } from '../../services/products'
import { getCurrentUserProfile } from '../../services/users'

const DEFAULT_LOCATION = ''

function normalizeCondition(condition) {
  const map = {
    Нове: 'Новий',
    Вживане: 'Вживаний',
    Відновлене: 'Відновлений',
  }
  return map[condition] || condition || null
}

// function denormalizeCondition(condition) {
//   const map = {
//     Новий: 'Нове',
//     Вживаний: 'Вживане',
//     Відновлений: 'Відновлене',
//   }
//   return map[condition] || condition || ''
// }

function denormalizeCondition(condition) {
  const map = {
    Новий: 'Нове',
    Вживаний: 'Вживане',
    Відновлений: 'Відновлене',
    new: 'Нове',
    used: 'Вживане',
    restored: 'Відновлене',
  }
  return map[condition] || condition || ''
}

export default function CreateAnnouncementPage() {
  const navigate = useNavigate()
  const { productId } = useParams()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('')
  const [donationPercent, setDonationPercent] = useState(null)
  const [condition, setCondition] = useState('')
  const [description, setDescription] = useState('')
  const [donateToFund, setDonateToFund] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState('')
  const [images, setImages] = useState([])
  const [draftId, setDraftId] = useState(null)
  const [submittingStatus, setSubmittingStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(!!productId)

  // loading existing
  useEffect(() => {
    if (!productId) return

    let cancelled = false

    async function loadProduct() {
      try {
        setIsLoading(true)
        // const product = await getProductById(productId)
        const numericId = String(productId).replace('prod-', '')
        const product = await getProductById(numericId)



        if (cancelled || !product) return

        setName(product.title ?? '')
        setCategory(product.categoryId ? String(product.categoryId) : '')
        setPrice(product.price ? String(product.price) : '')
        setCurrency(product.currency ?? '')
        setDonationPercent(product.donationPercentage ?? null)
        setCondition(denormalizeCondition(product.condition))
        setDescription(product.description ?? '')
        setDonateToFund(product.donateToFund ?? false)
        setSelectedOrganization(product.organizationId ? String(product.organizationId) : '')
        setImages(product.images ?? [])
        setDraftId(product.id ?? null)
      } catch (err) {
        console.error('Failed to load product', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadProduct()
    return () => { cancelled = true }
  }, [productId])

  const isFormComplete =
    name.trim().length > 0 &&
    category !== '' &&
    Number(price) >= 1 &&
    currency !== '' &&
    donationPercent != null &&
    condition !== '' &&
    description.trim().length > 0 &&
    images.filter(Boolean).length > 0 &&
    (!donateToFund || selectedOrganization !== '')

  async function buildProductPayload(status) {
    const currentUser = await getCurrentUserProfile()
    const normalizedImages = images.filter(Boolean)

    return {
      id: draftId ?? undefined,
      sellerId: currentUser?.id ?? null,
      title: name.trim(),
      description: description.trim(),
      price: Number(price) || 0,
      currency,
      donationPercentage: donationPercent || 0,
      images: normalizedImages,
      status,
      categoryId: Number(category) || null,
      condition: normalizeCondition(condition),
      location: DEFAULT_LOCATION,
      attributes: {},
      shippingMethods: [],
      paymentMethods: [],
      linkedCampaignId: null,
      createdAt: new Date().toISOString(),
      donateToFund: donateToFund || false,
      organizationId: donateToFund ? selectedOrganization || '' : '',
    }
  }

  async function handleSave(status) {
    if (!isFormComplete) return

    try {
      setSubmittingStatus(status)
      const product = await buildProductPayload(status)
      const result = await saveProduct(product)
      const savedProductId = result.id ?? result?.product?.id ?? null
      setDraftId(savedProductId)
      if (status === 'ACTIVE') {
        navigate('/announcement-success', {
          state: { announcementId: savedProductId },
        })
      }
    } catch (err) {
      console.error(`Save product with status ${status} failed`, err)
    } finally {
      setSubmittingStatus(null)
    }
  }

  if (isLoading) {
    return <div className="create-announcement-page__container">Завантаження...</div>
  }

  return (
    <div className="create-announcement-page__container">
      <h1 className="create-announcement-page__title">
        {productId ? 'Редагування оголошення' : 'Оформлення оголошення'}
      </h1>

      <div className="create-announcement-page__sections">
        <BasicDataSection
          name={name}
          category={category}
          onNameChange={setName}
          onCategoryChange={setCategory}
        />
        <PhotoSection images={images} onImagesChange={setImages} />
        <PriceSection
          price={price}
          currency={currency}
          donationPercent={donationPercent}
          condition={condition}
          onPriceChange={setPrice}
          onCurrencyChange={setCurrency}
          onDonationPercentChange={setDonationPercent}
          onConditionChange={setCondition}
        />
        <DescriptionSection description={description} onDescriptionChange={setDescription} />
        <DonationHelpSection
          donateToFund={donateToFund}
          onDonateToFundChange={setDonateToFund}
          selectedOrganization={selectedOrganization}
          onOrganizationChange={setSelectedOrganization}
        />
      </div>

      <div className="create-announcement-page__actions">
        <div className="create-announcement-page__actions-left">
          <MoreButton
            className="create-announcement-page__action create-announcement-page__action--draft"
            disabled={submittingStatus !== null || !isFormComplete}
            onClick={() => handleSave('DRAFT')}
          >
            Зберегти чернетку
          </MoreButton>

          <MoreButton
            className="create-announcement-page__action create-announcement-page__action--cancel"
            onClick={async () => {
              try {
                if (draftId && !productId) {
                  await deleteProduct(draftId)
                  setDraftId(null)
                }
                navigate(-1)
              } catch (err) {
                console.error('Cancel / delete draft failed', err)
              }
            }}
          >
            Скасувати
          </MoreButton>
        </div>

        <MoreButton
          variant="primary"
          className="create-announcement-page__action create-announcement-page__action--publish create-announcement-page__action--primary"
          disabled={submittingStatus !== null || !isFormComplete}
          onClick={() => handleSave('ACTIVE')}
        >
          Опублікувати
        </MoreButton>
      </div>
    </div>
  )
}