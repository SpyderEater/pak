import { useState, useEffect } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './PriceFilter.css'

export default function PriceFilter({ name, searchParams, setSearchParams }) {
  const MIN_LIMIT = 0
  const MAX_LIMIT = 50000

  const initialMin = Number(searchParams.get('minPrice')) || MIN_LIMIT
  const initialMax = Number(searchParams.get('maxPrice')) || MAX_LIMIT

  const [localValues, setLocalValues] = useState([initialMin, initialMax])

  const [isOpen, setIsOpen] = useState(searchParams.has('minPrice') || searchParams.has('maxPrice'))

  useEffect(() => {
    setLocalValues([
      Number(searchParams.get('minPrice')) || MIN_LIMIT,
      Number(searchParams.get('maxPrice')) || MAX_LIMIT,
    ])
  }, [searchParams])

  const applyFilter = (newValues) => {
    const newParams = new URLSearchParams(searchParams)

    if (newValues[0] > MIN_LIMIT) newParams.set('minPrice', newValues[0])
    else newParams.delete('minPrice')

    if (newValues[1] < MAX_LIMIT) newParams.set('maxPrice', newValues[1])
    else newParams.delete('maxPrice')

    setSearchParams(newParams, { preventScrollReset: true })
  }

  const handleSliderChange = (values) => setLocalValues(values)
  const handleSliderAfterChange = (values) => applyFilter(values)

  const handleInputChange = (index, value) => {
    const newValues = [...localValues]
    newValues[index] = value === '' ? '' : Number(value)
    setLocalValues(newValues)
  }

  const handleInputBlur = () => {
    let min = Number(localValues[0]) || MIN_LIMIT
    let max = Number(localValues[1]) || MAX_LIMIT

    if (min > max) [min, max] = [max, min]
    if (min < MIN_LIMIT) min = MIN_LIMIT
    if (max > MAX_LIMIT) max = MAX_LIMIT

    const validatedValues = [min, max]
    setLocalValues(validatedValues)
    applyFilter(validatedValues)
  }

  return (
    <details
      className="Filters-item price-filter"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary className="Filters-item-name">{name}</summary>

      <div className="PriceFilter-wrapper">
        <div className="PriceFilter-inputs-container">
          <div className="PriceFilter-input-group">
            <label className="PriceFilter-label">Від</label>
            <input
              type="number"
              className="PriceFilter-input"
              value={localValues[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              onBlur={handleInputBlur}
            />
          </div>

          <div className="PriceFilter-input-group">
            <label className="PriceFilter-label right">До</label>
            <input
              type="number"
              className="PriceFilter-input right"
              value={localValues[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              onBlur={handleInputBlur}
            />
          </div>
        </div>

        <Slider
          range
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={10}
          value={localValues}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          trackStyle={[{ backgroundColor: '#b5cc18' }]}
          handleStyle={[{ borderColor: '#b5cc18' }, { borderColor: '#b5cc18' }]}
        />
      </div>
    </details>
  )
}
