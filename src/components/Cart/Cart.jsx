import { useNavigate } from 'react-router'
import { useEffect, useRef } from 'react'
import { useCart } from '/src/contexts/CartContext'
import './Cart.css'

const TrashIcon = () => (
  <svg width="15" height="17" viewBox="0 0 18 20" fill="none">
    <path
      d="M1 4.5h16M6 4.5V3a1 1 0 011-1h4a1 1 0 011 1v1.5M7 9v6M11 9v6M2.5 4.5l1 13a1 1 0 001 .9h9a1 1 0 001-.9l1-13"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Cart({ onClose, onCheckout }) {
  const { items, removeItem } = useCart()
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const total = items.reduce((sum, i) => sum + i.price + i.donation, 0)

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest('[aria-label="Кошик"]')
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div className="cart-dropdown" ref={dropdownRef}>
      <div className="cart-header">
        <span className="cart-title">У вашій корзині:</span>
        <button className="cart-close" onClick={onClose} aria-label="Закрити">
          ✕
        </button>
      </div>

      <div className="cart-items">
        {items.length === 0 && <p className="cart-empty">Кошик порожній</p>}
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item__row">
              <div className="cart-item__thumb">
                {item.image ? <img src={item.image} alt={item.name} /> : '📦'}
              </div>
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <div className="cart-item__pricing">
                  <span className="cart-item__price">{item.price} грн</span>
                  <span className="cart-item__donation">+{item.donation} грн</span>
                </div>
              </div>
              <button
                className="cart-item__del"
                onClick={() => removeItem(item.id)}
                aria-label="Видалити"
              >
                <TrashIcon />
              </button>
            </div>
            {item.note && <p className="cart-item__note">{item.note}</p>}
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span className="cart-total__label">Сума до сплати:</span>
          <span className="cart-total__value">{total} грн</span>
        </div>
        <button
          className="cart-checkout"
          disabled={items.length === 0}
          onClick={() => {
            onClose()
            onCheckout?.()
            navigate('/checkout')
          }}
        >
          Оформити замовлення
        </button>
      </div>
    </div>
  )
}
