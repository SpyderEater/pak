import { useId, useRef } from 'react'
import SectionCard from './SectionCard.jsx'
import './PhotoSection.css'

function trimTrailingEmpty(items) {
  const next = [...items]
  while (next.length > 0 && !next[next.length - 1]) {
    next.pop()
  }
  return next
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Не вдалося прочитати файл'))
    reader.readAsDataURL(file)
  })
}

export default function PhotoSection({ images = [], onImagesChange }) {
  const inputRef = useRef(null)
  const inputId = useId()
  const activeSlotRef = useRef(0)

  function openFilePicker(slotIndex) {
    activeSlotRef.current = slotIndex
    inputRef.current?.click()
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageDataUrl = await readFileAsDataUrl(file)
      const nextImages = [...images]
      nextImages[activeSlotRef.current] = imageDataUrl
      onImagesChange?.(trimTrailingEmpty(nextImages))
    } catch (error) {
      console.error('Failed to process image file:', error)
    } finally {
      event.target.value = ''
    }
  }

  function handleRemoveImage(slotIndex) {
    const nextImages = [...images]
    nextImages[slotIndex] = null
    onImagesChange?.(trimTrailingEmpty(nextImages))
  }

  return (
    <SectionCard
      title="Додайте фото"
      className="photo-section"
      titleClassName="photo-section__title"
      bodyClassName="photo-section__body"
    >
      <p className="photo-section__hint">Зверніть увагу, що перше фото слугуватиме окладинкою</p>
      <input
        id={inputId}
        ref={inputRef}
        className="photo-section__input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="photo-section__grid">
        {[0, 1, 2, 3].map((slotIndex) => {
          const imageSrc = images[slotIndex]

          return (
            <div key={slotIndex} className="photo-section__slot-wrapper">
              <button
                type="button"
                className="photo-section__slot"
                aria-label={
                  imageSrc ? `Змінити фото ${slotIndex + 1}` : `Додати фото ${slotIndex + 1}`
                }
                onClick={() => openFilePicker(slotIndex)}
              >
                {imageSrc ? (
                  <img
                    className="photo-section__preview"
                    src={imageSrc}
                    alt={`Фото товару ${slotIndex + 1}`}
                  />
                ) : (
                  <span className="photo-section__plus">+</span>
                )}
              </button>

              {imageSrc ? (
                <button
                  type="button"
                  className="photo-section__remove"
                  aria-label={`Видалити фото ${slotIndex + 1}`}
                  onClick={() => handleRemoveImage(slotIndex)}
                >
                  ×
                </button>
              ) : null}
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
