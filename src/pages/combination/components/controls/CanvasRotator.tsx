import React from 'react'

import { Box, Slider, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook'
import { rotateThunk } from '../../slices'

export const CanvasRotator = () => {
    const { rotateRad } = useAppSelector(state => state.combinationPageCanvasConfigSlice)
    const { rotateRad: plateRotatedRad } = useAppSelector(state => state.combinationPagePlateCanvasConfigSlice)
    const { plateIsManipulated } = useAppSelector(state => state.combinationPageSlice)
    const dispatch = useAppDispatch()

    const max = plateIsManipulated ? 2 * Math.PI : 0
    const min = plateIsManipulated ? 0 : -2 * Math.PI
    const title = `Угол поворота ${plateIsManipulated ? 'столешницы' : 'эскиза'}`
    const value = plateIsManipulated ? plateRotatedRad : rotateRad

    return (
        <Box>
            <Typography>{title}</Typography>
            <Slider
                max={max}
                min={min}
                onChange={(_, value) => dispatch(rotateThunk(+value))}
                step={0.001}
                value={value}
            />
        </Box>
    )
}