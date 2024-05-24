import { FC, useContext, useEffect, useRef } from "react"
import { fabric } from "fabric"
import { IEvent, ITextOptions } from "fabric/fabric-impl"

import { CanvasContext } from "./CanvasContext"

type Props = {
    textOptions: ITextOptions
    id?: number
    onSelect?(event: IEvent, id: number): void
    value: string
}

export const Text: FC<Props> = (props) => {
    const { canvas } = useContext(CanvasContext)
    const textRef = useRef<fabric.Text | null>(null)

    useEffect(() => {
        if (canvas) {
            const text = new fabric.Text(props.value, props.textOptions)
            canvas.add(text)
            text.moveTo(2)
            text.on('selected', event => {
                if (props.id && props.onSelect) {
                    props.onSelect(event, props.id)
                }
            })

            textRef.current = text
        }
    }, [canvas])

    useEffect(() => {
        if (canvas && textRef.current) {
            textRef.current.set('left', props.textOptions.left)
            textRef.current.set('top', props.textOptions.top)
            textRef.current.setCoords()
            canvas.renderAll()
        }
    }, [canvas, props.textOptions.left, props.textOptions.top])

    useEffect(() => {
        if (canvas && textRef.current) {
            textRef.current.set('fill', props.textOptions.fill)
            canvas.renderAll()
        }
    }, [canvas, props.textOptions.fill])

    useEffect(() => {
        return () => {
            if (canvas && textRef.current) {
                canvas.remove(textRef.current)
            }
        }
    }, [])  // eslint-disable-line

    return null
}