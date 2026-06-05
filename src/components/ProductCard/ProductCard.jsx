import './ProductCard.css'

import MoreButton from '/src/components/MoreButton/MoreButton.jsx'
import BasketButton from '/src/components/BasketButton/BasketButton.jsx'

import { useNavigate } from 'react-router'
import { useCart } from '/src/contexts/CartContext'
import { useOutletContext } from 'react-router'

import floatToCurrency from '/src/helpers/floatToCurrency.js'
import urlToFileName from '/src/helpers/urlToFileName.js'
import DonationPercent from '/src/components/DonationPercent/DonationPercent.jsx'

export default function ProductCard(props) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { handleCartOpen } = useOutletContext()

  const productPriceAddPercent = 10 ** Math.floor(props.price / 100).toString().length

  const handleAddToCart = () => {
    addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      donation: productPriceAddPercent,
      image: props.imgUrl,
      note:
        props.linkedCampaignId === null
          ? '*При оформленні оберіть фонд на який піде донат.'
          : null,
    })
    handleCartOpen()
  }



  const goToProduct = () => navigate(`/catalog/${props.category}/${props.id}`)
  return (
    <div className="ProductCard-container">
      {/* <ProductInfo
        imgUrl={props.imgUrl}
        name={props.name}
        price={props.price}
        alt={props.alt}
        percentNumber={props.percentNumber}
      ></ProductInfo> */}
      <div className="ProductInfo-wrapper">
        <div className="ProductInfo-img-wrapper">
          <img
            className="ProductInfo-img"
            src={props.imgUrl}
            alt={props.alt ? props.alt : urlToFileName(props.imgUrl)}
          />
          <DonationPercent percentNumber={props.percentNumber}></DonationPercent>
        </div>
        <section className="ProductInfo-section">
          <p className="ProductInfo-name">{props.name}</p>
          <p className="ProductInfo-price">Від {floatToCurrency(props.price)} грн</p>
        </section>
      </div>
      <div className="ProductCard-buttons">
        <MoreButton
          style={{
            boxSizing: 'border-box',
            maxWidth: '200px',
            width: '100%',
          }}
          onClick={goToProduct}
        >
          Детальніше
        </MoreButton>
        <BasketButton onClick={handleAddToCart}/>
      </div>
    </div>
  )
}
