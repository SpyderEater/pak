import './CampaignCard.css'

function CampaignCard({ title, category, foundation, collected, goal, image }) {
  const numericGoal = typeof goal === 'number' ? goal : null
  const progressPercent = numericGoal ? Math.min((collected / numericGoal) * 100, 100) : 65

  return (
    <article className="campaign-card">
      <div className="campaign-card__image-wrapper">
        <img className="campaign-card__image" src={image} alt={title} draggable="false" />
      </div>

      <div className="campaign-card__content">
        <span className="campaign-card__tag">{category}</span>

        <a href="#" onClick={(e) => e.preventDefault()} className="campaign-card__title">
          {title}
        </a>

        <a href="#" onClick={(e) => e.preventDefault()} className="campaign-card__foundation">
          {foundation}
        </a>

        <div className="campaign-card__stats">
          <div>
            <span>Зібрано:</span>
            <strong>{collected.toLocaleString('uk-UA')}$</strong>
          </div>

          <div>
            <span>Ціль:</span>
            <strong>{typeof goal === 'number' ? `${goal.toLocaleString('uk-UA')}$` : goal}</strong>
          </div>
        </div>

        <div className="campaign-card__progress">
          <div className="campaign-card__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </article>
  )
}

export default CampaignCard
