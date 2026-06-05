import { useState } from 'react'

import SectionCard from './SectionCard.jsx'
import MoreButton from '../../../components/MoreButton/MoreButton.jsx'
import vectorIcon from '../../../assets/images/Vector.svg'
import './DescriptionSection.css'
import { getRandomAiDescription } from '../../../services/aiDescriptions'

export default function DescriptionSection({ description, onDescriptionChange }) {
  const [descriptionMode, setDescriptionMode] = useState('default')
  const [ownDescription, setOwnDescription] = useState('')
  const [aiDescription, setAiDescription] = useState('')
  const [manufacturerDescription, setManufacturerDescription] = useState('')
  const [selectedDescriptionType, setSelectedDescriptionType] = useState('ai')

  function handleChooseAi() {
    if (selectedDescriptionType === 'ai') {
      onDescriptionChange(aiDescription)
    } else {
      onDescriptionChange(manufacturerDescription)
    }

    setDescriptionMode('chosen')
  }

  function handleBackToOwn() {
    onDescriptionChange(ownDescription)
    setDescriptionMode('default')
  }

  function handleEditAi() {
    setDescriptionMode('default')
  }
  async function handleImprove() {
    setOwnDescription(description)
    setSelectedDescriptionType('ai')

    try {
      const randomDescription = await getRandomAiDescription()

      setAiDescription(randomDescription.improvedDescription)
      setManufacturerDescription(randomDescription.manufacturerDescription)
      setDescriptionMode('choosing')
    } catch (error) {
      console.error('Failed to load AI description:', error)
    }
  }

  return (
    <SectionCard
      title="Додайте опис"
      className="description-section"
      titleClassName="description-section__title"
      bodyClassName="description-section__body"
    >
      {descriptionMode === 'default' && (
        <div className="description-section__stack">
          <textarea
            className="description-section__textarea"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Як найвлучніше опишіть свій товар"
          />

          <MoreButton className="description-section__improve" onClick={handleImprove}>
            Покращити
            <img
              src={vectorIcon}
              alt=""
              aria-hidden="true"
              className="description-section__improve-icon"
            />
          </MoreButton>
        </div>
      )}

      {descriptionMode === 'choosing' && (
        <div className="description-section__ai">
          <div className="description-section__ai-column">
            <p className="description-section__label">Початковий:</p>

            <textarea className="description-section__textarea" value={ownDescription} readOnly />
          </div>

          <div className="description-section__ai-row">
            <div className="description-section__ai-column">
              <p className="description-section__label">Покращений опис:</p>
              <textarea
                className={`description-section__result ${
                  selectedDescriptionType === 'ai' ? 'description-section__result--selected' : ''
                }`}
                value={aiDescription}
                readOnly
                onClick={() => setSelectedDescriptionType('ai')}
              />
            </div>

            <div className="description-section__ai-column">
              <p className="description-section__label">Додавання характеристики від виробника:</p>
              <textarea
                className={`description-section__result ${
                  selectedDescriptionType === 'manufacturer'
                    ? 'description-section__result--selected'
                    : ''
                }`}
                value={manufacturerDescription}
                readOnly
                onClick={() => setSelectedDescriptionType('manufacturer')}
              />
            </div>
          </div>

          <div className="description-section__actions">
            <MoreButton className="description-section__improve" onClick={handleBackToOwn}>
              Повернутись до свого
            </MoreButton>

            <MoreButton className="description-section__improve" onClick={handleChooseAi}>
              Обрати
            </MoreButton>
          </div>
        </div>
      )}

      {descriptionMode === 'chosen' && (
        <div className="description-section__stack">
          <textarea className="description-section__textarea" value={description} readOnly />

          <div className="description-section__actions">
            <MoreButton className="description-section__improve" onClick={handleEditAi}>
              Редагувати
              <img
                src={vectorIcon}
                alt=""
                aria-hidden="true"
                className="description-section__improve-icon"
              />
            </MoreButton>

            <MoreButton className="description-section__improve" onClick={handleBackToOwn}>
              Повернутись до свого
            </MoreButton>
          </div>
        </div>
      )}
    </SectionCard>
  )
}
