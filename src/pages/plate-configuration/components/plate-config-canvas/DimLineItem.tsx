import React, { FC, Fragment } from "react"

import { Line } from "src/components"

type Props = {
	id?: string
	coordinates: [number, number, number, number]
	visible: boolean
}

export const DimLineItem: FC<Props> = ({ coordinates, id, visible }) => {
	const [startLeft, startTop, endLeft, endTop] = coordinates

	if (!visible) {
		return null
	}

    return (
		<Fragment>
			<Line
				coordinates={[startLeft + 5, startTop - 5, startLeft - 5, startTop + 5]}
				lineOptions={{
					evented: false,
					hasBorders: false,
					hasControls: false,
					hoverCursor: 'default',
					lockMovementX: true,
					lockMovementY: true,
					stroke: '#1976D2',
					strokeWidth: 1,
				}}
			/>
			<Line
				coordinates={[endLeft + 5, endTop - 5, endLeft - 5, endTop + 5]}
				lineOptions={{
					evented: false,
					hasBorders: false,
					hasControls: false,
					hoverCursor: 'default',
					lockMovementX: true,
					lockMovementY: true,
					stroke: '#1976D2',
					strokeWidth: 1,
				}}
			/>
			<Line
				coordinates={coordinates}
				id={id}
				lineOptions={{
					evented: false,
					hasBorders: false,
					hasControls: false,
					hoverCursor: 'default',
					lockMovementX: true,
					lockMovementY: true,
					stroke: '#1976D2',
					strokeWidth: 1,
					strokeDashArray: [10, 4],
				}}
			/>
		</Fragment>
	)
}