import React, { FC } from "react"

import { Line } from "src/components"

type Props = {
	coordinates: [number, number, number, number]
	isSelected: boolean
}

const selected = '#1976D2'

export const DeviceLine: FC<Props> = ({ coordinates, isSelected }) => {
	const stroke = isSelected ? selected : '#808080'
	const strokeWidth = isSelected ? 2 : 1

    return (
		<Line
			coordinates={coordinates}
			lineOptions={{
				evented: false,
				hasBorders: false,
				hasControls: false,
				hoverCursor: 'pointer',
				lockMovementX: true,
				lockMovementY: true,
				stroke,
				strokeDashArray: [strokeWidth, 4],
				strokeWidth,
			}}
		/>
	)
}