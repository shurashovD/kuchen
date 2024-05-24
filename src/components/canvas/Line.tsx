import { FC, useContext, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { ILineOptions, IEvent } from "fabric/fabric-impl"

import { CanvasContext } from "./CanvasContext"

type Props = {
    coordinates: [number, number, number, number]
    lineOptions: ILineOptions
    id?: string | number
    onMove?(left: number, top: number): void
    onSelect?(event: IEvent, id: string | number): void
}

export const Line: FC<Props> = (props) => {
    const { canvas } = useContext(CanvasContext)
    const lineRef = useRef<fabric.Line | null>(null)

    useEffect(() => {
        if (canvas) {
            const line = new fabric.Line(props.coordinates, props.lineOptions)
            canvas.add(line)
            line.moveTo(0)
            line.on('selected', event => {
                if (props.id && props.onSelect) {
                    props.onSelect(event, props.id)
                }
            })

            lineRef.current = line
        }
    }, [canvas])

    useEffect(() => {
        if (canvas && lineRef.current && props.coordinates.length === 4) {
            const [x1, y1, x2, y2] = props.coordinates
            lineRef.current.set('x1', x1)
            lineRef.current.set('x2', x2)
            lineRef.current.set('y1', y1)
            lineRef.current.set('y2', y2)
            lineRef.current.setCoords()
            canvas.renderAll()
        }
    }, [canvas, props.coordinates])

    useEffect(() => {
        if (canvas && lineRef.current) {
            lineRef.current.set('stroke', props.lineOptions.stroke)
            canvas.renderAll()
        }
    }, [canvas, props.lineOptions.stroke])

    useEffect(() => {
        if (canvas && lineRef.current) {
            lineRef.current.set('strokeWidth', props.lineOptions.strokeWidth)
            canvas.renderAll()
        }
    }, [canvas, props.lineOptions.strokeWidth])

    useEffect(() => {
        if (canvas && lineRef.current) {
            lineRef.current.set('strokeDashArray', props.lineOptions.strokeDashArray)
            canvas.renderAll()
        }
    }, [canvas, props.lineOptions.strokeDashArray])

    /*
    useEffect(() => {
        if (canvas && lineRef.current && props.onMove) {
            lineRef.current.on('moving', () => {
                if (lineRef.current && lineRef.current.left && lineRef.current.top && props.onMove) {
                    props.onMove(lineRef.current.left, lineRef.current.top)
                }
            })
        }
    }, [canvas, props.onMove]) */

    useEffect(() => {
        return () => {
            if (canvas && lineRef.current) {
                canvas.remove(lineRef.current)
                canvas.renderAll()
            }
        }
    }, [])  // eslint-disable-line

    return null
}