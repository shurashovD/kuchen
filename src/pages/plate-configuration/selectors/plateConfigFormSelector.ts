import { createSelector } from "@reduxjs/toolkit";

import { platePointsOrthoAbsoluteSelector } from "src/selectors";
import { RootState } from "src/stores/appStore";
import { pointOrthoTranslate, scaleOrthoPoints } from "src/utils/coordsTransform";

import { plateConfigCanvasScaleSelector } from "./plateConfigCanvasScaleSelector";

type Coordinates = [number, number, number, number]
type ResultItem = { id: string, coordinates: Coordinates }

export const plateConfigFormSelector = createSelector(
    [(state: RootState) => state, platePointsOrthoAbsoluteSelector, plateConfigCanvasScaleSelector],
    ({ plateConfigCanvasSlice }, points, scale) => {
    function getLines(points: { x: number, y: number }[]) {
        return points.reduce<ResultItem[]>((acc, item, index) => {
            const prevIndex = index === 0 ? points.length - 1 : index-1
            const prevPoint = points[prevIndex]
            const id = `fl-${index}`
            acc.push({ id, coordinates: [prevPoint.x, prevPoint.y, item.x, item.y] })
            return acc
        }, [])
    }

    const { height, width } = plateConfigCanvasSlice
    const scaledPoints = scaleOrthoPoints(points, scale)
    const plateWidth = Math.max(...scaledPoints.map(({ x }) => x), 0)
    const plateHeight = Math.max(...scaledPoints.map(({ y }) => y), 0)
    const translateX = (width - plateWidth) / 2
    const translateY = (height - plateHeight) / 2
    const targetPoints = scaledPoints.map((item) => pointOrthoTranslate(item, translateX, translateY))
    
    return getLines(targetPoints)
})