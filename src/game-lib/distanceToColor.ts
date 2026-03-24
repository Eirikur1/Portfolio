/**
 * Map distance (km) to heatmap color.
 * Closer = warmer (red/orange), farther = colder (blue).
 */

export function distanceToColor(distanceKm: number, maxDistanceKm = 20_000): string {
  if (distanceKm === 0) return 'hsl(120, 70%, 45%)' // green = correct
  const t = Math.min(distanceKm / maxDistanceKm, 1)
  // 0 = red, 0.5 = yellow, 1 = blue
  const hue = 240 - t * 240
  const sat = 80
  const light = 45
  return `hsl(${hue}, ${sat}%, ${light}%)`
}
