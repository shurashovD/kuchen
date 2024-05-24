import React, { FC } from "react"
import { IEvent } from "fabric/fabric-impl"

import { Line } from "src/components"

type Props = {
	coordinates: [number, number, number, number]
	isSelected: boolean
	measureId: number
}

const selected = '#1976D2'

export const LineItem: FC<Props> = ({ coordinates, isSelected, measureId }) => {
    function lineSelectHandler(event: IEvent, id: number) {
    }

	const stroke = isSelected ? selected : '#808080'

    return (
		<Line
			coordinates={coordinates}
			lineOptions={{ hasBorders: false, hasControls: false, hoverCursor: 'pointer', lockMovementX: true, lockMovementY: true, stroke, strokeWidth: 2 }}
		/>
	)
}