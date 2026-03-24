import { useState, useCallback } from 'react'
import type { Country } from '../game-types/country'

interface GuessInputProps {
  countries: Country[]
  onGuess: (country: Country) => void
  disabled?: boolean
}

export function GuessInput({ countries, onGuess, disabled }: GuessInputProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Country[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const search = useCallback(
    (q: string) => {
      const lower = q.trim().toLowerCase()
      if (lower.length < 2) {
        setSuggestions([])
        return
      }
      const matches = countries.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.altNames?.some((n) => n.toLowerCase().includes(lower))
      )
      setSuggestions(matches.slice(0, 8))
    },
    [countries]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setQuery(v)
    search(v)
    setShowSuggestions(true)
  }

  const select = (country: Country) => {
    onGuess(country)
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && suggestions.length > 0) select(suggestions[0])
  }

  return (
    <div className="guess-input">
      <div className="guess-input-wrapper">
        <span className="guess-input-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Type a country name…"
          disabled={disabled}
          autoComplete="off"
          aria-label="Country guess"
          autoFocus
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((c) => (
            <li
              key={c.code}
              role="option"
              onClick={() => select(c)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <img src={c.flag} alt="" width={24} height={18} />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
