import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";

import { plateConfigFormSelector } from "./plateConfigFormSelector";

type Coordinates = [number, number, number, number]

type ResultItem = { id: string, coordinates: Coordinates, visible: boolean }

export const plateConfigFocusLineSelector = createSelector([(state: RootState) => state, plateConfigFormSelector], ({ plateConfigurationSlice }, formPoints) => {
    function getMiddlePoint(points: { left: number, top: number }[]) {
        const [start, end] = points
        const left = start.left + (end.left - start.left) / 2
        const top = start.top + (end.top - start.top) / 2

        return { left, top }
    }

    function getCenterDepth(): Coordinates {
        function getDownPoint() {
            if (formFactor === "LL") {
                return D
            }

            if (formFactor === "U") {
                return F
            }

            return A
        }

        const { left, top } = getMiddlePoint([B, C])
        const downPoint = getDownPoint()

        return [left, top, left, downPoint.top]
    }

    function getCenterWall(): Coordinates {
        function getTopPair() {
            if ( formFactor === "LL" ) {
                return [C, D]
            }

            if ( formFactor === "U" ) {
                return [B, F]
            }

            return [A, B]
        }

        const { top } = getMiddlePoint(getTopPair())

        return [B.left, top, C.left, top]
    }

    function getLeftDepth(): Coordinates {
        if (formFactor === 'LL') {
            const { top } = getMiddlePoint([A, E])

            return [A.left, top, E.left, top]
        }

        if (formFactor === 'U') {
            const { top } = getMiddlePoint([A, G])

            return [A.left, top, G.left, top]
        }

        return [-100, -100, -100, -100]
    }

    function getLeftWall(): Coordinates {
        if (formFactor === 'LL') {
            const { left } = getMiddlePoint([A, F])

            return [left, A.top, left, B.top]
        }

        if (formFactor === 'U') {
            const { left } = getMiddlePoint([A, H])

            return [left, A.top, left, B.top]
        }

        return [-100, -100, -100, -100]
    }

    function getRightDepth(): Coordinates {
        if (formFactor === 'RL' || formFactor === 'U') {
            const { top } = getMiddlePoint([E, F])

            return [E.left, top, D.left, top]
        }

        return [-100, -100, -100, -100]
    }

    function getRightWall(): Coordinates {
        if (formFactor === 'RL' || formFactor === 'U') {
            const { left } = getMiddlePoint([D, E])

            return [left, C.top, left, D.top]
        }

        return [-100, -100, -100, -100]
    }

    const { inputInFocus, plateInFocus, formFactor } = plateConfigurationSlice
    const [A, B, C, D, E, F, G, H] = formPoints.map(({ coordinates }) => ({ left: coordinates[0], top: coordinates[1] }))

    const centerWall: ResultItem = { coordinates: getCenterWall(), id: 'center-wall-line', visible: plateInFocus === 'center' && inputInFocus === 'wall' }
    const centerDepth: ResultItem = { coordinates: getCenterDepth(), id: 'center-depth-line', visible: plateInFocus === 'center' && inputInFocus === 'depth' }
    const leftWall: ResultItem = { coordinates: getLeftWall(), id: 'left-wall-line', visible: plateInFocus === 'left' && inputInFocus === 'wall' }
    const leftDepth: ResultItem = { coordinates: getLeftDepth(), id: 'left-depth-line', visible: plateInFocus === 'left' && inputInFocus === 'depth' }
    const rightWall: ResultItem = { coordinates: getRightWall(), id: 'right-wall-line', visible: plateInFocus === 'right' && inputInFocus === 'wall' }
    const rightDepth: ResultItem = { coordinates: getRightDepth(), id: 'right-depth-line', visible: plateInFocus === 'right' && inputInFocus === 'depth' }

    return [centerWall, centerDepth, leftWall, leftDepth, rightWall, rightDepth]
})