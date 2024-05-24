import React from "react"

import { Point } from "src/components"
import { useAppSelector } from "src/hooks/redux.hook"

import { plateOriginRotatePointSelector } from "../../selectors"

export const PlateRotateOriginPoint = () => {
    const point = useAppSelector(plateOriginRotatePointSelector)
    const { plateIsManipulated } = useAppSelector(state => state.combinationPageSlice)
    const fill = '#ff0000'

    if (!plateIsManipulated || point === null) {
        return null
    }

    return (
        <Point circleOptions={{
            fill,
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            left: point.x,
            originX: 'center',
            originY: 'center',
            radius: 5,
            top: point.y,
		}} />
    )
}