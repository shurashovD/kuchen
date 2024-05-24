import React from "react"
import { Grid } from "@mui/material"

import { Item } from "./Item"
import { useAppSelector } from "src/hooks/redux.hook"

export const MeasureList = () => {
	const { measures } = useAppSelector(state => state.measureSlice)

    return (
		<Grid container spacing={1}>
			{measures.map((item) => (
				<Grid item key={item.id} xs={12}>
					<Item id={item.id} />
				</Grid>
			))}
		</Grid>
	)
}