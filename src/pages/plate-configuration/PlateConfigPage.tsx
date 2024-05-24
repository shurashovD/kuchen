import React from "react"
import { Grid, Paper } from "@mui/material"

import { MainLayout } from "src/components"

import { PlateConfigTable } from "./components/plate-config-table/PlateConfigTable"
import { PlateConfigCanvas } from "./components/plate-config-canvas/PlateConfigCanvas"

export const PlateConfigPage = () => (
	<MainLayout>
		<Grid container spacing={2}>
			<Grid item xs={8} sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
					<PlateConfigCanvas />
				</Paper>
			</Grid>
			<Grid item xs={4}sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
					<PlateConfigTable />
				</Paper>
			</Grid>
		</Grid>
	</MainLayout>
)