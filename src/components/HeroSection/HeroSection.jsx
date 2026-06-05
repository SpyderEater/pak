import './HeroSection.css'

function HeroSection({ title, description, buttonText }) {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__left">
          <h1 className="hero__title">{title}</h1>
        </div>

        <div className="hero__right">
          <p className="hero__description">{description}</p>
          <button className="hero__button">{buttonText} →</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
