import { useState, useEffect } from 'react'
import { IcelandMap } from './IcelandMap'
import { fetchWaterfalls, getTodayWaterfalls, type Waterfall } from '../game-lib/fetchWaterfalls'
import { haversineDistance } from '../game-lib/haversine'

interface IcelandGameProps {
  onBack: () => void
}

interface RoundResult {
  waterfall: Waterfall
  guess: { lat: number; lng: number }
  distanceKm: number
}

function getStars(distanceKm: number): number {
  if (distanceKm <= 10) return 5
  if (distanceKm <= 30) return 4
  if (distanceKm <= 60) return 3
  if (distanceKm <= 100) return 2
  if (distanceKm <= 150) return 1
  return 0
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="star-rating" aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < stars ? 'star star-filled' : 'star star-empty'}>
          ★
        </span>
      ))}
    </span>
  )
}

function Results({
  results,
  onBack,
}: {
  results: RoundResult[]
  onBack: () => void
}) {
  const totalStars = results.reduce((sum, r) => sum + getStars(r.distanceKm), 0)
  const maxStars = results.length * 5

  return (
    <div className="iceland-results">
      <div className="results-header">
        <h2>Today's Results</h2>
        <div className="results-score">
          <span className="results-stars-total">{totalStars}</span>
          <span className="results-stars-max">/ {maxStars} ★</span>
        </div>
      </div>

      <div className="results-list">
        {results.map((r) => (
          <div key={r.waterfall.id} className="result-card">
            {r.waterfall.imageUrl && (
              <img src={r.waterfall.imageUrl} alt={r.waterfall.name} className="result-thumb" />
            )}
            <div className="result-info">
              <strong>{r.waterfall.name}</strong>
              <span className="result-dist">
                {Math.round(r.distanceKm).toLocaleString()} km off
              </span>
            </div>
            <StarRating stars={getStars(r.distanceKm)} />
          </div>
        ))}
      </div>

      <button className="btn-secondary" onClick={onBack}>
        ← Back to Games
      </button>
    </div>
  )
}

export function IcelandGame({ onBack }: IcelandGameProps) {
  const [waterfalls, setWaterfalls] = useState<Waterfall[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [round, setRound] = useState(0)
  const [guess, setGuess] = useState<{ lat: number; lng: number } | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState<RoundResult[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetchWaterfalls()
      .then((all) => setWaterfalls(getTodayWaterfalls(all, 5)))
      .catch(() => setLoadError(true))
  }, [])

  if (loadError || (waterfalls !== null && waterfalls.length === 0)) {
    return (
      <div className="game">
        <header className="game-header">
          <div className="game-title-group">
            <h1 className="game-title">🧊 <span className="game-title-text">Iceland</span></h1>
          </div>
          <button className="back-btn" onClick={onBack}>← Games</button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '1rem', padding: '2rem', color: 'var(--text-m)' }}>
          <p>Failed to load waterfall data from Wikidata.</p>
          <p style={{ fontSize: '0.85rem' }}>Check the browser console for details.</p>
          <button className="btn-secondary" onClick={onBack}>← Back to Games</button>
        </div>
      </div>
    )
  }

  if (!waterfalls) {
    return (
      <div className="game">
        <header className="game-header">
          <div className="game-title-group">
            <h1 className="game-title">🧊 <span className="game-title-text">Iceland</span></h1>
          </div>
          <button className="back-btn" onClick={onBack}>← Games</button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '1rem', padding: '2rem', color: 'var(--text-m)' }}>
          <div className="loading-spinner" />
          <p>Loading waterfalls from Wikidata…</p>
        </div>
      </div>
    )
  }

  const current = waterfalls[round]
  const currentResult = results[results.length - 1]

  const handleSubmit = () => {
    if (!guess || !current) return
    const distanceKm = haversineDistance(guess.lat, guess.lng, current.lat, current.lng)
    setResults((prev) => [...prev, { waterfall: current, guess, distanceKm }])
    setRevealed(true)
  }

  const handleNext = () => {
    if (round + 1 >= waterfalls.length) {
      setDone(true)
    } else {
      setRound((r) => r + 1)
      setGuess(null)
      setRevealed(false)
    }
  }

  if (done) {
    return (
      <div className="game">
        <header className="game-header">
          <div className="game-title-group">
            <h1 className="game-title">🧊 <span className="game-title-text">Iceland</span></h1>
          </div>
          <button className="back-btn" onClick={onBack}>← Games</button>
        </header>
        <Results results={results} onBack={onBack} />
      </div>
    )
  }

  return (
    <div className="game">
      <header className="game-header">
        <div className="game-title-group">
          <h1 className="game-title">🧊 <span className="game-title-text">Iceland</span></h1>
          <p className="game-subtitle">Find the waterfall on the map</p>
        </div>
        <div className="iceland-header-right">
          <span className="round-badge">
            {round + 1} / {waterfalls.length}
          </span>
          <button className="back-btn" onClick={onBack}>← Games</button>
        </div>
      </header>

      <div className="iceland-body">
        {/* Left: waterfall image */}
        <div className="iceland-left">
          <div className="waterfall-image-container">
            {current.imageUrl === null ? (
              <div className="image-fallback">
                <span>📷</span>
                <p>No photo available</p>
              </div>
            ) : (
              <img
                src={current.imageUrl}
                alt="Guess this waterfall's location"
                className="waterfall-image"
                draggable={false}
              />
            )}
          </div>

          {revealed && currentResult && (
            <div
              className={`iceland-reveal ${
                getStars(currentResult.distanceKm) >= 3 ? 'reveal-good' : 'reveal-bad'
              }`}
            >
              <div className="reveal-top">
                <strong>{current.name}</strong>
                <StarRating stars={getStars(currentResult.distanceKm)} />
              </div>
              <p className="reveal-distance">
                {Math.round(currentResult.distanceKm).toLocaleString()} km from the actual location
              </p>
            </div>
          )}
        </div>

        {/* Right: Iceland map */}
        <div className="iceland-right">
          {!revealed && (
            <p className="map-instruction">
              {guess ? 'Click to reposition your pin' : 'Click on the map to place your pin'}
            </p>
          )}
          <IcelandMap
            guess={guess}
            answer={revealed ? { lat: current.lat, lng: current.lng } : null}
            onMapClick={(lat, lng) => {
              if (!revealed) setGuess({ lat, lng })
            }}
            revealed={revealed}
          />
          <div className="iceland-actions">
            {!revealed ? (
              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!guess}
              >
                Submit Guess
              </button>
            ) : (
              <button className="btn-primary" onClick={handleNext}>
                {round + 1 >= waterfalls.length ? 'See Results →' : 'Next Waterfall →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
