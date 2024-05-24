import React from "react"
import { Grid, Paper } from "@mui/material"

import { InputMeasureCanvas, InputMeasureTable } from "src/pages/measure/components"
import { MainLayout } from "src/components"

export const MeasurePage = () => (
	<MainLayout>
		<Grid container spacing={2}>
			<Grid item xs={8} sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
					<InputMeasureCanvas />
				</Paper>
			</Grid>
			<Grid item xs={4}sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
					<InputMeasureTable />
				</Paper>
			</Grid>
		</Grid>
	</MainLayout>
)
