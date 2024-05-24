import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/stores/appStore";
import { platePointsOrthoAbsoluteSelector, plateConnectAbsolutePointsSelector } from "src/selectors";
import { plateConfigCanvasScaleSelector } from "./plateConfigCanvasScaleSelector";
import { pointOrthoTranslate, scaleOrthoPoints } from "src/utils/coordsTransform";

type Coordinates = [number, number, number, number]

type ResultItem = { id: string, coordinates: Coordinates }

const plateConfigCanvasSlice = createSelector(
    ({ plateConfigCanvasSlice }: RootState) => plateConfigCanvasSlice,
    ({ height, width }) => ({ height, width })
)

export const plateConfigConnectLinesSelector = createSelector(
    [plateConfigCanvasSlice, plateConnectAbsolutePointsSelector, platePointsOrthoAbsoluteSelector, plateConfigCanvasScaleSelector],
    ({ height, width }, points, formPoints, scale) => {
        function getLines(points: { x: number, y: number }[]) {
            return points.slice(1).reduce<Omit<ResultItem, 'id'>[]>((acc, item, index) => {
                const prevPoint = points[index]
                acc.push({ coordinates: [prevPoint.x, prevPoint.y, item.x, item.y] })
                return acc
            }, [])
        }

        const scaledFormPoints = scaleOrthoPoints(formPoints, scale)
        const scaledPoints = scaleOrthoPoints(points, scale)
        const plateWidth = Math.max(...scaledFormPoints.map(({ x }) => x), 0)
        const plateHeight = Math.max(...scaledFormPoints.map(({ y }) => y), 0)
        const translateX = (width - plateWidth) / 2
        const translateY = (height - plateHeight) / 2
        const targetPoints = scaledPoints.map((item) => pointOrthoTranslate(item, translateX, translateY))

        const firstConnectPoints = targetPoints.slice(0, 3)
        const secondConnectPoints = targetPoints.slice(3)

        return [...getLines(firstConnectPoints), ...getLines(secondConnectPoints)]
            .map<ResultItem>((item, index) => ({ ...item, id: `cl-${index}` }))
    }
)