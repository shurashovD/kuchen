import React, { FC } from "react"

import { Line } from "src/components"
import { LineItem as TLineItem } from "src/types"

export const LineItem: FC<TLineItem> = ({ coordinates }) => {
    return (
		<Line
			coordinates={coordinates}
			lineOptions={{ evented: false, hasBorders: false, hasControls: false, lockMovementX: true, lockMovementY: true, stroke: '#808080', strokeWidth: 2 }}
		/>
	)
}