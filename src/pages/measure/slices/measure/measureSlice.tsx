import { createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getInitialState } from "./initialState"
import { angleByMove, moveByAngle } from "src/utils"
import { MeasureState } from "src/types"
import { saveInLocalStorage } from "src/utils/saveInLocalStorage"
import { AppDispatch, RootState } from "src/stores/appStore"

const initialState = getInitialState()

export const measureSlice = createSlice({
    initialState,
    name: "measureSlice",
    reducers: {
        addMeasure(state) {
            const id = performance.now()
            if (state.selectedIds.length === 1) {
                const index = state.measures.findIndex(({ id }) => state.selectedIds[0] === id)
                if (index === -1) {
                    state.measures.push({ angle: 0, move: 0, radius: 0, id })
                } else {
                    state.measures.splice(index + 1, 0, { angle: 0, move: 0, radius: 0, id })
                }
            } else {
                state.measures.push({ angle: 0, move: 0, radius: 0, id })
            }
            state.selectedIds = [id]
            saveInLocalStorage('MeasureSlice', state)
        },
        removeMeasure(state) {
            const index = state.measures.findIndex((item) => item.id === state.selectedIds[0])
			if (index === -1) {
				console.error("Точка не найдена")
				return
			}

            state.measures.splice(index, 1)
            state.selectedIds = []
            saveInLocalStorage('MeasureSlice', state)
        },
        setAngle(state, { payload }: PayloadAction<{ id: number, angle: number }>) {
            const { angle, id } = payload
            const index = state.measures.findIndex((item) => item.id === id)
			if (index === -1) {
				console.error("Точка не найдена")
				return
			}

            if (index > 0) {
                const item = state.measures[index]
				const r1 = state.measures[index-1].radius
                const r2 = item.radius
                if (!r1) {
                    console.error('r1 не определён')
                }
				const move = moveByAngle(r1, r2, angle)
                state.measures[index] = { ...item, angle, move }
            }
            saveInLocalStorage('MeasureSlice', state)
        },
        setInputInFocus: (state, { payload }: PayloadAction<MeasureState['inputInFocus']>) => ({ ...state, inputInFocus: payload }),
        setMove(state, { payload }: PayloadAction<{ id: number, move: number }>) {
            const { id, move } = payload
            const index = state.measures.findIndex((item) => item.id === id)
			if (index === -1) {
				console.error("Точка не найдена")
				return
			}

			if (index > 0) {
				const item = state.measures[index]
				const r1 = state.measures[index - 1].radius
				const r2 = item.radius
				if (!r1) {
					console.error("r1 не определён")
				}
				const angle = angleByMove(r1, r2, move)
				state.measures[index] = { ...item, angle, move }
			}
            saveInLocalStorage('MeasureSlice', state)
        },
        setRadius(state, { payload }: PayloadAction<{ id: number, radius: number }>) {
            const { id, radius } = payload
            const index = state.measures.findIndex((item) => item.id === id)
			if (index === -1) {
				console.error("Точка не найдена")
				return
			}

			if (index > 0) {
				const item = state.measures[index]
				const r1 = state.measures[index - 1].radius
				const r2 = radius
                const move = item.move
				if (!r1) {
					console.error("r1 не определён")
				}
				const angle = angleByMove(r1, r2, move)
				state.measures[index] = { ...item, angle, radius }
                return
			}

            state.measures[index].radius = radius
            saveInLocalStorage('MeasureSlice', state)
        },
        setSelectedMeasure(state, { payload }: PayloadAction<{ id: number }>) {
            state.selectedIds = [payload.id]
        },
        toggleSelectMeasure(state, { payload }: PayloadAction<{ id: number }>) {
            const index = state.selectedIds.findIndex(item => item === payload.id)
            if (index === -1) {
                state.selectedIds = [payload.id]
            } else {
                state.selectedIds.splice(index, 1)
            }
        },
    },
})

export default measureSlice

export const { addMeasure, removeMeasure, setAngle, setInputInFocus, setMove, setRadius, setSelectedMeasure, toggleSelectMeasure } = measureSlice.actions

interface MiddlewareApiConfig {
  state: RootState
}

export const measureSliceListenerMiddleware = createListenerMiddleware<MiddlewareApiConfig>()

measureSliceListenerMiddleware.startListening({
	actionCreator: addMeasure,
    effect: (action, listenerApi) => {
        const { state } = listenerApi.getState()
        console.log(state);
    },
    
})