import './BasketButton.css'
import BasketIcon from '../../assets/images/cart_icon.svg?react'

export default function BasketButton(props) {
  return (
    <button className="BasketButton-button" {...props}>
      <BasketIcon className="BasketButton-img" aria-label="basket-icon" />
    </button>
  )
}
