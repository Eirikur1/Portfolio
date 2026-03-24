import type { Guess } from '../game-types/country'
import { distanceToColor } from '../game-lib/distanceToColor'

const DIRECTION_ARROWS: Record<string, string> = {
  N: '↑',
  NE: '↗',
  E: '→',
  SE: '↘',
  S: '↓',
  SW: '↙',
  W: '←',
  NW: '↖',
}

interface GuessListProps {
  guesses: Guess[]
}

export function GuessList({ guesses }: GuessListProps) {
  if (guesses.length === 0) return null

  return (
    <ul className="guess-list" aria-label="Previous guesses">
      {guesses.map((g, i) => {
        const color = distanceToColor(g.distanceKm)
        const closeness = Math.max(3, (1 - Math.min(g.distanceKm, 20_000) / 20_000) * 100)

        return (
          <li key={i} className="guess-card">
            <img
              src={g.country.flag}
              alt=""
              width={36}
              height={27}
              className="guess-flag"
            />
            <div className="guess-info">
              <div className="guess-top">
                <span className="guess-name">{g.country.name}</span>
                <span className="guess-dist">
                  {g.distanceKm === 0 ? (
                    <span className="guess-correct">✓ Correct!</span>
                  ) : (
                    <>
                      <span className="guess-km">
                        {Math.round(g.distanceKm).toLocaleString()} km
                      </span>
                      {g.direction && (
                        <span className="guess-arrow">
                          {DIRECTION_ARROWS[g.direction] ?? g.direction}
                        </span>
                      )}
                    </>
                  )}
                </span>
              </div>
              {g.distanceKm > 0 && (
                <div className="distance-bar">
                  <div
                    className="distance-bar-fill"
                    style={{ width: `${closeness}%`, background: color }}
                  />
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
