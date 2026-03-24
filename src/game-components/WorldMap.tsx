import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react'
import type { GeoJsonData, GeoJsonFeature } from '../game-types/country'
import { distanceToColor } from '../game-lib/distanceToColor'

/** Natural Earth simplified countries - small file, good for web */
const GEOJSON_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'

/** Globe radius in SVG units */
const R = 200
const SIZE = 420
const CENTER = SIZE / 2

/** Degrees of rotation per pixel dragged */
const DRAG_SENSITIVITY = 0.5

const ZOOM_MIN = 0.5
const ZOOM_MAX = 3
/** Pinch (ctrlKey) / Ctrl+scroll – use for zoom */
const PINCH_SENSITIVITY = 0.0012

interface WorldMapProps {
  /** Country code → distance in km. Undefined = no guess yet. */
  distances?: Record<string, number>
  /** Correct country code - will be highlighted green */
  targetCode?: string
  /** Country to pan/center the view on (e.g. last guessed) */
  focusCountry?: { lng: number; lat: number }
}

const PAN_DURATION_MS = 600

export function WorldMap({ distances = {}, targetCode, focusCountry }: WorldMapProps) {
  const [geojson, setGeojson] = useState<GeoJsonData | null>(null)
  const [centerLng, setCenterLng] = useState(0)
  const [centerLat, setCenterLat] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, lng: 0 })
  const isDraggingRef = useRef(false)

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then(setGeojson)
      .catch(console.error)
  }, [])

  const centerRef = useRef({ lng: 0, lat: 0 })
  const animRef = useRef<number | null>(null)
  centerRef.current = { lng: centerLng, lat: centerLat }

  useEffect(() => {
    if (!focusCountry) return
    if (animRef.current != null) cancelAnimationFrame(animRef.current)
    const start = { ...centerRef.current }
    const end = focusCountry
    const startTime = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / PAN_DURATION_MS, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      setCenterLng(start.lng + (end.lng - start.lng) * eased)
      setCenterLat(start.lat + (end.lat - start.lat) * eased)
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        animRef.current = null
      }
    }
    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current != null) cancelAnimationFrame(animRef.current)
    }
  }, [focusCountry])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)
    dragStart.current = { x: e.clientX, lng: centerLng }
  }, [centerLng])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - dragStart.current.x
    setCenterLng(dragStart.current.lng - dx * DRAG_SENSITIVITY)
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId)
    isDraggingRef.current = false
    setIsDragging(false)
  }, [])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef(1)
  const gestureStartZoom = useRef(1)
  zoomRef.current = zoom

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()
    let delta = e.deltaY
    if (e.deltaMode === 1) delta *= 40
    else if (e.deltaMode === 2) delta *= 120
    const sens = PINCH_SENSITIVITY
    setZoom((z) => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z - delta * sens)))
  }, [])

  const handleGestureStart = useCallback((e: GestureEvent) => {
    e.preventDefault()
    gestureStartZoom.current = zoomRef.current
  }, [])

  const handleGestureChange = useCallback((e: GestureEvent) => {
    e.preventDefault()
    const newZoom = gestureStartZoom.current * e.scale
    setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom)))
  }, [])

  const handleGestureEnd = useCallback((e: Event) => e.preventDefault(), [])

  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    el.addEventListener('gesturestart', handleGestureStart as EventListener, true)
    el.addEventListener('gesturechange', handleGestureChange as EventListener, true)
    el.addEventListener('gestureend', handleGestureEnd, true)
    return () => {
      el.removeEventListener('wheel', handleWheel, true)
      el.removeEventListener('gesturestart', handleGestureStart as EventListener, true)
      el.removeEventListener('gesturechange', handleGestureChange as EventListener, true)
      el.removeEventListener('gestureend', handleGestureEnd, true)
    }
  }, [geojson, handleWheel, handleGestureStart, handleGestureChange, handleGestureEnd])

  if (!geojson) {
    return <div className="map-loading">Loading globe…</div>
  }

  const getFill = (feat: GeoJsonFeature): string => {
    const code = feat.properties.ISO_A2 || feat.properties.ADMIN
    if (!code) return 'var(--country-default, #2d3748)'
    if (targetCode && code === targetCode) return 'hsl(120, 70%, 45%)'
    const dist = distances[code]
    if (dist !== undefined) return distanceToColor(dist)
    return 'var(--country-default, #2d3748)'
  }

  return (
    <div
      ref={wrapperRef}
      className={`globe-wrapper ${isDragging ? 'dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <svg
        className="world-map globe"
        viewBox={`${CENTER - SIZE / (2 * zoom)} ${CENTER - SIZE / (2 * zoom)} ${SIZE / zoom} ${SIZE / zoom}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="World globe showing country guesses"
      >
        <defs>
          <clipPath id="globe-clip">
            <circle cx={CENTER} cy={CENTER} r={R} />
          </clipPath>
          <radialGradient id="globe-shade" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
          </radialGradient>
          <filter id="globe-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
          </filter>
        </defs>
        <g clipPath="url(#globe-clip)">
          {/* Ocean */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="var(--ocean, #1a365d)"
          />
          {/* Countries */}
          <g>
            {geojson.features.map((feat, i) => {
              const code = feat.properties.ISO_A2
              if (!code) return null
              const pathD = pathFromFeature(feat, centerLng, centerLat)
              if (!pathD) return null
              return (
                <path
                  key={i}
                  d={pathD}
                  fill={getFill(feat)}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={0.5}
                />
              )
            })}
          </g>
          {/* Sphere highlight */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
        </g>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="url(#globe-shade)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          clipPath="url(#globe-clip)"
          style={{ pointerEvents: 'none' }}
        />
      </svg>
    </div>
  )
}

/** Orthographic projection: lng/lat → x,y on sphere face, centered on (centerLng, centerLat) */
function orthographic(
  lng: number,
  lat: number,
  centerLng: number,
  centerLat: number
): { x: number; y: number; z: number } {
  const toRad = (d: number) => (d * Math.PI) / 180
  const l = toRad(lng - centerLng)
  const p = toRad(lat)
  const p0 = toRad(centerLat)
  const cosLat = Math.cos(p)
  const sinLat = Math.sin(p)
  const cosL = Math.cos(l)
  const sinL = Math.sin(l)
  const cos0 = Math.cos(p0)
  const sin0 = Math.sin(p0)
  return {
    x: R * cosLat * sinL + CENTER,
    y: -R * (cos0 * sinLat - sin0 * cosLat * cosL) + CENTER,
    z: sin0 * sinLat + cos0 * cosLat * cosL,
  }
}

function isVisible(z: number): boolean {
  return z > 0
}

/** Line-circle intersection: segment A-B with circle center CENTER radius R.
 * Returns the crossing point (t in 0..1) where we go from inside to outside. */
function clipToHorizon(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number,
  centerLng: number,
  centerLat: number
): { x: number; y: number } | null {
  const A = orthographic(lng1, lat1, centerLng, centerLat)
  const B = orthographic(lng2, lat2, centerLng, centerLat)
  if (A.z * B.z >= 0) return null
  const ax = A.x - CENTER
  const ay = A.y - CENTER
  const dx = B.x - A.x
  const dy = B.y - A.y
  const a = dx * dx + dy * dy
  const b = 2 * (ax * dx + ay * dy)
  const c = ax * ax + ay * ay - R * R
  const disc = b * b - 4 * a * c
  if (disc < 0) return null
  const t1 = (-b - Math.sqrt(disc)) / (2 * a)
  const t2 = (-b + Math.sqrt(disc)) / (2 * a)
  const t = A.z > 0 ? (t1 >= 0 && t1 <= 1 ? t1 : t2) : (t2 >= 0 && t2 <= 1 ? t2 : t1)
  if (t < 0 || t > 1) return null
  return { x: A.x + t * dx, y: A.y + t * dy }
}

/** Convert GeoJSON geometry to SVG path using orthographic globe projection. */
function pathFromFeature(
  feat: GeoJsonFeature,
  centerLng: number,
  centerLat: number
): string {
  const geom = feat.geometry
  if (!geom || !geom.coordinates) return ''

  const projectRing = (rings: number[][][]): string =>
    rings.map((ring) => projectRingToGlobe(ring, centerLng, centerLat)).join(' ')

  if (geom.type === 'Polygon') {
    return projectRing(geom.coordinates as number[][][])
  }
  if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as number[][][][]).map((poly) => projectRing(poly)).join(' ')
  }
  return ''
}

function projectRingToGlobe(
  ring: number[][],
  centerLng: number,
  centerLat: number
): string {
  const pts = ring.map(([lng, lat]) => orthographic(lng, lat, centerLng, centerLat))
  const parts: string[] = []

  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i]
    const next = pts[(i + 1) % pts.length]
    const currVis = isVisible(curr.z)
    const nextVis = isVisible(next.z)

    if (currVis && nextVis) {
      if (parts.length === 0) parts.push(`M ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`)
      parts.push(`L ${next.x.toFixed(2)} ${next.y.toFixed(2)}`)
    } else if (currVis && !nextVis) {
      const cross = clipToHorizon(ring[i][0], ring[i][1], ring[(i + 1) % ring.length][0], ring[(i + 1) % ring.length][1], centerLng, centerLat)
      if (cross) {
        if (parts.length === 0) parts.push(`M ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`)
        parts.push(`L ${cross.x.toFixed(2)} ${cross.y.toFixed(2)}`)
      }
    } else if (!currVis && nextVis) {
      const cross = clipToHorizon(ring[i][0], ring[i][1], ring[(i + 1) % ring.length][0], ring[(i + 1) % ring.length][1], centerLng, centerLat)
      if (cross) {
        parts.push(`M ${cross.x.toFixed(2)} ${cross.y.toFixed(2)}`)
        parts.push(`L ${next.x.toFixed(2)} ${next.y.toFixed(2)}`)
      }
    }
  }

  if (parts.length > 0) parts.push('Z')
  return parts.join(' ')
}
