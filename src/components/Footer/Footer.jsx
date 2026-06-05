import './Footer.css'
import { Link } from 'react-router'
import LogoWhiteIcon from '../../assets/images/logo.svg?react'
import FacebookIcon from '../../assets/images/facebook_logo.svg?react'
import InstagramIcon from '../../assets/images/instagram_logo.svg?react'
import YoutubeIcon from '../../assets/images/youtube_logo.svg?react'

export default function Footer(props) {
  return (
    <footer className="Footer-wrapper">
      <div className="Footer-top">
        <section className="Footer-top-logo">
          <Link to="/">
            <LogoWhiteIcon className="Footer-logo-img" aria-label="logo" />
          </Link>

          <p className="Footer-moto">Підтримуй добро купуй та змінюй!</p>
          <div className="Footer-social-media-wrapper">
            <a
              className="Footer-social-media-item"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon
                className="Footer-social-media-img Footer-facebook"
                aria-label="facebook"
              />
            </a>
            <a
              className="Footer-social-media-item"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon
                className="Footer-social-media-img Footer-instagram"
                aria-label="instagram"
              />
            </a>
            <a
              className="Footer-social-media-item"
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon
                className="Footer-social-media-img Footer-youtube"
                aria-label="youtube"
              />
            </a>
          </div>
        </section>

        <section className="Footer-top-menu">
          <h4 className="Footer-top-menu-heading Footer-heading">Меню</h4>
          <ul className="Footer-top-menu-list">
            <li className="Footer-top-menu-item">
              <Link className="Footer-top-menu-item-link" to="/">
                Про нас
              </Link>
            </li>
            <li className="Footer-top-menu-item">
              <Link className="Footer-top-menu-item-link" to="/donations">
                Збори
              </Link>
            </li>
            <li className="Footer-top-menu-item">
              <Link className="Footer-top-menu-item-link" to="/statistics">
                Статистика
              </Link>
            </li>
            <li className="Footer-top-menu-item">
              <Link className="Footer-top-menu-item-link" to="/">
                Блог
              </Link>
            </li>
            <li className="Footer-top-menu-item">
              <Link className="Footer-top-menu-item-link" to="/profile">
                Профіль
              </Link>
            </li>
          </ul>
        </section>

        <section className="Footer-top-service">
          <h4 className="Footer-top-service-heading Footer-heading">Сервіс</h4>
          <ul className="Footer-top-service-list">
            <li className="Footer-top-service-item">
              <Link className="Footer-top-service-item-link" to="/">
                Рекламні умови
              </Link>
            </li>
            <li className="Footer-top-service-item">
              <Link className="Footer-top-service-item-link" to="/">
                Правила співпраці
              </Link>
            </li>
            <li className="Footer-top-service-item">
              <Link className="Footer-top-service-item-link" to="/">
                Для преси
              </Link>
            </li>
          </ul>
        </section>

        <section className="Footer-top-other">
          <h4 className="Footer-top-other-heading Footer-heading">Інше</h4>
          <ul className="Footer-top-other-list">
            <li className="Footer-top-other-item">
              <Link className="Footer-top-other-item-link" to="/">
                FAQ
              </Link>
            </li>
            <li className="Footer-top-other-item">
              <Link className="Footer-top-other-item-link" to="/">
                Підтримка
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <ul className="Footer-bottom">
        <li className="Footer-bottom-item Footer-bottom-copyright">Copyright © 2025</li>
        <li className="Footer-bottom-item">
          <Link className="Footer-bottom-item-link" to="/">
            Умови користування
          </Link>
        </li>
        <li className="Footer-bottom-item">
          <Link className="Footer-bottom-item-link" to="/">
            Політика конфіденційності
          </Link>
        </li>
        <li className="Footer-bottom-item">
          <Link className="Footer-bottom-item-link" to="/">
            Правила безпеки
          </Link>
        </li>
      </ul>
    </footer>
  )
}
