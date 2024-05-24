import React, { FC } from "react"
import { IEvent } from "fabric/fabric-impl"

import { useAppDispatch } from "src/hooks/redux.hook"
import { Point, Text } from "src/components"

import { setSelectedMeasure } from "../../slices"

type Props = {
	isSelected: boolean
	left: number
	litera: string | null
	measureId: number
	top: number
}

const selected = '#1976D2'

export const PointItem: FC<Props> = ({ isSelected, left, litera, measureId, top }) => {
	const dispatch = useAppDispatch()

    function pointSelectHandler(event: IEvent, id: number) {
		dispatch(setSelectedMeasure({ id }))
    }

	const fill = isSelected ? selected : '#808080'

    return (
		<>
			{litera && <Text
				textOptions={{ fill, fontFamily: 'Sans-serif', fontSize: 18, hasBorders: false, hasControls: false, left: left - 18, top: top - 20 }}
				value={litera}
			/>}
			<Point
				circleOptions={{
					data: { id: measureId },
					fill,
					hasBorders: false,
					hasControls: false,
					lockMovementX: true,
					lockMovementY: true,
					left,
					hoverCursor: 'pointer',
					originX: 'center',
					originY: 'center',
					radius: 5,
					top
				}}
				id={measureId}
				onSelect={pointSelectHandler}
			/>
		</>
		)
}