import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/appStore';
import { OrthoCoord } from 'src/types';

import { wallPointsCanvasSelector } from './wallPointsCanvasSelector';

type Point = { measureId: number } & OrthoCoord

export const wallLineSelector = createSelector([(store: RootState) => (store), wallPointsCanvasSelector], (state, points) => {
    const { inputInFocus, selectedIds } = state.measureSlice
    const moveInFocus = selectedIds.length === 1 && inputInFocus === 'move'

    const typedPoints = points as Point[]

    return typedPoints
        .slice(1)
        .reduce<Point[][]>((acc, item, index) => [...acc, [typedPoints[index], item]], [])
        .map(([start, end]) => {
            const { x: x1, y: y1 } = start
            const { x: x2, y: y2, measureId } = end
            const coordinates = [x1, y1, x2, y2] as [number, number, number, number]
            const isSelected = selectedIds.includes(measureId) && moveInFocus

            return { id: `wl_${measureId}`, coordinates, isSelected, measureId }
        })
})