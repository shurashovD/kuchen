import React, { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { fabric } from "fabric"
import { Box } from "@mui/material"

import { CanvasContext } from "./CanvasContext"

type PointCoords = [number, number]

type Props = {
    children?: ReactNode
    changeScale?(inZoom: boolean): void
    height: number
    onClick?(coords: PointCoords): void
    onMove?(delta: PointCoords): void
    onRotate?(delta: PointCoords, eventX: number, eventY: number): void
    width: number
}

export const Canvas: FC<Props> = ({ children, changeScale, height, onClick, onMove, onRotate, width }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)

    const onCanvasMount = useCallback((element: HTMLCanvasElement | null) => {
        if (!element) {
            return
        }

        const container = element.closest('div')
        if (container && !canvas) {
            setCanvas(state => {
                if (state) {
                    return state
                }

                const canvas = new fabric.Canvas(element, {
                    fireRightClick: true,
                    fireMiddleClick: true,
                    selectionColor: 'transparent',
                    stopContextMenu: true,
                })
                
                return canvas
            })
        }
    }, [])

    useEffect(() => {
        if (canvas) {
            canvas.setHeight(height)
            canvas.setWidth(width)
        }
    }, [canvas, height, width])

    useEffect(() => {
        if (canvas && changeScale) {
            canvas.on('mouse:wheel', (event) => {
                changeScale(event.e.deltaY < 0)
            })
        }
    }, [canvas, changeScale])

    useEffect(() => {
        if (canvas && onClick) {
            canvas.on('mouse:up', (event) => {
                const { x, y } = event.pointer!
                onClick([x, y])
            })
        }

        if (canvas && onRotate) {
            canvas.on('mouse:move', (event) => {
                if (event.e.buttons === 2) {
                    const { movementX, movementY, x, y } = event.e
                    onRotate([movementX, movementY], x, y)
                }
            })
        }

        if (canvas && onMove) {
            canvas.on('mouse:move', (event) => {
                if (event.e.buttons === 1 && event.pointer) {
                    const { movementX, movementY } = event.e
                    onMove([movementX, movementY])
                }
            })
        }
    }, [canvas, onMove, onRotate])
    
    return (
        <CanvasContext.Provider value={{ canvas }}>
            <Box height="100%">
                <canvas ref={onCanvasMount} />
                {children}
            </Box>
        </CanvasContext.Provider>
    )
}