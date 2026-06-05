function getValueByPath(item, field) {
  return field.split('.').reduce((currentValue, key) => currentValue?.[key], item)
}

export function getUniqueFieldValues(items, field) {
  return [...new Set(items.map((item) => getValueByPath(item, field)).filter(Boolean))]
}

export function filterByFields(items, filters, skipValue = 'all') {
  return items.filter((item) =>
    filters.every(({ field, value }) => {
      if (value === skipValue || value === '' || value == null) {
        return true
      }

      return getValueByPath(item, field) === value
    }),
  )
}
