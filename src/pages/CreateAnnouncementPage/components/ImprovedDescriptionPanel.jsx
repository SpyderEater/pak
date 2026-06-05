import MoreButton from '../../../components/MoreButton/MoreButton.jsx'
import './ImprovedDescriptionPanel.css'

export default function ImprovedDescriptionPanel({
  initialDescription,
  improvedDescription,
  manufacturerDescription,
  onBack,
  onChoose,
}) {
  return (
    <div className="improved-description">
      <div className="improved-description__column">
        <h3 className="improved-description__label">Початковий:</h3>
        <textarea className="improved-description__textarea" value={initialDescription} readOnly />
      </div>

      <div className="improved-description__results">
        <div className="improved-description__column">
          <h3 className="improved-description__label">Покращений опис:</h3>
          <div className="improved-description__box">{improvedDescription}</div>
        </div>

        <div className="improved-description__column">
          <h3 className="improved-description__label">Додавання характеристики від виробника:</h3>
          <div className="improved-description__box">{manufacturerDescription}</div>
        </div>
      </div>

      <div className="improved-description__actions">
        <MoreButton className="improved-description__button" onClick={onBack}>
          Повернутись до свого
        </MoreButton>

        <MoreButton className="improved-description__button" onClick={onChoose}>
          Обрати
        </MoreButton>
      </div>
    </div>
  )
}
