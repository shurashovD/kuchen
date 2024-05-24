import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { RemoveCircle } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook'
import { removeMeasure } from 'src/pages/measure/slices'

export const RmBtn = () => {
  const canRemove = useAppSelector(state => state.measureSlice.selectedIds.length === 1)
  const dispatch = useAppDispatch()

  return (
    <Tooltip title="Удалить точку">
      <IconButton disabled={!canRemove} onClick={() => dispatch(removeMeasure())}>
        <RemoveCircle color={canRemove ? 'primary' : 'disabled'} />
      </IconButton>
    </Tooltip>
  )
}
