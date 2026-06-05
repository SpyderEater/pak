import { useEffect, useState } from 'react'
import SectionCard from './SectionCard.jsx'
import './BasicDataSection.css'
import { getAllCategories } from '../../../services/categories'

export default function BasicDataSection({ name, category, onNameChange, onCategoryChange }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await getAllCategories()
        if (!cancelled) setCategories(data || [])
      } catch (err) {
        console.error('Failed to load categories:', err)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <SectionCard
      title="Вкажіть основні дані"
      className="basic-data-section"
      titleClassName="basic-data-section__title"
      bodyClassName="basic-data-section__body"
    >
      <div className="basic-data-section__fields">
        <div className="basic-data-section__group basic-data-section__group--name">
          <label className="basic-data-section__label" htmlFor="product-name">
            Вкажіть назву товару
          </label>
          <input
            id="product-name"
            className="basic-data-section__input"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Наприклад, Ваза JUSK скляна"
          />
          <p className="basic-data-section__hint">Кількість символів 16-70</p>
        </div>

        <div className="basic-data-section__group basic-data-section__group--category">
          <label className="basic-data-section__label" htmlFor="product-category">
            Оберіть категорію
          </label>
          <select
            id="product-category"
            className="basic-data-section__input basic-data-section__select"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="">Оберіть категорію</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </SectionCard>
  )
}
