import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/appStore';
import { OrthoCoord } from 'src/types';

import { devicePositionSelector } from './devicePositionSelector';
import { wallPointsCanvasSelector } from './wallPointsCanvasSelector';

type Point = { measureId: number } & OrthoCoord

export const deviceLinesSelector = createSelector(
    [(store: RootState) => (store), wallPointsCanvasSelector, devicePositionSelector],
    (state, points, device
) => {
    const { inputInFocus, selectedIds } = state.measureSlice
    const typedPoints = points as Point[]
    const { left, top } = device

    const radiusInFocus = (selectedIds.length === 1) && (inputInFocus === 'radius')

    return typedPoints.map(({ measureId, x, y }) => {
        const coordinates: [number, number, number, number] = [left, top, x, y]
        const isSelected = radiusInFocus && selectedIds.includes(measureId)

        return { coordinates, measureId, isSelected, id: `dl_${measureId}` }
    })
})