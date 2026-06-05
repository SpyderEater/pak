import { useEffect, useState } from 'react'
import './UserIdentity.css'
import defaultAvatar from '../../images/default_avatar.svg'

export default function UserIdentity({
  avatarSrc,
  avatarAlt,
  name,
  username,
  levelLabel,
  levelProgress = 0,
}) {
  const [src, setSrc] = useState(avatarSrc || defaultAvatar)

  useEffect(() => {
    setSrc(avatarSrc || defaultAvatar)
  }, [avatarSrc])

  const size = 122
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (levelProgress / 100) * circumference

  return (
    <div className="user-identity">
      <div className="user-identity__avatar-frame">
        <svg className="progress-ring" viewBox={`0 0 ${size} ${size}`}>
          <circle className="progress-ring__background" r={radius} cx={size / 2} cy={size / 2} />
          <circle
            className="progress-ring__progress"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        <img
          src={src}
          alt={avatarAlt}
          className="user-identity__avatar"
          onError={(e) => {
            setSrc(defaultAvatar)
          }}
        />
      </div>

      <h2 className="user-identity__name">{name}</h2>
      <div className="user-identity__meta">
        <span className="user-identity__username">{username}</span>
        <span className="user-identity__level">{levelLabel}</span>
      </div>
    </div>
  )
}
