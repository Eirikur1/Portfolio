export interface Waterfall {
  id: string
  name: string
  lat: number
  lng: number
  /** Wikipedia page title used to fetch the thumbnail image */
  wikipediaTitle: string
  region: string
}

export const WATERFALLS: Waterfall[] = [
  {
    id: 'skogafoss',
    name: 'Skógafoss',
    lat: 63.532,
    lng: -19.512,
    wikipediaTitle: 'Skógafoss',
    region: 'South Iceland',
  },
  {
    id: 'seljalandsfoss',
    name: 'Seljalandsfoss',
    lat: 63.616,
    lng: -19.990,
    wikipediaTitle: 'Seljalandsfoss',
    region: 'South Iceland',
  },
  {
    id: 'gullfoss',
    name: 'Gullfoss',
    lat: 64.327,
    lng: -20.122,
    wikipediaTitle: 'Gullfoss',
    region: 'Golden Circle',
  },
  {
    id: 'dettifoss',
    name: 'Dettifoss',
    lat: 65.815,
    lng: -16.384,
    wikipediaTitle: 'Dettifoss',
    region: 'Northeast Iceland',
  },
  {
    id: 'godafoss',
    name: 'Goðafoss',
    lat: 65.683,
    lng: -17.550,
    wikipediaTitle: 'Goðafoss',
    region: 'North Iceland',
  },
  {
    id: 'svartifoss',
    name: 'Svartifoss',
    lat: 64.028,
    lng: -16.975,
    wikipediaTitle: 'Svartifoss',
    region: 'Southeast Iceland',
  },
  {
    id: 'haifoss',
    name: 'Háifoss',
    lat: 64.096,
    lng: -19.770,
    wikipediaTitle: 'Háifoss',
    region: 'South Iceland',
  },
  {
    id: 'dynjandi',
    name: 'Dynjandi',
    lat: 65.738,
    lng: -23.196,
    wikipediaTitle: 'Dynjandi',
    region: 'Westfjords',
  },
  {
    id: 'aldeyjarfoss',
    name: 'Aldeyjarfoss',
    lat: 65.456,
    lng: -17.788,
    wikipediaTitle: 'Aldeyjarfoss',
    region: 'Highland Iceland',
  },
  {
    id: 'oxararfoss',
    name: 'Öxárárfoss',
    lat: 64.255,
    lng: -21.134,
    wikipediaTitle: 'Öxárárfoss',
    region: 'Southwest Iceland',
  },
  {
    id: 'barnafoss',
    name: 'Barnafoss',
    lat: 64.715,
    lng: -20.965,
    wikipediaTitle: 'Barnafoss',
    region: 'West Iceland',
  },
  {
    id: 'hraunfossar',
    name: 'Hraunfossar',
    lat: 64.718,
    lng: -20.983,
    wikipediaTitle: 'Hraunfossar',
    region: 'West Iceland',
  },
]

/** Deterministic seeded shuffle — same 5 waterfalls every day */
export function getTodayWaterfalls(count = 5): Waterfall[] {
  const today = new Date().toISOString().slice(0, 10)
  const seed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  const arr = [...WATERFALLS]
  let s = seed
  for (let i = arr.length - 1; i > 0; i--) {
    // Linear congruential generator
    s = Math.imul(s, 1664525) + 1013904223
    const j = (s >>> 0) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, count)
}
