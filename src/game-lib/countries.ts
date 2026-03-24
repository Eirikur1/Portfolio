/**
 * Fetches country metadata from REST Countries and normalizes to our Country type.
 * Uses FlagCDN for flag URLs.
 */

import type { Country, CountryMap } from '../game-types/country'

const REST_COUNTRIES = 'https://restcountries.com/v3.1/all?fields=name,cca2,latlng,capital'
const FLAG_CDN_BASE = 'https://flagcdn.com'

interface RestCountry {
  name: { common: string; official: string; nativeName?: Record<string, { common: string }> }
  cca2: string
  latlng: [number, number]
}

let cachedCountries: CountryMap | null = null

export async function fetchCountries(): Promise<CountryMap> {
  if (cachedCountries) return cachedCountries

  const res = await fetch(REST_COUNTRIES)
  const data: RestCountry[] = await res.json()

  const map: CountryMap = {}
  for (const c of data) {
    if (!c.latlng?.[0] || !c.latlng?.[1]) continue
    const altNames: string[] = [c.name.common, c.name.official]
    if (c.name.nativeName) {
      Object.values(c.name.nativeName).forEach((n) => altNames.push(n.common))
    }
    map[c.cca2] = {
      code: c.cca2,
      name: c.name.common,
      lat: c.latlng[0],
      lng: c.latlng[1],
      flag: `${FLAG_CDN_BASE}/${c.cca2.toLowerCase()}.svg`,
      altNames,
    }
  }
  cachedCountries = map
  return map
}

export function countryList(countries: CountryMap): Country[] {
  return Object.values(countries).sort((a, b) => a.name.localeCompare(b.name))
}
