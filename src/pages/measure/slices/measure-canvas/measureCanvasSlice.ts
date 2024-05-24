import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialState } from './initialState'

export const measureCanvasSlice = createSlice({
    initialState,
    name: 'measureCanvasSlice',
    reducers: {
        changeDevicePosition(state, { payload }: PayloadAction<{ left: number, top: number }>) {
            const { left, top } = payload
            state.deviceLeftFraction = left / state.width
            state.deviceTopFraction = top / state.height
        },
        changeMeasureCanvasRotate(state, { payload }: PayloadAction<number>) {
            state.rotate += payload
        },
        changeMeasureCanvasScale(state, { payload }: PayloadAction<number>) {
            state.scale *= payload
        },
        moveDevice(state, { payload }: PayloadAction<{ dX: number, dY: number }>) {
            const { dX, dY } = payload
            state.deviceLeftFraction += dX / state.width
            state.deviceTopFraction += dY / state.height
        },
        setMeasureCanvasRotate: (state, { payload }: PayloadAction<number>) => ({ ...state, rotate: payload }),
        setMeasureCanvasScale: (state, { payload }: PayloadAction<number>) => ({ ...state, scale: payload }),
        setMeasureCanvasSize: (state, { payload }: PayloadAction<{ height: number, width: number }>) => ({ ...state, ...payload }),
    },
})

export const { changeDevicePosition, changeMeasureCanvasRotate, changeMeasureCanvasScale, moveDevice, setMeasureCanvasRotate, setMeasureCanvasScale, setMeasureCanvasSize } = measureCanvasSlice.actions