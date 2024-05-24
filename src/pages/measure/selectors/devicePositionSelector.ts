import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";
import { changeOriginPolarPoints } from "src/utils"

export const devicePositionSelector = createSelector([(state: RootState) => state.measureCanvasConfigSlice], (config) => {
    const { x: left, y: top } = changeOriginPolarPoints(config, [{ alpha: 0, r: 0 }])[0]
    return { left, top }
})