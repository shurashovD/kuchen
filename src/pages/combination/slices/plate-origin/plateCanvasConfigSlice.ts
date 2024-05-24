import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getInitialState, RotateOrigin } from './initialState'
import { saveInLocalStorage } from 'src/utils/saveInLocalStorage'

const initialState = getInitialState()

export const combinationPagePlateCanvasConfigSlice = createSlice({
  initialState,
  name: 'combinationPagePlateCanvasConfigSlice',
  reducers: {
    onPlateCanvasMove(state, { payload }: PayloadAction<{ dX: number; dY: number }>) {
      const { dX, dY } = payload
      state.coordsOriginTranslateX += dX
      state.coordsOriginTranslateY += dY

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    onPlateCanvasRotate(state, { payload }: PayloadAction<number>) {
      state.rotateRad += payload

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    onPlateCanvasScaleChange(state, { payload }: PayloadAction<number>) {
      state.scale *= payload

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    setPlateCanvasRotate: (state, { payload }: PayloadAction<number>) => {
      state.rotateRad = payload

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    setPlateCanvasRotateOrigin: (state, { payload }: PayloadAction<RotateOrigin>) => {
      state.rotateOriginX = payload.rotateOriginX
      state.rotateOriginY = payload.rotateOriginY

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    setPlateCanvasScale: (state, { payload }: PayloadAction<number>) => {
      state.scale = payload

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
    setPlateCanvasTranslate(
      state,
      {
        payload,
      }: PayloadAction<{ coordsOriginTranslateX: number; coordsOriginTranslateY: number }>,
    ) {
      state.coordsOriginTranslateX = payload.coordsOriginTranslateX
      state.coordsOriginTranslateY = payload.coordsOriginTranslateY

      saveInLocalStorage('CombinationPagePlateCanvasConfigSlice', state)
    },
  },
})

export const {
  onPlateCanvasMove,
  onPlateCanvasRotate,
  onPlateCanvasScaleChange,
  setPlateCanvasRotate,
  setPlateCanvasRotateOrigin,
  setPlateCanvasScale,
  setPlateCanvasTranslate,
} = combinationPagePlateCanvasConfigSlice.actions
