import { FC, useContext, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { ICircleOptions, IEvent } from "fabric/fabric-impl"

import { CanvasContext } from "./CanvasContext"

type Props = {
    circleOptions: ICircleOptions
    id?: number
    onMove?(left: number, top: number): void
    onSelect?(event: IEvent, id: number): void
}

export const Point: FC<Props> = (props) => {
    const { canvas } = useContext(CanvasContext)
    const circleRef = useRef<fabric.Circle | null>(null)

    useEffect(() => {
        if (canvas) {
            const circle = new fabric.Circle(props.circleOptions)
            canvas.add(circle)
            circle.moveTo(1)
            circle.on('selected', event => {
                if (props.id && props.onSelect) {
                    props.onSelect(event, props.id)
                }
            })

            circleRef.current = circle
        }
    }, [canvas])

    useEffect(() => {
        if (canvas && circleRef.current) {
            circleRef.current.set('left', props.circleOptions.left)
            circleRef.current.set('top', props.circleOptions.top)
            circleRef.current.setCoords()
            canvas.renderAll()
        }
    }, [canvas, props.circleOptions.left, props.circleOptions.top])

    useEffect(() => {
        if (canvas && circleRef.current) {
            circleRef.current.set('fill', props.circleOptions.fill)
            canvas.renderAll()
        }
    }, [canvas, props.circleOptions.fill])

    useEffect(() => {
        if (canvas && circleRef.current && props.onMove) {
            circleRef.current.on('moving', () => {
                if (circleRef.current && circleRef.current.left && circleRef.current.top && props.onMove) {
                    props.onMove(circleRef.current.left, circleRef.current.top)
                }
            })
        }
    }, [canvas, props.onMove])

    useEffect(() => {
        return () => {
            if (canvas && circleRef.current) {
                canvas.remove(circleRef.current)
            }
        }
    }, [])  // eslint-disable-line

    return null
}