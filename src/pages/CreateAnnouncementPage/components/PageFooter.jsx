import './PageFooter.css'

export default function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="page-footer__inner">
        <div className="page-footer__brand">пакет добра</div>
        <div className="page-footer__cols">
          <div>
            <h4>Меню</h4>
            <p>Про нас</p>
            <p>Збори</p>
            <p>Статистика</p>
          </div>
          <div>
            <h4>Сервіс</h4>
            <p>Рекламні умови</p>
            <p>Правила співпраці</p>
          </div>
          <div>
            <h4>Інше</h4>
            <p>FAQ</p>
            <p>Підтримка</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
