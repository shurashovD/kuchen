import { createSelector } from "@reduxjs/toolkit"

import { LITERAS } from "src/constants"
import { RootState } from "src/stores/appStore"
import { OrthoCoord } from "src/types"

import { wallPointsCanvasSelector } from "./wallPointsCanvasSelector"

type Res = {
    isSelected: boolean
    left: number
    litera: string | null
    measureId: number
    top: number
}

type Point = { measureId: number } & OrthoCoord

export const pointSelector = createSelector([(state: RootState) => state, wallPointsCanvasSelector], (state, points) => {
    const { selectedIds } = state.measureSlice
    const typedPoints = points as Point[]

    return typedPoints.map<Res>(({ measureId, x: left, y: top }, index) => {
        const isSelected = selectedIds.includes(measureId)
        const litera = LITERAS[index]

        return { isSelected, left, litera, measureId, top }
    })
})