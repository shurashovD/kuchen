import { IOriginConfig } from 'src/types'
import { readFromLocalStorage } from 'src/utils/saveInLocalStorage'

export type RotateOrigin = { rotateOriginX: number | null; rotateOriginY: number | null }

type State = IOriginConfig & RotateOrigin

export const initialState: State = {
  coordsOriginTranslateX: 0, // положение точки А столешницы в СК рулетки;
  coordsOriginTranslateY: 0, // положение точки А столешницы в СК рулетки;
  rotateOriginX: null, // положение оси поворота в СК рулетки;
  rotateOriginY: null, // положение оси поворота в СК рулетки;
  rotateRad: 0, // угол поворота столешницы относительно точки A столешницы;
  scale: 1,
}

export function getInitialState(): State {
  return readFromLocalStorage('CombinationPagePlateCanvasConfigSlice') || initialState
}
