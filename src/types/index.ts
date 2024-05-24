export type PageContextValue<Controllers> = {
  controllers: Partial<Controllers>
  addController<T extends keyof Controllers>(name: T, controller: Controllers[T]): void
  getController<T extends keyof Controllers>(name: T): Controllers[T] | undefined
  rmController<T extends keyof Controllers>(name: T): void
}

export type Measure = {
  angle: number
  id: number
  radius: number
  move: number
}

export type MeasureState = {
  inputInFocus: 'angle' | 'move' | 'radius' | null
  measures: Measure[]
  selectedIds: number[]
}

export type MeasureCanvasState = {
  deviceLeftFraction: number
  deviceTopFraction: number
  height: number
  rotate: number
  scale: number
  width: number
}

export type CombinationCanvasState = {
  leftFraction: number
  topFraction: number
  height: number
  rotate: number
  scale: number
  width: number
}

export type CombinationWallState = {
  rotate: number
  rotatePointX: number | null
  rotatePointY: number | null
}

type FormFactor = 'I' | 'LL' | 'RL' | 'U'
export type Connect = 'RIGHT-ROUND' | 'LEFT-ROUND' | 'PORT' | 'GRIP'
export type PlateConfigurationDimKey = 'center' | 'left' | 'right'
export type PlateConfigurationDimVariant = 'depth' | 'wall'

export type PlateConfigurationState = {
  formFactor: FormFactor
  connect: Connect | null
  plateInFocus: PlateConfigurationDimKey | null
  inputInFocus: PlateConfigurationDimVariant | null
  center: { depth: number | null; wall: number | null }
  left: { depth: number | null; wall: number | null }
  right: { depth: number | null; wall: number | null }
}

export type PlateConfigurationCanvasState = {
  centerLeftFraction: number
  centerTopFraction: number
  height: number
  scale: number
  width: number
}

export type LocalStorageKey =
  | 'CombinationPagePlateCanvasConfigSlice'
  | 'CombinationPageCanvasConfigSlice'
  | 'MeasureSlice'
  | 'PlateSlice'

export type PolarCoord = { alpha: number; r: number }

export type MeasurePointAbsolutePolarCoords = { measureId: Measure['id'] } & PolarCoord

export type OrthoCoord = {
  x: number
  y: number
}

type Coords = [number, number, number, number]

export type LineItem = {
  id: string
  coordinates: Coords
}

export interface IOriginConfig {
  rotateRad: number
  scale: number
  coordsOriginTranslateX: number
  coordsOriginTranslateY: number
}
