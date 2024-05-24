import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook'
import { canAddMeasureSelector } from 'src/pages/measure/selectors'
import { addMeasure } from 'src/pages/measure/slices'

export const AddBtn = () => {
  const canAdd = useAppSelector(canAddMeasureSelector)
  const dispatch = useAppDispatch()

  return (
    <Tooltip title="Добавить точку">
      <IconButton onClick={() => dispatch(addMeasure())} disabled={!canAdd}>
        <AddCircle color={canAdd ? 'primary' : 'disabled'} />
      </IconButton>
    </Tooltip>
  )
}
