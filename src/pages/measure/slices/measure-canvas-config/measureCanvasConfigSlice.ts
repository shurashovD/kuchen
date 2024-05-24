import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initialState } from './initialState'

export const measureCanvasConfigSlice = createSlice({
    initialState,
    name: 'measureCanvasConfigSlice',
    reducers: {
        measureCanvasConfigRotateOn(state, { payload }: PayloadAction<number>) {
            state.rotateRad += payload
        },
        measureCanvasConfigSetMmInPx(state, { payload }: PayloadAction<number>) {
            state.scale *= payload
        },
        measureCanvasConfigTranslate(state, { payload }: PayloadAction<{ dX: number, dY: number }>) {
            const { dX, dY } = payload
            state.coordsOriginTranslateX += dX
            state.coordsOriginTranslateY += dY
        },
        setMeasureCanvasConfigRotate: (state, { payload }: PayloadAction<number>) => ({ ...state, rotateRad: payload }),
        setMeasureCanvasConfigScale: (state, { payload }: PayloadAction<number>) => ({ ...state, scale: payload }),
        setMeasureCanvasConfigTranslate: (state, { payload }: PayloadAction<{ coordsOriginTranslateX: number, coordsOriginTranslateY: number }>) => ({ ...state, ...payload }),
    }
})

export const {
    measureCanvasConfigRotateOn,
    measureCanvasConfigSetMmInPx,
    measureCanvasConfigTranslate,
    setMeasureCanvasConfigScale,
    setMeasureCanvasConfigRotate,
    setMeasureCanvasConfigTranslate
} = measureCanvasConfigSlice.actions