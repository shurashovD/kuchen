import React, { useCallback } from "react"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"
import { PlateConfigurationState } from "src/types"
import { plateConfigConnectSelector } from "src/pages/plate-configuration/selectors"

import { setPlateConfigurationConnect } from "../../slices"

export const ConnectSelect = () => {
    const connect = useAppSelector(plateConfigConnectSelector)
    const dispatch = useAppDispatch()

    const handleChange = useCallback((event: SelectChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "") {
            dispatch(setPlateConfigurationConnect(null))
            return
        }
        if (event.target.value) {
            dispatch(setPlateConfigurationConnect(event.target.value as PlateConfigurationState['connect']))
        }
    }, [dispatch])

    if (!connect) {
        return null
    }

    const { options, value } = connect

    return (
        <FormControl fullWidth variant="standard">
            <InputLabel>Сопряжение</InputLabel>
            <Select
                value={value as ''}
                onChange={handleChange}
            >
                {options.map(({ label, value }) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
                <MenuItem value="">Не выбрано</MenuItem>
            </Select>
        </FormControl>
    )
}