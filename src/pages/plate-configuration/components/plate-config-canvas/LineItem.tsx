import React, { FC } from "react"

import { Line } from "src/components"

const selected = '#1976D2'

type Props = {
	id?: string
	coordinates: [number, number, number, number]
}

export const LineItem: FC<Props> = ({ coordinates, id }) => {
	// const stroke = isSelected ? selected : '#808080'
	const stroke = '#808080'

    return (
		<Line
			coordinates={coordinates}
			id={id}
			lineOptions={{ hasBorders: false, hasControls: false, hoverCursor: 'pointer', lockMovementX: true, lockMovementY: true, stroke, strokeWidth: 2 }}
		/>
	)
}