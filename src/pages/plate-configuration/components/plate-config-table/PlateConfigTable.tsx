import React from "react"
import { Box } from "@mui/material"

import { useAppSelector } from "src/hooks/redux.hook"
import { plateConfigDimSelector } from "src/pages/plate-configuration/selectors"

import { ConnectSelect } from "./ConnectSelect"
import { FormSelect } from "./FormSelect"
import { PlateConfigInput } from "./PlateConfigInput"

export const PlateConfigTable = () => {
	const dimensions = useAppSelector(plateConfigDimSelector)

	return (
		<Box p={2} display="flex" flexDirection="column" height="100%">
			<Box>
				<FormSelect />
			</Box>
			<Box my={2}>
				<ConnectSelect />
			</Box>
			<Box pt={2} flexGrow={1} overflow="scroll">
				{dimensions.map(({ key, label, max, min, position, value }) => (
					<Box key={label} mb={2}>
						<PlateConfigInput label={label} value={value} field={key} position={position} max={max} min={min} />
					</Box>
				))}
			</Box>
		</Box>
	)
}