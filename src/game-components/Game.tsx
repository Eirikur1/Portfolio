import { useState, useEffect } from 'react'
import { GuessInput } from './GuessInput'
import { GuessList } from './GuessList'
import { WorldMap } from './WorldMap'
import { fetchCountries, countryList } from '../game-lib/countries'
import { haversineDistance } from '../game-lib/haversine'
import { getDirection } from '../game-lib/direction'
import type { Country, CountryMap, Guess } from '../game-types/country'


function getTodayCountry(countries: Country[]): Country {
  const today = new Date().toISOString().slice(0, 10)
  const seed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return countries[seed % countries.length]
}

interface GameProps {
  onBack: () => void
}

export function Game({ onBack: _onBack }: GameProps) {
  const [countries, setCountries] = useState<CountryMap | null>(null)
  const [target, setTarget] = useState<Country | null>(null)
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [won, setWon] = useState(false)

  useEffect(() => {
    fetchCountries().then((map) => {
      setCountries(map)
      setTarget(getTodayCountry(countryList(map)))
    })
  }, [])

  const handleGuess = (country: Country) => {
    if (!target || !countries) return
    const distanceKm = haversineDistance(country.lat, country.lng, target.lat, target.lng)
    const direction = getDirection(country.lat, country.lng, target.lat, target.lng)
    setGuesses((prev) => [...prev, { country, distanceKm, direction }])
    if (distanceKm === 0) setWon(true)
  }

  const gameOver = won
  const countryListArr = countries ? countryList(countries) : []

  const distances: Record<string, number> = {}
  guesses.forEach((g) => { distances[g.country.code] = g.distanceKm })

  if (!countries || !target) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading game…</p>
      </div>
    )
  }

  return (
    <div className="game">
      <header className="game-header">
        <div className="game-title-group">
          <h1 className="game-title">
            <span className="game-title-text">Country Guesser</span>
          </h1>
          <p className="game-subtitle">
            {won
              ? `Solved in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}`
              : `${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'} · resets daily`}
          </p>
        </div>
      </header>

      <div className="game-body">
        <div className="game-left">
          {!gameOver && (
            <GuessInput
              countries={countryListArr}
              onGuess={handleGuess}
              disabled={false}
            />
          )}

          <GuessList guesses={guesses} />

          {gameOver && (
            <div className={`game-over ${won ? 'game-over-won' : 'game-over-lost'}`} role="status">
              <div>
                <strong>{target.name}</strong>
                <p>
                  {won
                    ? `${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'} — new country tomorrow`
                    : 'New country tomorrow'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="game-right">
          <div className="map-container">
            <WorldMap
              distances={distances}
              targetCode={gameOver ? target.code : undefined}
              focusCountry={guesses.length > 0 ? guesses[guesses.length - 1].country : undefined}
            />
          </div>
          <p className="globe-hint">Drag to rotate · Scroll to zoom</p>
        </div>
      </div>
    </div>
  )
}
