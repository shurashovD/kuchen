import React, { useCallback, useState } from "react"
import { Box } from "@mui/material"

import { Canvas } from "src/components"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"
import { canvasClickThunk, moveThunk, onCanvasScaleChange, rotateThunk, setCanvasScale, setCanvasTranslate } from "../../slices"

import { formLineSelector, wallLineSelector } from "../../selectors"
import { LineItem } from "./LineItem"
import { FormLineItem } from "./FormLineItem"
import { PlateRotateOriginPoint } from "./PlateRotateOriginPoint"
import { pointOrthoToPolar } from "src/utils/coordsTransform"

type PointCoords = [number, number]

export const CombinationCanvas = () => {
    const [size, setSize] = useState({ height: 300, width: 300 })

    const formLines = useAppSelector(formLineSelector)
    const wallLines = useAppSelector(wallLineSelector)
    const dispatch = useAppDispatch()

    const boxMount = useCallback((box: HTMLDivElement | null) => {
        if (box) {
            if (box) {
                new ResizeObserver(([container]) => {
                    const { height, width } = container.contentRect
                    setSize({ height, width })
                    const scale = 50 / width
                    const coordsOriginTranslateX = 0.5 * width
                    const coordsOriginTranslateY = 0.4 * height
                    dispatch(setCanvasScale(scale))
                    dispatch(setCanvasTranslate({ coordsOriginTranslateX, coordsOriginTranslateY }))
                }).observe(box)
            }
        }
    }, [dispatch])

    const changeScale = useCallback((inZoom: boolean) => {
        const multy = inZoom ? 1.03 : 0.97
        dispatch(onCanvasScaleChange(multy))
    }, [dispatch])

    const onMove = useCallback(([dX, dY]: PointCoords) => {
        dispatch(moveThunk({ dX, dY }))
    }, [])

    const onRotate = useCallback((delta: PointCoords, x: number, y: number) => {
        const [deltaX, deltaY] = delta
        const start = pointOrthoToPolar({ x, y })
        const end = pointOrthoToPolar({ x: x + deltaX, y: y + deltaY })
        const alpha = start.alpha - end.alpha
        dispatch(rotateThunk(alpha))
    }, [dispatch, rotateThunk])

    const onClick = useCallback((coords: PointCoords) => {
        dispatch(canvasClickThunk(coords))
    }, [dispatch])

    return (
        <Box height="100%" ref={boxMount}>
            <Canvas changeScale={changeScale} onClick={onClick} onMove={onMove} onRotate={onRotate} height={size.height} width={size.width}>
                {formLines.map((item) => (
                    <FormLineItem
                        key={item.id}
                        {...item}
                    />
                ))}
                {wallLines.map((item) => (
                    <LineItem
                        key={item.id}
                        {...item}
                    />
                ))}
                <PlateRotateOriginPoint />
            </Canvas>
        </Box>
    )
}