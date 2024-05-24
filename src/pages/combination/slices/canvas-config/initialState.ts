import { IOriginConfig } from 'src/types'
import { readFromLocalStorage } from 'src/utils/saveInLocalStorage'

export const initialState: IOriginConfig = {
  coordsOriginTranslateX: 0,
  coordsOriginTranslateY: 0,
  rotateRad: -0.75 * Math.PI,
  scale: 0.2, // количество px в mm;
}

export function getInitialState(): IOriginConfig {
  return readFromLocalStorage('CombinationPageCanvasConfigSlice') || initialState
}
