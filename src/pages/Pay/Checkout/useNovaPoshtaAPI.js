import { useState, useCallback } from 'react'

const NP_URL = 'https://api.novaposhta.ua/v2.0/json/'
const API_KEY = import.meta.env.VITE_NP_API_KEY

const npRequest = async (modelName, calledMethod, methodProperties = {}) => {
  const res = await fetch(NP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    }),
  })
  const data = await res.json()
  return data.data || []
}

export const useNovaPoshtaAPI = () => {
  const [cities, setCities] = useState([])
  const [branches, setBranches] = useState([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingBranches, setLoadingBranches] = useState(false)

  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) return
    setLoadingCities(true)
    try {
      const data = await npRequest('Address', 'searchSettlements', {
        CityName: query,
        Limit: 10,
      })
      const list = data[0]?.Addresses || []
      setCities(list)
    } finally {
      setLoadingCities(false)
    }
  }, [])

  const fetchBranches = useCallback(async (cityRef) => {
    if (!cityRef) return
    setLoadingBranches(true)
    try {
      const data = await npRequest('AddressGeneral', 'getWarehouses', {
        CityRef: cityRef,
        Limit: 100,
      })
      setBranches(data)
    } finally {
      setLoadingBranches(false)
    }
  }, [])

  return { cities, branches, loadingCities, loadingBranches, searchCities, fetchBranches }
}
