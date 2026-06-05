import { useState } from 'react'
import './FilterItem.css'
import PriceFilter from '/src/pages/Catalog/components/PriceFilter/PriceFilter.jsx'

export default function FilterItem(props) {
  // props
  /* 
     name
     filterKey 
     type    
     onChange
     options
     searchParams
*/

  const activeValues = props.searchParams ? props.searchParams.getAll(props.filterKey) : []

  const [isOpen, setIsOpen] = useState(activeValues.length > 0)

  if (props.type === 'checkbox-list') {
    return (
      <details className="Filters-item" open={isOpen}>
        <summary className="Filters-item-name">{props.name}</summary>
        <div className="filters-options-wrapper">
          {Object.entries(props.options).map((option) => {
            // console.log(
            //   activeValues +
            //     ": " +
            //     props.filterKey +
            //     " " +
            //     props.name +
            //     " | " +
            //     option[0] +
            //     " = " +
            //     activeValues.includes(option[0]),
            // );
            // console.log(option[0]);
            return (
              <div key={option[0]}>
                <label>
                  <input
                    className="filter-checkbox"
                    type="checkbox"
                    name={option[0]}
                    onChange={props.onChange}
                    // checked={activeValues.includes(option[0]) || false}
                    checked={activeValues.includes(option[0])}
                  />
                  <span className="filter-text">{option[1]}</span>
                </label>
              </div>
            )
          })}
        </div>
      </details>
    )
  }
  if (props.type === 'price-range') {
    return (
      <PriceFilter
        name={props.name}
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
      />
    )
  }

  return null
}
