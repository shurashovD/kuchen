import { createSelector } from "@reduxjs/toolkit";

import { changeOriginPolarPoints } from "src/utils";
import { RootState } from "src/stores/appStore";
import { wallPointsAbsolutePolarSelector } from "src/selectors/wallPointsAbsolutePolarSelector";

const configSelector = createSelector((store: RootState) => store.measureCanvasConfigSlice, item => item)

export const wallPointsCanvasSelector = createSelector([configSelector, wallPointsAbsolutePolarSelector], changeOriginPolarPoints)