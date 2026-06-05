import './SectionCard.css'

export default function SectionCard({
  title,
  children,
  className = '',
  titleClassName = '',
  bodyClassName = '',
}) {
  const sectionClass = `section-card ${className}`.trim()
  const titleClass = `section-card__title ${titleClassName}`.trim()
  const bodyClass = `section-card__body ${bodyClassName}`.trim()

  return (
    <section className={sectionClass}>
      {title ? <h2 className={titleClass}>{title}</h2> : null}
      <div className={bodyClass}>{children}</div>
    </section>
  )
}
