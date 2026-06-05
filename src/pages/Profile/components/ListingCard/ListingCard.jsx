import { useEffect, useState } from 'react'
import './ListingCard.css'

export default function ListingCard({
  imageSrc,
  imageAlt,
  imagePlaceholder = false,
  title,
  subtitle,
  priceText,
  muted = false,
  imageMuted = false,
  showMessageAction = false,
  showDeleteAction = false,
  primaryActionLabel,
  actionsDisabled = false,
  messageIcon,
  deleteIcon,
  messageActionAriaLabel = 'Повідомлення',
  deleteActionAriaLabel = 'Видалити',
}) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false)

  useEffect(() => {
    setImageLoadFailed(false)
  }, [imageSrc])

  const textToneClassName = muted ? 'listing-card__text--muted' : 'listing-card__text--default'
  const stateClassName = muted ? 'listing-card--muted' : 'listing-card--active'
  const imageClassName = imageMuted
    ? 'listing-card__image listing-card__image--muted'
    : 'listing-card__image'
  const shouldShowPlaceholder = imagePlaceholder || !imageSrc || imageLoadFailed

  return (
    <article className={`listing-card ${stateClassName}`}>
      <div className="listing-card__left">
        <div className="listing-card__media">
          {shouldShowPlaceholder ? (
            <div className="listing-card__image-placeholder" aria-hidden="true"></div>
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className={imageClassName}
              onError={() => setImageLoadFailed(true)}
            />
          )}
        </div>

        <div className="listing-card__details">
          <h4 className={`listing-card__title ${textToneClassName}`}>{title}</h4>
          {subtitle ? (
            <p className={`listing-card__subtitle ${textToneClassName}`}>{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="listing-card__right">
        <p className={`listing-card__price ${textToneClassName}`}>{priceText}</p>

        <div className="listing-card__actions">
          {showMessageAction && messageIcon ? (
            <button
              type="button"
              className="listing-card__icon-button listing-card__icon-button--message"
              aria-label={messageActionAriaLabel}
              disabled={actionsDisabled}
            >
              <span className="listing-card__icon" aria-hidden="true">
                {messageIcon}
              </span>
            </button>
          ) : null}

          {showDeleteAction && deleteIcon ? (
            <button
              type="button"
              className="listing-card__icon-button listing-card__icon-button--delete"
              aria-label={deleteActionAriaLabel}
              disabled={actionsDisabled}
            >
              <span className="listing-card__icon" aria-hidden="true">
                {deleteIcon}
              </span>
            </button>
          ) : null}

          {primaryActionLabel ? (
            <button
              type="button"
              className="listing-card__primary-button"
              disabled={actionsDisabled}
            >
              {primaryActionLabel}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
