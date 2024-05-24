import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { initialState } from './initialState'

export const combinationPageSlice = createSlice({
    initialState,
    name: 'combinationPageSlice',
    reducers: {
        setPlateIsManipulated(state, { payload }: PayloadAction<boolean>) {
            state.plateIsManipulated = payload
        },
        setRotateOriginPointSetModeEnabled(state, { payload }: PayloadAction<boolean>) {
            state.rotateOriginPointSetModeEnabled = payload
        },
    },
})

export const { setPlateIsManipulated, setRotateOriginPointSetModeEnabled } = combinationPageSlice.actions