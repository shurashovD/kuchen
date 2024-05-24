import React from 'react'

import { Checkbox, FormControlLabel } from "@mui/material"
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook"
import { setPlateIsManipulated } from "../../slices"

export const PlateIsManipulatedCheckbox = () => {
    const { plateIsManipulated } = useAppSelector(state => state.combinationPageSlice)
    const dispatch = useAppDispatch()

    const onChange = () => {
        dispatch(setPlateIsManipulated(!plateIsManipulated))
    }

    return <FormControlLabel control={<Checkbox checked={plateIsManipulated} onChange={onChange} />} label="Двигать столешницу" />
}