/** WebKit GestureEvent for trackpad pinch (Safari) */
interface GestureEvent extends UIEvent {
  scale: number
  rotation: number
}

declare namespace GeoJSON {
  type Position = number[]
  interface Geometry {
    type: string
    coordinates: number[][] | number[][][] | number[][][][]
  }
}
