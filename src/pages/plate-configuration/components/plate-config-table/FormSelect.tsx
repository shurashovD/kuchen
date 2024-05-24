import React, { useCallback } from "react"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"
import { PlateConfigurationState } from "src/types"

import { setPlateConfigurationFormFactor } from "../../slices"

export const FormSelect = () => {
    const { formFactor } = useAppSelector(state => state.plateConfigurationSlice)
    const dispatch = useAppDispatch()

    const handleChange = useCallback((event: SelectChangeEvent<HTMLSelectElement>) => {
        if (event.target.value) {
            dispatch(setPlateConfigurationFormFactor(event.target.value as PlateConfigurationState['formFactor']))
        }
    }, [dispatch])

    return (
        <FormControl fullWidth variant="standard">
            <InputLabel>Форма</InputLabel>
            <Select
                value={formFactor as ''}
                onChange={handleChange}
            >
                <MenuItem value="I">Прямая</MenuItem>
                <MenuItem value="LL">Угловая левая</MenuItem>
                <MenuItem value="RL">Угловая правая</MenuItem>
                <MenuItem value="U">Полукруг</MenuItem>
            </Select>
        </FormControl>
    )
}