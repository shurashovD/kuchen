import { createSelector } from "@reduxjs/toolkit" 
import { LITERAS } from "src/constants"
import { RootState } from "src/stores/appStore"
import { Measure } from "src/types"

type Res = {
    litera: string
    angleLabel: string
    moveLabel: string
    moveMax: number
    moveMin: number
    radiusLabel: string
    isSelected: boolean
} & Measure

export const measureSelector = (id: number) => createSelector((state: RootState) => state.measureSlice, ({ measures, selectedIds }) => {
    function getAngleLabel(index: number) {
        if (index === 0) {
            return ''
        }

        const litera = LITERAS[index]
		const prevLitera = LITERAS[index - 1]
        return `${prevLitera}0${litera}`
    }

    function getMoveMax(index: number) {
        if (index === 0) {
            return 0
        }

        const measure = measures[index]
        const prevMeasure = measures[index-1]
        return measure.radius + prevMeasure.radius
    }

    function getMoveMin(index: number) {
		if (index === 0) {
			return 0
		}

		const measure = measures[index]
		const prevMeasure = measures[index - 1]
        const longRadius = Math.max(measure.radius, prevMeasure.radius)
        const shortRadius = Math.min(measure.radius, prevMeasure.radius)
		return longRadius - shortRadius
	}

    const index = measures.findIndex(item => item.id === id)
    if (index === -1) {
        return null
    }

    const measure = measures[index]
    const { angle, move, radius } = measure
    
    const litera = LITERAS[index]
    const prevLitera = index === 0 ? litera : LITERAS[index-1]
    const moveLabel = index === 0 ? "" : `${prevLitera}${litera}`
    const moveMax = getMoveMax(index)
    const moveMin = getMoveMin(index)
    const angleLabel = getAngleLabel(index)
    const radiusLabel = `0${litera}`
    const isSelected = selectedIds.includes(id)

    const res: Res = {
        angle, angleLabel, id, isSelected, litera, move, moveMax, moveMin, moveLabel, radius, radiusLabel
    }
    return res
})