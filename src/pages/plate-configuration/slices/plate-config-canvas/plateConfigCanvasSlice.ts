import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialState } from './initialState'

export const plateConfigCanvasSlice = createSlice({
    initialState,
    name: 'plateConfigCanvasSlice',
    reducers: {
        changePlateConfigCanvasCenterPosition(state, { payload }: PayloadAction<{ left: number, top: number }>) {
            const { left, top } = payload
            state.centerLeftFraction = left / state.width
            state.centerTopFraction = top / state.height
        },
        setPlateConfigCanvasScale: (state, { payload }: PayloadAction<number>) => ({ ...state, scale: payload }),
        setPlateConfigCanvasSize: (state, { payload }: PayloadAction<{ height: number, width: number }>) => ({ ...state, ...payload }),
    },
})

export const { changePlateConfigCanvasCenterPosition, setPlateConfigCanvasScale, setPlateConfigCanvasSize } = plateConfigCanvasSlice.actions