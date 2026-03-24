import { WATERFALLS as STATIC_WATERFALLS } from '../game-data/waterfalls'
import { fetchWaterfallImage } from './fetchWaterfallImage'

export interface Waterfall {
  id: string
  name: string
  lat: number
  lng: number
  imageUrl: string | null
}

// Iceland bounding box — filter out bad coordinates
const LAT_MIN = 62.9
const LAT_MAX = 67.5
const LNG_MIN = -26.0
const LNG_MAX = -12.0

const SPARQL_URL = 'https://query.wikidata.org/sparql'

/** Q34038 = waterfall (physical feature). Q37340 is a different class and returns 0 results for Iceland. */
const QUERY = `
SELECT ?item ?itemLabel ?lat ?lng ?image WHERE {
  ?item wdt:P31 wd:Q34038 ;
        wdt:P17 wd:Q189 ;
        p:P625 ?coordStmt .
  ?coordStmt psv:P625 ?coordVal .
  ?coordVal wikibase:geoLatitude ?lat .
  ?coordVal wikibase:geoLongitude ?lng .
  OPTIONAL { ?item wdt:P18 ?image }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
ORDER BY ?itemLabel
`.trim()

let cached: Waterfall[] | null = null

function commonsThumbUrl(commonsFileUrl: string): string {
  if (commonsFileUrl.includes('Special:FilePath')) {
    return `${commonsFileUrl.split('?')[0]}?width=900`
  }
  return commonsFileUrl
}

function parseWikidataResults(data: {
  results: { bindings: Record<string, { value: string }>[] }
}): Waterfall[] {
  const byId = new Map<string, Waterfall>()

  for (const b of data.results.bindings) {
    const label = b.itemLabel?.value ?? ''
    if (!label) continue
    const lat = parseFloat(b.lat.value)
    const lng = parseFloat(b.lng.value)
    if (Number.isNaN(lat) || Number.isNaN(lng)) continue
    if (lat < LAT_MIN || lat > LAT_MAX || lng < LNG_MIN || lng > LNG_MAX) continue

    const id = b.item.value.split('/').pop()!
    if (byId.has(id)) continue

    const rawImage = b.image?.value ?? null
    const imageUrl = rawImage ? commonsThumbUrl(rawImage) : null
    const name = label.startsWith('Q') && /^Q\d+$/.test(label) ? `Waterfall (${id})` : label

    byId.set(id, {
      id,
      name,
      lat,
      lng,
      imageUrl,
    })
  }

  return [...byId.values()]
}

async function loadStaticFallback(): Promise<Waterfall[]> {
  const rows = await Promise.all(
    STATIC_WATERFALLS.map(async (w) => ({
      id: w.id,
      name: w.name,
      lat: w.lat,
      lng: w.lng,
      imageUrl: await fetchWaterfallImage(w.wikipediaTitle),
    }))
  )
  return rows
}

export async function fetchWaterfalls(): Promise<Waterfall[]> {
  if (cached) return cached

  try {
    const url = `${SPARQL_URL}?query=${encodeURIComponent(QUERY)}&format=json&origin=*`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Wikidata SPARQL error: ${res.status}`)
    const data = await res.json()
    const n = data?.results?.bindings?.length ?? 0
    console.log(`[fetchWaterfalls] Wikidata raw rows: ${n}`)

    const results = parseWikidataResults(data)
    console.log(`[fetchWaterfalls] after parse/dedupe: ${results.length} waterfalls`)

    if (results.length > 0) {
      cached = results
      return cached
    }
    console.warn('[fetchWaterfalls] Wikidata returned no usable rows, using static list')
  } catch (e) {
    console.warn('[fetchWaterfalls] Wikidata failed:', e)
  }

  const fallback = await loadStaticFallback()
  cached = fallback
  return cached
}

/** Deterministic seeded shuffle — same N waterfalls every day */
export function getTodayWaterfalls(all: Waterfall[], count = 5): Waterfall[] {
  const today = new Date().toISOString().slice(0, 10)
  let seed = today.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  const arr = [...all]
  for (let i = arr.length - 1; i > 0; i--) {
    seed = Math.imul(seed, 1664525) + 1013904223
    const j = (seed >>> 0) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, count)
}
