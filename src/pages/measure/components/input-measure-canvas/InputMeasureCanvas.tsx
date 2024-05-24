import React, { useCallback } from "react"
import { Box } from "@mui/material"
import { IEvent } from "fabric/fabric-impl"

import { Canvas, Point } from "src/components"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"

import { deviceLinesSelector, devicePositionSelector, pointSelector, wallLineSelector } from "../../selectors"
import { LineItem } from "./LineItem"
import { DeviceLine } from "./DeviceLine"
import { PointItem } from "./PointItem"
import { changeDevicePosition, changeMeasureCanvasRotate, changeMeasureCanvasScale, measureCanvasConfigRotateOn, measureCanvasConfigSetMmInPx, setMeasureCanvasConfigRotate, setMeasureCanvasConfigScale, setMeasureCanvasConfigTranslate, setMeasureCanvasSize } from "../../slices"

type PointCoords = [number, number]

export const InputMeasureCanvas = () => {
    const deviceLines = useAppSelector(deviceLinesSelector)
    const points = useAppSelector(pointSelector)
    const position = useAppSelector(devicePositionSelector)
    const wallLines = useAppSelector(wallLineSelector)
    const { height, width } = useAppSelector(state => state.measureCanvasSlice)

    const dispatch = useAppDispatch()

    const changeScale = useCallback((inZoom: boolean) => {
        const multy = inZoom ? 1.03 : 0.97
        dispatch(changeMeasureCanvasScale(multy))
        dispatch(measureCanvasConfigSetMmInPx(multy))
    }, [dispatch])

    const onRotate = useCallback((delta: PointCoords) => {
        const [deltaX, deltaY] = delta
        const step = 0.003
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            dispatch(changeMeasureCanvasRotate(deltaX < 0 ? step : -step))
            dispatch(measureCanvasConfigRotateOn(deltaX > 0 ? step : -step))
        } else {
            dispatch(changeMeasureCanvasRotate(deltaY < 0 ? step : -step))
            dispatch(measureCanvasConfigRotateOn(deltaY > 0 ? step : -step))
        }
    }, [dispatch])

    const onDeviceMove = useCallback((left: number, top: number) => {
        dispatch(changeDevicePosition({ left, top }))
        dispatch(setMeasureCanvasConfigTranslate({ coordsOriginTranslateX: left, coordsOriginTranslateY: top }))
    }, [dispatch])

    function pointSelectHandler(event: IEvent) {
        console.log(event.target);
    }

    const boxMount = useCallback((box: HTMLDivElement | null) => {
        if (box) {
            if (box) {
                new ResizeObserver(([container]) => {
                    const { height, width } = container.contentRect
                    const scale = 110 / width
                    const coordsOriginTranslateX = 0.5 * width
                    const coordsOriginTranslateY = 0.95 * height
                    dispatch(setMeasureCanvasSize({ height, width }))
                    dispatch(setMeasureCanvasConfigScale(scale))
                    dispatch(setMeasureCanvasConfigTranslate({ coordsOriginTranslateX, coordsOriginTranslateY }))
                    dispatch(setMeasureCanvasConfigRotate(-0.75 * Math.PI))
                }).observe(box)
            }
        }
    }, [dispatch])

    return (
        <Box height="100%" ref={boxMount}>
            <Canvas changeScale={changeScale} onRotate={onRotate} height={height} width={width}>
                {deviceLines.map((item) => (
                    <DeviceLine
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
                <Point
                    circleOptions={{ fill: '#808080', hasBorders: false, hasControls: false, radius: 8, originX: 'center', originY: 'center', ...position }}
                    onMove={onDeviceMove}
                    onSelect={pointSelectHandler}
                />
                { points.map((item) => (<PointItem key={item.measureId} {...item} />)) }
            </Canvas>
        </Box>
    )
}