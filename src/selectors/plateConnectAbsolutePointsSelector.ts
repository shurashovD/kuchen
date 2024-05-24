// возвращает точки сопряжения столешниц конфигурации столешницы в декартовых координатах, с началом в точке А конфигурации столешницы, единицы мм;

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/stores/appStore";
import { platePointsOrthoAbsoluteSelector } from "./platePointsOrthoAbsoluteSelector";
import { OrthoCoord } from "src/types";
import { plateConfigCanvasSettings } from "src/constants";

const plateConfigurationSliceSelector = createSelector(
    ({ plateConfigurationSlice }: RootState) => plateConfigurationSlice,
    ({ connect, formFactor }) => ({ connect, formFactor })
)

export const plateConnectAbsolutePointsSelector = createSelector(
    [plateConfigurationSliceSelector, platePointsOrthoAbsoluteSelector],
    ({ connect, formFactor }, points) => {
        function getPoints({ x, y }: OrthoCoord, basePoint: OrthoCoord, shift: number, isVertical = false) {
            const D = { x, y }
            const E = { x: x + shift, y: y - Math.abs(shift) }

            const lastX = isVertical ? E.x : basePoint.x
            const lastY = isVertical ? basePoint.y : E.y

            const F = { x: lastX, y: lastY }
            
            return [D, E, F]
        }

        const shift = plateConfigCanvasSettings.connectShift
        const [A, B] = points
        const leftInternalAnglePoint = points[points.length - 3]
        const rightInternalAnglePoint = points[4]

        if (formFactor === "LL") {

            if (connect === 'LEFT-ROUND') {
                return getPoints(leftInternalAnglePoint, A, -shift)
            }

            if (connect === 'RIGHT-ROUND') {
                return getPoints(leftInternalAnglePoint, A, -shift, true)
            }
        }

        if (formFactor === "RL") {
            if (connect === 'LEFT-ROUND') {
                return getPoints(rightInternalAnglePoint, B, shift, true)
            }

            if (connect === 'RIGHT-ROUND') {
                return getPoints(rightInternalAnglePoint, B, shift)
            }
        }

        if (formFactor === "U") {
            if (connect === 'LEFT-ROUND') {
                return [
                    ...getPoints(leftInternalAnglePoint, A, -shift),
                    ...getPoints(rightInternalAnglePoint, B, shift, true)
                ]
            }

            if (connect === 'RIGHT-ROUND') {
                return [
                    ...getPoints(leftInternalAnglePoint, A, -shift, true),
                    ...getPoints(rightInternalAnglePoint, B, shift)
                ]
            }

            if (connect === 'GRIP') {
                return [
                    ...getPoints(leftInternalAnglePoint, A, -shift, true),
                    ...getPoints(rightInternalAnglePoint, B, shift, true)
                ]
            }

            if (connect === 'PORT') {
                return [
                    ...getPoints(leftInternalAnglePoint, A, -shift),
                    ...getPoints(rightInternalAnglePoint, B, shift)
                ]
            }
        }

        return []
    }
)