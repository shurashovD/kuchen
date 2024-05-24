// возвращает точки конфигурации столешницы в декартовых координатах, с началом в точке А конфигурации столешницы, единицы мм;

import { createSelector } from "@reduxjs/toolkit";
import { plateConfigCanvasSettings } from "src/constants";
import { RootState } from "src/stores/appStore";

export const platePointsOrthoAbsoluteSelector = createSelector([(state: RootState) => state], ({ plateConfigurationSlice }) => {
    const { center, formFactor, left, right } = plateConfigurationSlice

    const centerWall = center.wall || plateConfigCanvasSettings.defaultCenterWall
    const centerDepth = center.depth || plateConfigCanvasSettings.defaultCenterDepth
    const leftWall = left.wall || plateConfigCanvasSettings.defaultLeftWall
    const leftDepth = left.depth || plateConfigCanvasSettings.defaultLeftDepth
    const rightWall = right.wall || plateConfigCanvasSettings.defaultRightWall
    const rightDepth = right.depth || plateConfigCanvasSettings.defaultRightDepth
    const x = 0, y = 0

    if (formFactor === "I") {
        const w = centerWall, h = centerDepth
        const A = { x, y }
        const B = { x: A.x + w, y: A.y }
        const C = { x: B.x, y: B.y + h }
        const D = { x: A.x, y: C.y }

        return [A, B, C, D]
    }

    if (formFactor === "LL") {
        const A = { x, y }
        const B = { x: A.x + centerWall, y: A.y }
        const C = { x: B.x, y: B.y + centerDepth }
        const D = { x: A.x + leftDepth, y: C.y }
        const E = { x: D.x, y: A.y + leftWall }
        const F = { x: A.x, y: E.y }

        return [A, B, C, D, E, F]
    }

    if (formFactor === "RL") {
        const A = { x, y }
        const B = { x: A.x + centerWall, y: A.y }
        const C = { x: B.x, y: B.y + rightWall }
        const D = { x: C.x - rightDepth, y: C.y }
        const E = { x: D.x, y: A.y + centerDepth }
        const F = { x: A.x, y: E.y }

        return [A, B, C, D, E, F]
    }

    if (formFactor === "U") {
        const A = { x, y }
        const B = { x: A.x + centerWall, y: A.y }
        const C = { x: B.x, y: B.y + rightWall }
        const D = { x: C.x - rightDepth, y: C.y }
        const E = { x: D.x, y: A.y + centerDepth }
        const F = { x: A.x + leftDepth, y: E.y }
        const G = { x: F.x, y: A.y + leftWall }
        const H = { x: A.x, y: G.y }

        return [A, B, C, D, E, F, G, H]
    }

    return []
})