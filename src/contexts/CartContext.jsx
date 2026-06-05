import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev // не дублювати
      return [...prev, product]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>{children}</CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
