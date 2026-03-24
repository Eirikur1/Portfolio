import { useEffect, useState } from 'react'
import type { GeoJsonData, GeoJsonFeature } from '../game-types/country'

const GEOJSON_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'

// Iceland bounding box (with padding)
const LAT_MIN = 62.9
const LAT_MAX = 67.0
const LNG_MIN = -26.0
const LNG_MAX = -12.0

const MAP_W = 600
const MAP_H = 390

// Reference city shown as an orientation aid
const REYKJAVIK = { lat: 64.135, lng: -21.895, label: 'Reykjavík' }

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_W
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_H
  return { x, y }
}

function unproject(svgX: number, svgY: number) {
  const lng = LNG_MIN + (svgX / MAP_W) * (LNG_MAX - LNG_MIN)
  const lat = LAT_MAX - (svgY / MAP_H) * (LAT_MAX - LAT_MIN)
  return { lat, lng }
}

function featureToPath(feat: GeoJsonFeature): string {
  const geom = feat.geometry
  if (!geom?.coordinates) return ''

  const ringToSvg = (ring: number[][]): string => {
    const pts = ring.map(([lng, lat]) => {
      const { x, y } = project(lat, lng)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    return `M ${pts.join(' L ')} Z`
  }

  if (geom.type === 'Polygon') {
    return (geom.coordinates as number[][][]).map(ringToSvg).join(' ')
  }
  if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as number[][][][])
      .flatMap((poly) => poly.map(ringToSvg))
      .join(' ')
  }
  return ''
}

function MapPin({
  x,
  y,
  color,
  label,
}: {
  x: number
  y: number
  color: string
  label?: string
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={12} fill={color} fillOpacity={0.2} />
      <circle cx={x} cy={y} r={5} fill={color} />
      {label && (
        <text
          x={x + 9}
          y={y + 4}
          fontSize={11}
          fill={color}
          fontWeight="600"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {label}
        </text>
      )}
    </g>
  )
}

interface IcelandMapProps {
  guess: { lat: number; lng: number } | null
  answer: { lat: number; lng: number } | null
  onMapClick: (lat: number, lng: number) => void
  revealed: boolean
}

export function IcelandMap({ guess, answer, onMapClick, revealed }: IcelandMapProps) {
  const [geojson, setGeojson] = useState<GeoJsonData | null>(null)

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then(setGeojson)
      .catch(console.error)
  }, [])

  const icelandFeature = geojson?.features.find(
    (f) => f.properties.ISO_A2 === 'IS' || f.properties.ADMIN === 'Iceland'
  )
  const icelandPath = icelandFeature ? featureToPath(icelandFeature) : ''

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (revealed) return
    const svg = e.currentTarget
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse())
    // Clamp to map bounds
    if (svgPt.x < 0 || svgPt.x > MAP_W || svgPt.y < 0 || svgPt.y > MAP_H) return
    const { lat, lng } = unproject(svgPt.x, svgPt.y)
    onMapClick(lat, lng)
  }

  const guessPos = guess ? project(guess.lat, guess.lng) : null
  const answerPos = answer ? project(answer.lat, answer.lng) : null
  const rkPos = project(REYKJAVIK.lat, REYKJAVIK.lng)

  return (
    <div className="iceland-map">
      {!geojson && (
        <div className="iceland-map-loading">
          <div className="loading-spinner" />
        </div>
      )}
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        onClick={handleClick}
        style={{ cursor: revealed ? 'default' : 'crosshair', display: 'block', width: '100%' }}
        aria-label="Map of Iceland — click to place your guess"
      >
        {/* Ocean background */}
        <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="var(--ocean, #03080f)" rx={0} />

        {/* Iceland landmass */}
        {icelandPath && (
          <path
            d={icelandPath}
            fill="var(--surface-3, #1a2d4a)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        )}

        {/* Reykjavík reference marker */}
        <circle cx={rkPos.x} cy={rkPos.y} r={3} fill="rgba(255,255,255,0.4)" />
        <text
          x={rkPos.x + 6}
          y={rkPos.y + 4}
          fontSize={10}
          fill="rgba(255,255,255,0.35)"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          Reykjavík
        </text>

        {/* Dotted line between guess and answer when revealed */}
        {guessPos && answerPos && revealed && (
          <line
            x1={guessPos.x}
            y1={guessPos.y}
            x2={answerPos.x}
            y2={answerPos.y}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
        )}

        {/* User's guess pin (blue) */}
        {guessPos && (
          <MapPin x={guessPos.x} y={guessPos.y} color="var(--accent, #4dabf7)" label="You" />
        )}

        {/* Actual answer pin (green) */}
        {answerPos && (
          <MapPin
            x={answerPos.x}
            y={answerPos.y}
            color="var(--success, #51cf66)"
          />
        )}

        {/* Compass N indicator */}
        <text
          x={MAP_W - 14}
          y={18}
          fontSize={11}
          fill="rgba(255,255,255,0.3)"
          textAnchor="middle"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          N
        </text>
      </svg>
    </div>
  )
}
