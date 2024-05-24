import { createSelector } from '@reduxjs/toolkit';

import { LineItem, OrthoCoord } from 'src/types';

import { wallPointsCanvasSelector } from './wallPointsCanvasSelector';

type Point = { measureId: number } & OrthoCoord

export const wallLineSelector = createSelector(wallPointsCanvasSelector, points => {
    const typedPoints = points as Point[]

    return typedPoints
        .slice(1)
        .reduce<Point[][]>((acc, item, index) => [...acc, [typedPoints[index], item]], [])
        .map<LineItem>(([start, end]) => {
            const { x: x1, y: y1 } = start
            const { x: x2, y: y2, measureId } = end
            const coordinates = [x1, y1, x2, y2] as [number, number, number, number]

            return { id: `wl_${measureId}`, coordinates }
        })
})