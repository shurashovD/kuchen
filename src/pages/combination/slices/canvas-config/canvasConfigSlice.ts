import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { saveInLocalStorage } from 'src/utils/saveInLocalStorage'

import { getInitialState } from './initialState'
import { moveThunk } from './thunks/moveThunk'
import { rotateThunk } from './thunks/rotateThunk'

const initialState = getInitialState()

export const canvasConfigSlice = createSlice({
  initialState,
  name: 'combinationPageCanvasConfigSlice',
  reducers: {
    onCanvasMove(state, { payload }: PayloadAction<{ dX: number; dY: number }>) {
      const { dX, dY } = payload
      const coordsOriginTranslateX = state.coordsOriginTranslateX + dX
      const coordsOriginTranslateY = state.coordsOriginTranslateY + dY

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)

      return { ...state, coordsOriginTranslateX, coordsOriginTranslateY }
    },
    onCanvasRotate(state, { payload }: PayloadAction<number>) {
      state.rotateRad += payload

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)
    },
    onCanvasScaleChange(state, { payload }: PayloadAction<number>) {
      state.scale *= payload

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)
    },
    setCanvasRotate: (state, { payload }: PayloadAction<number>) => {
      state.rotateRad = payload

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)
    },
    setCanvasScale: (state, { payload }: PayloadAction<number>) => {
      state.scale = payload

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)
    },
    setCanvasTranslate(
      state,
      {
        payload,
      }: PayloadAction<{ coordsOriginTranslateX: number; coordsOriginTranslateY: number }>,
    ) {
      state.coordsOriginTranslateX = payload.coordsOriginTranslateX
      state.coordsOriginTranslateY = payload.coordsOriginTranslateY

      saveInLocalStorage('CombinationPageCanvasConfigSlice', state)
    },
  },
  extraReducers: builder => {
    builder.addCase(moveThunk.fulfilled, state => state)
    builder.addCase(rotateThunk.fulfilled, state => state)
  },
})

export const {
  onCanvasMove,
  onCanvasRotate,
  onCanvasScaleChange,
  setCanvasRotate,
  setCanvasScale,
  setCanvasTranslate,
} = canvasConfigSlice.actions
