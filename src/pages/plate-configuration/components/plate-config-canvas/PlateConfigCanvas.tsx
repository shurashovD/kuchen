import React, { useCallback } from "react"
import { Box } from "@mui/material"

import { Canvas } from "src/components"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"

import { plateConfigConnectLinesSelector, plateConfigFocusLineSelector, plateConfigFormSelector } from "../../selectors"
import { setPlateConfigCanvasScale, setPlateConfigCanvasSize } from "../../slices"
import { LineItem } from "./LineItem"
import { DimLineItem } from "./DimLineItem"

export const PlateConfigCanvas = () => {
    const connectLines = useAppSelector(plateConfigConnectLinesSelector)
    const focusLines = useAppSelector(plateConfigFocusLineSelector)
    const formLines = useAppSelector(plateConfigFormSelector)
    const { height, width } = useAppSelector(state => state.plateConfigCanvasSlice)

    const dispatch = useAppDispatch()

    const changeScale = useCallback((inZoom: boolean) => {
        const multy = inZoom ? 1.03 : 0.97
        dispatch(setPlateConfigCanvasScale(multy))
    }, [dispatch])

    const boxMount = useCallback((box: HTMLDivElement | null) => {
        if (box) {
            new ResizeObserver(([container]) => {
                const { height, width } = container.contentRect
                dispatch(setPlateConfigCanvasSize({ height, width }))
            }).observe(box)
        }
    }, [dispatch])

    return (
        <Box height="100%" ref={boxMount}>
            <Canvas changeScale={changeScale} height={height} width={width}>
                {connectLines.map(({ coordinates, id }) => <LineItem coordinates={coordinates} key={id} />)}
                {focusLines.map(({ coordinates, id, visible }) => <DimLineItem coordinates={coordinates} key={id} visible={visible} />)}
                {formLines.map(({ coordinates, id }) => <LineItem coordinates={coordinates} key={id} />)}
            </Canvas>
        </Box>
    )
}