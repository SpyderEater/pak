import './PixelHeart.css'

const heartLayouts = {
  hero: [
    [
      { start: 2, tone: 'light' },
      { start: 6, tone: 'light' },
    ],
    [
      { start: 1, tone: 'pale' },
      { start: 2, tone: 'light' },
      { start: 3, tone: 'light' },
      { start: 5, tone: 'mid' },
      { start: 6, tone: 'light' },
      { start: 7, tone: 'light' },
    ],
    [
      { start: 0, tone: 'pale' },
      { start: 1, tone: 'pale' },
      { start: 2, tone: 'light' },
      { start: 3, tone: 'mid' },
      { start: 4, tone: 'light' },
      { start: 5, tone: 'mid' },
      { start: 6, tone: 'light' },
      { start: 7, tone: 'light' },
      { start: 8, tone: 'pale' },
    ],
    [
      { start: 1, tone: 'pale' },
      { start: 2, tone: 'light' },
      { start: 3, tone: 'light' },
      { start: 4, tone: 'mid' },
      { start: 5, tone: 'light' },
      { start: 6, tone: 'dark' },
      { start: 7, tone: 'dark' },
    ],
    [
      { start: 2, tone: 'light' },
      { start: 3, tone: 'light' },
      { start: 4, tone: 'mid' },
      { start: 5, tone: 'dark' },
      { start: 6, tone: 'dark' },
    ],
    [
      { start: 3, tone: 'light' },
      { start: 4, tone: 'dark' },
      { start: 5, tone: 'dark' },
    ],
    [{ start: 4, tone: 'dark' }],
  ],
  success: [
    [
      { start: 1, tone: 'mid' },
      { start: 2, tone: 'mid' },
      { start: 5, tone: 'mid' },
      { start: 6, tone: 'dark' },
      { start: 7, tone: 'dark' },
    ],
    [
      { start: 0, tone: 'pale' },
      { start: 1, tone: 'pale' },
      { start: 6, tone: 'dark' },
      { start: 7, tone: 'dark' },
      { start: 8, tone: 'pale' },
    ],
    [
      { start: 1, tone: 'pale' },
      { start: 7, tone: 'pale' },
    ],
    [
      { start: 3, tone: 'pale' },
      { start: 4, tone: 'pale' },
      { start: 5, tone: 'pale' },
    ],
    [{ start: 4, tone: 'pale' }],
  ],
  impact: [
    [
      { start: 2, tone: 'mid' },
      { start: 6, tone: 'mid' },
    ],
    [
      { start: 1, tone: 'mid' },
      { start: 2, tone: 'light' },
      { start: 3, tone: 'mid' },
      { start: 5, tone: 'light' },
      { start: 6, tone: 'mid' },
      { start: 7, tone: 'light' },
    ],
    [
      { start: 0, tone: 'mid' },
      { start: 1, tone: 'light' },
      { start: 2, tone: 'mid' },
      { start: 3, tone: 'light' },
      { start: 4, tone: 'mid' },
      { start: 5, tone: 'light' },
      { start: 6, tone: 'mid' },
      { start: 7, tone: 'light' },
      { start: 8, tone: 'mid' },
    ],
    [
      { start: 1, tone: 'light' },
      { start: 2, tone: 'mid' },
      { start: 3, tone: 'light' },
      { start: 4, tone: 'mid' },
      { start: 5, tone: 'light' },
      { start: 6, tone: 'mid' },
      { start: 7, tone: 'light' },
    ],
    [
      { start: 2, tone: 'mid' },
      { start: 3, tone: 'light' },
      { start: 4, tone: 'mid' },
      { start: 5, tone: 'light' },
      { start: 6, tone: 'mid' },
    ],
    [
      { start: 3, tone: 'mid' },
      { start: 4, tone: 'light' },
      { start: 5, tone: 'mid' },
    ],
    [{ start: 4, tone: 'mid' }],
  ],
}

export default function PixelHeart({ className = '', variant = 'hero' }) {
  const componentClassName = ['pixel-heart', className].filter(Boolean).join(' ')
  if (variant === 'hero-figma') {
    return (
      <div className={`${componentClassName} pixel-heart--hero-figma`.trim()} aria-hidden="true">
        <svg
          className="pixel-heart__figure-svg"
          fill="none"
          viewBox="0 0 1331 999"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#hero-figma-shadow)">
            <path
              d="M444.36 -29.3398V116.614H298.406V-29.3398H444.36Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M1032.17 -29.3398V116.614H886.221V-29.3398H1032.17Z"
              fill="#E8EFA4"
              stroke="white"
            />
            <path
              d="M297.409 117.612V263.566H151.455V117.612H297.409Z"
              fill="#F0F4C2"
              stroke="white"
            />
            <path
              d="M444.36 117.612V263.566H298.406V117.612H444.36Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M297.409 411.521V557.476H151.455V411.521H297.409Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M1179.13 411.521V557.476H1033.18V411.521H1179.13Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M1179.13 264.566V410.521H1033.18V264.566H1179.13Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M1326.08 264.566V410.521H1180.13V264.566H1326.08Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M297.409 264.566V410.521H151.455V264.566H297.409Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M444.36 264.566V410.521H298.406V264.566H444.36Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M591.315 264.566V410.521H445.361V264.566H591.315Z"
              fill="#F0F4C2"
              stroke="white"
            />
            <path
              d="M444.36 411.521V557.476H298.406V411.521H444.36Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M591.315 411.521V557.476H445.361V411.521H591.315Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M738.269 411.521V557.476H592.314V411.521H738.269Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M738.269 558.475V704.429H592.314V558.475H738.269Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M885.222 558.475V704.429H739.268V558.475H885.222Z"
              fill="#2B3A00"
              stroke="white"
            />
            <path
              d="M738.269 705.428V851.382H592.314V705.428H738.269Z"
              fill="#D7E361"
              stroke="white"
            />
            <path
              d="M591.315 558.475V704.429H445.361V558.475H591.315Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path d="M150.454 264.566V410.521H4.5V264.566H150.454Z" fill="#F0F4C2" stroke="white" />
            <path
              d="M1032.17 558.475V704.429H886.221V558.475H1032.17Z"
              fill="#2B3A00"
              stroke="white"
            />
            <path
              d="M884.425 704.632V850.586H738.471V704.632H884.425Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M738.269 852.383V998.337H592.314V852.383H738.269Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M591.315 705.428V851.382H445.361V705.428H591.315Z"
              fill="#D7E361"
              stroke="white"
            />
            <path
              d="M444.36 558.475V704.429H298.406V558.475H444.36Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M591.315 117.611V263.565H445.361V117.611H591.315Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M738.269 264.566V410.521H592.314V264.566H738.269Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M885.222 117.611V263.565H739.268V117.611H885.222Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M1179.13 117.611V263.565H1033.18V117.611H1179.13Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M1032.17 117.611V263.565H886.221V117.611H1032.17Z"
              fill="#717B54"
              stroke="white"
            />
            <path
              d="M1032.17 264.566V410.521H886.221V264.566H1032.17Z"
              fill="#F0F4C2"
              stroke="white"
            />
            <path
              d="M1032.17 411.521V557.476H886.221V411.521H1032.17Z"
              fill="#DEE87A"
              stroke="white"
            />
            <path
              d="M885.222 411.521V557.476H739.268V411.521H885.222Z"
              fill="#FAFCEB"
              stroke="white"
            />
            <path
              d="M885.222 264.566V410.521H739.268V264.566H885.222Z"
              fill="#717B54"
              stroke="white"
            />
          </g>
          <defs>
            <filter
              id="hero-figma-shadow"
              x="0"
              y="-29.8398"
              width="1330.58"
              height="1036.68"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    )
  }

  const heartRows = heartLayouts[variant] ?? heartLayouts.hero
  const columns = heartRows.reduce(
    (maxColumns, row) => Math.max(maxColumns, ...row.map((square) => square.start + 1)),
    0,
  )

  return (
    <div
      className={componentClassName}
      aria-hidden="true"
      style={{ '--heart-column-count': columns }}
    >
      {heartRows.map((row, rowIndex) => (
        <div key={rowIndex} className="pixel-heart__row">
          {row.map((square, squareIndex) => (
            <span
              key={`${rowIndex}-${squareIndex}`}
              className={`pixel-heart__square pixel-heart__square--${square.tone}`}
              style={{ '--square-start': square.start + 1 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
