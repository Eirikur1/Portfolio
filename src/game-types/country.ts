/**
 * Core country data structure.
 * Matches spec: name, lat, lng, flag (FlagCDN)
 */
export interface Country {
  code: string
  name: string
  lat: number
  lng: number
  flag: string
  /** Alternate names for search (e.g. native, alt spellings) */
  altNames?: string[]
}

/**
 * Map of ISO country code → Country
 */
export type CountryMap = Record<string, Country>

/**
 * A single guess with distance feedback
 */
export interface Guess {
  country: Country
  distanceKm: number
  direction?: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
}

/**
 * GeoJSON feature for country shapes (simplified)
 */
export interface GeoJsonFeature {
  type: 'Feature'
  properties: {
    ISO_A2?: string
    ADMIN?: string
    [key: string]: unknown
  }
  geometry: GeoJSON.Geometry
}

export interface GeoJsonData {
  type: 'FeatureCollection'
  features: GeoJsonFeature[]
}
