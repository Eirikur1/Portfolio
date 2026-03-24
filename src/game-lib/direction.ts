/**
 * Approximate compass direction from point A to B.
 */

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

export function getDirection(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): Direction {
  const dLat = toLat - fromLat
  const dLng = toLng - fromLng

  const angle = Math.atan2(dLng, dLat) * (180 / Math.PI)
  const normalized = ((angle + 360) % 360) + 22.5
  const sector = Math.floor(normalized / 45) % 8

  const directions: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[sector]
}
