const cache: Record<string, string | null> = {}

/**
 * Fetch the main thumbnail image for a Wikipedia article.
 * Uses the Wikipedia API (CORS-safe with origin=*).
 * Returns the image URL or null if unavailable.
 */
export async function fetchWaterfallImage(wikipediaTitle: string): Promise<string | null> {
  if (wikipediaTitle in cache) return cache[wikipediaTitle]

  try {
    const url =
      `https://en.wikipedia.org/w/api.php` +
      `?action=query` +
      `&titles=${encodeURIComponent(wikipediaTitle)}` +
      `&prop=pageimages` +
      `&format=json` +
      `&pithumbsize=900` +
      `&origin=*`

    const resp = await fetch(url)
    const data = await resp.json()
    const pages = data?.query?.pages
    if (!pages) { cache[wikipediaTitle] = null; return null }

    const page = Object.values(pages)[0] as Record<string, unknown>
    const src = (page?.thumbnail as { source?: string } | undefined)?.source ?? null

    cache[wikipediaTitle] = src
    return src
  } catch {
    cache[wikipediaTitle] = null
    return null
  }
}
