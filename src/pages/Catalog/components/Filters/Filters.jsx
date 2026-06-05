import './Filters.css'
import FilterItem from '../FilterItem/FilterItem.jsx'

export default function Filters(props) {
  const onFilterChange = (filterName) => (event) => {
    let updatedSearchParams
    if (event.target.checked) {
      updatedSearchParams = [...props.searchParams.getAll(filterName), event.target.name]
    } else {
      updatedSearchParams = [...props.searchParams.getAll(filterName)].filter(
        (val) => val !== event.target.name,
      )
    }
    const newParams = new URLSearchParams(props.searchParams)

    newParams.delete(filterName)

    updatedSearchParams.forEach((val) => {
      newParams.append(filterName, val)
    })

    props.setSearchParams(newParams)
  }

  return (
    <section className="Filters-wrapper">
      <h4 className="Filters-heading">Фільтри</h4>
      <form className="Filters-form">
        <FilterItem
          name="Категорія товарів"
          filterKey="type"
          type="checkbox-list"
          onChange={onFilterChange('type')}
          options={{
            clothes: 'Одяг',
            equipment: 'Спорядження',
            other: 'Інше',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Тип послуг"
          filterKey="serviceType"
          type="checkbox-list"
          onChange={onFilterChange('serviceType')}
          options={{
            consultation: 'Консультація',
            training: 'Тренування',
            other: 'Інше', // The new "Other" option
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Розмір донату"
          type="price-range"
          searchParams={props.searchParams}
          setSearchParams={props.setSearchParams}
        />

        <FilterItem
          name="%, який піде на донат"
          filterKey="donationPercentage"
          type="checkbox-list"
          onChange={onFilterChange('donationPercentage')}
          options={{
            100: '100%',
            75: '75%',
            50: '50%',
            25: '25%',
            15: '15%',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Стан товару"
          filterKey="condition"
          type="checkbox-list"
          onChange={onFilterChange('condition')}
          options={{
            new: 'Нове',
            used: 'Вживане',
            restored: 'Відновлене',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Завершення збору"
          filterKey="campaignStatus"
          type="checkbox-list"
          onChange={onFilterChange('campaignStatus')}
          options={{
            active: 'Активні',
            closed: 'Завершені',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Тип проєкту"
          filterKey="projectType"
          type="checkbox-list"
          onChange={onFilterChange('projectType')}
          options={{
            tech: 'Технічне забезпечення',
            medicine: 'Медицина',
            transport: 'Транспорт',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Організація"
          filterKey="organization"
          type="checkbox-list"
          onChange={onFilterChange('organization')}
          options={{
            savelife: 'Повернись живим',
            prytula: 'Фонд Притули',
            dobrisertsya: 'Добрі Серця', // Updated English key for clarity
            none: 'Без фонду',
          }}
          searchParams={props.searchParams}
        />

        <FilterItem
          name="Регіон"
          filterKey="region"
          type="checkbox-list"
          onChange={onFilterChange('region')}
          options={{
            online: 'Онлайн',
            kyiv: 'Київ',
            lviv: 'Львів',
            odesa: 'Одеса',
            other: 'Інше місто',
          }}
          searchParams={props.searchParams}
        />
      </form>
    </section>
  )
}
