import React from 'react'

import { Box, Button, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook'

import { setPlateCanvasRotateOrigin, setRotateOriginPointSetModeEnabled } from '../../slices'
import { formPointsSelector } from '../../selectors'
import { setPlateCanvasTranslate } from '../../slices/plate-origin/plateCanvasConfigSlice'

export const PlateRotateOriginDialog = () => {
  const { plateIsManipulated, rotateOriginPointSetModeEnabled } = useAppSelector(
    state => state.combinationPageSlice,
  )
  const { rotateOriginX, rotateOriginY } = useAppSelector(
    state => state.combinationPagePlateCanvasConfigSlice,
  )
  const formPoints = useAppSelector(formPointsSelector)
  const dispatch = useAppDispatch()

  const rotateOriginIsUndefined = rotateOriginX === null || rotateOriginY === null

  const removeRotatePoint = () => {
    dispatch(setPlateCanvasRotateOrigin({ rotateOriginX: null, rotateOriginY: null }))
    if (formPoints.length) {
      const [{ x, y }] = formPoints
      dispatch(setPlateCanvasTranslate({ coordsOriginTranslateX: x, coordsOriginTranslateY: y }))
    }
  }

  if (!plateIsManipulated) {
    return null
  }

  return (
    <Box>
      <Typography variant="h6">Точка вращения столешницы</Typography>
      {rotateOriginIsUndefined && !rotateOriginPointSetModeEnabled && (
        <Button
          onClick={() => dispatch(setRotateOriginPointSetModeEnabled(true))}
          variant="outlined"
        >
          Выбрать
        </Button>
      )}
      {rotateOriginIsUndefined && rotateOriginPointSetModeEnabled && (
        <Typography>Выберите точку на холсте</Typography>
      )}
      {!rotateOriginIsUndefined && (
        <Button onClick={removeRotatePoint} variant="outlined">
          Удалить точку вращения столешницы
        </Button>
      )}
    </Box>
  )
}
