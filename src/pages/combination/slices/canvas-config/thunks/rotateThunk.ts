import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";

import { setPlateCanvasRotate } from "../../plate-origin/plateCanvasConfigSlice";
import { setCanvasRotate } from "../canvasConfigSlice";

export const rotateThunk = createAsyncThunk<void, number, { state: RootState }>(
    'combinationPageCanvasConfigSlice/rotate',
    async (angle, thunkApi) => {
        const { dispatch, getState } = thunkApi
        const { combinationPageSlice } = getState()
        const { plateIsManipulated } = combinationPageSlice

        if (plateIsManipulated) {
            dispatch(setPlateCanvasRotate(angle))
        } else {
            dispatch(setCanvasRotate(angle))
        }
    }
)