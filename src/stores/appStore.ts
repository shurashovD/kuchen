import { configureStore } from "@reduxjs/toolkit"

import { combinationCanvasConfigSlice, combinationPagePlateCanvasConfigSlice, combinationPageSlice } from "src/pages/combination/slices"
import { measureCanvasConfigSlice, measureCanvasSlice, measureSlice } from "src/pages/measure/slices"
import { plateConfigCanvasSlice, plateConfigurationSlice } from "src/pages/plate-configuration/slices"

export const appStore = configureStore({
	reducer: {
		[combinationCanvasConfigSlice.name]: combinationCanvasConfigSlice.reducer,
		[combinationPagePlateCanvasConfigSlice.name]: combinationPagePlateCanvasConfigSlice.reducer,
		[combinationPageSlice.name]: combinationPageSlice.reducer,
		[measureCanvasConfigSlice.name]: measureCanvasConfigSlice.reducer,
		[measureCanvasSlice.name]: measureCanvasSlice.reducer,
		[measureSlice.name]: measureSlice.reducer,
		[plateConfigCanvasSlice.name]: plateConfigCanvasSlice.reducer,
		[plateConfigurationSlice.name]: plateConfigurationSlice.reducer,
	}
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
