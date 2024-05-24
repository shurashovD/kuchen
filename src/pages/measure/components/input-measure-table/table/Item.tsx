import React, { FC, FocusEventHandler } from "react"
import { Button, Grid } from "@mui/material"

import { MeasureInput } from "./MeasureInput"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"
import { measureSelector } from "src/pages/measure/selectors"
import { MeasureState } from "src/types"
import { setAngle, setInputInFocus, setMove, setRadius, setSelectedMeasure, toggleSelectMeasure } from "src/pages/measure/slices"

export const Item: FC<{id: number}> = ({ id }) => {
	const measure = useAppSelector(measureSelector(id))
	const dispatch = useAppDispatch()

	const onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
		dispatch(setSelectedMeasure({ id }))
		dispatch(setInputInFocus(event.target.name as MeasureState['inputInFocus']))
	}

	if (!measure) {
		console.error('Замер не найден')
		return null
	}

    return (
		<Grid container spacing={1} columns={10}>
			<Grid item xs={1} display="flex" alignItems="stretch">
				<Button
					size="small"
					variant={measure.isSelected ? "contained" : "outlined"}
					style={{ minWidth: 0 }}
					onClick={() => dispatch(toggleSelectMeasure({ id }))}
				>
					{measure.litera}
				</Button>
			</Grid>
			<Grid item xs={3}>
				<MeasureInput
					measure={measure.radius}
					name="radius"
					changeHandler={(radius) => dispatch(setRadius({ id, radius }))}
					label={measure.radiusLabel}
					onFocus={onFocus}
				/>
			</Grid>
			<Grid item xs={3}>
				{measure.moveLabel && (
					<MeasureInput
						max={measure.moveMax}
						min={measure.moveMin}
						measure={measure.move}
						name="move"
						changeHandler={(move) => dispatch(setMove({ id, move }))}
						label={measure.moveLabel}
						onFocus={onFocus}
					/>
				)}
			</Grid>
			<Grid item xs={3}>
				{measure.angleLabel && (
					<MeasureInput
						measure={measure.angle}
						name="angle"
						changeHandler={(angle) => dispatch(setAngle({ angle, id }))}
						label={measure.angleLabel}
						onFocus={onFocus}
					/>
				)}
			</Grid>
		</Grid>
	)
}