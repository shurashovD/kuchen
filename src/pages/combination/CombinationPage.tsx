import React from "react"
import { Grid, Paper } from "@mui/material"

import { MainLayout } from "src/components"
import { CombinationCanvas, CombinationPageControls } from "./components"

export const CombinationPage = () => (
	<MainLayout>
		<Grid container spacing={2}>
			<Grid item xs={8} sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
                    <CombinationCanvas />
				</Paper>
			</Grid>
			<Grid item xs={4}sx={{ height: "100%" }}>
				<Paper sx={{ height: "100%" }}>
					<CombinationPageControls />
				</Paper>
			</Grid>
		</Grid>
	</MainLayout>
)