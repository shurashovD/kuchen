import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";
import { wallPointsAbsolutePolarSelector } from "src/selectors";
import { changeOriginPolarPoints } from "src/utils";

const configSelector = createSelector(({ combinationPageCanvasConfigSlice }: RootState) => combinationPageCanvasConfigSlice, item => item)

export const wallPointsCanvasSelector = createSelector([configSelector, wallPointsAbsolutePolarSelector], (origin, points) => {
    return changeOriginPolarPoints(origin, points)
})