import { useState, useRef, useEffect } from 'react'
import './FiltersBar.css'
import ArrowDownIcon from '../../../../assets/images/triangle_down.svg?react'

function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const selectedOption = options?.find((opt) => opt.value === value) || options?.[0]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select__control" onClick={() => setIsOpen(!isOpen)}>
        <span className="custom-select__value">{selectedOption?.label}</span>
        <ArrowDownIcon className={`custom-select__arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="custom-select__menu">
          {options?.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${option.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FiltersBar({
  typeOptions,
  statusOptions,
  organizationOptions,
  filters,
  onFilterChange,
  onApply,
  onReset,
}) {
  return (
    <div className="filters-bar">
      <div className="filters-bar__left">
        <CustomSelect
          options={typeOptions}
          value={filters.category}
          onChange={(val) => onFilterChange('category', val)}
        />
        <CustomSelect
          options={statusOptions}
          value={filters.status}
          onChange={(val) => onFilterChange('status', val)}
        />
        <CustomSelect
          options={organizationOptions}
          value={filters.foundation}
          onChange={(val) => onFilterChange('foundation', val)}
        />
      </div>

      <div className="filters-bar__right">
        <button
          className="filters-bar__button filters-bar__button--secondary"
          type="button"
          onClick={onReset}
        >
          Скинути
        </button>

        <button
          className="filters-bar__button filters-bar__button--primary"
          type="button"
          onClick={onApply}
        >
          Застосувати
        </button>
      </div>
    </div>
  )
}

export default FiltersBar
