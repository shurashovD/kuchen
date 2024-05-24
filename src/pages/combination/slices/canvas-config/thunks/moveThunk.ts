import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";
import { fromGlobalToLocalOrigin, pointOrthoToPolar, pointPolarToOrtho } from "src/utils";

import { onCanvasMove } from "../canvasConfigSlice";
import { onPlateCanvasMove } from "../../plate-origin/plateCanvasConfigSlice";

export const moveThunk = createAsyncThunk<void, { dX: number, dY: number }, { state: RootState }>(
    'combinationPageCanvasConfigSlice/move',
    async ({ dX, dY }, thunkApi) => {
        const { dispatch, getState } = thunkApi
        const { combinationPageSlice, combinationPageCanvasConfigSlice, combinationPagePlateCanvasConfigSlice } = getState()

        if (combinationPageSlice.plateIsManipulated) {
            const { rotateRad, scale } = combinationPageCanvasConfigSlice
            const { alpha, r } = pointOrthoToPolar({ x: dX, y: dY })
            const { x, y } = pointPolarToOrtho({ alpha: alpha - rotateRad, r: r / scale })
            dispatch(onPlateCanvasMove({ dX: x, dY: y }))
        } else {
            dispatch(onCanvasMove({ dX, dY }))
        }
    }
)