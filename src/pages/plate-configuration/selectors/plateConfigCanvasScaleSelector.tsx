import { createSelector } from "@reduxjs/toolkit";

import { plateConfigCanvasSettings } from "src/constants";
import { platePointsOrthoAbsoluteSelector } from "src/selectors";
import { RootState } from "src/stores/appStore";

export const plateConfigCanvasScaleSelector = createSelector(
    [(state: RootState) => state.plateConfigCanvasSlice, platePointsOrthoAbsoluteSelector],
    ({ height, width }, points) => {
    const plateWidthMM = Math.max(...points.map(({ x }) => x), 0)
    const plateHeightMM = Math.max(...points.map(({ y }) => y), 0)
    const scaleX = (width - plateConfigCanvasSettings.padding) / plateWidthMM
    const scaleY = (height - plateConfigCanvasSettings.padding) / plateHeightMM

    return Math.min(scaleX, scaleY)
})