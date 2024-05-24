import React from 'react'
import { Box } from '@mui/material'
import { AddBtn } from './AddBtn'
import { RmBtn } from './RmBtn'

export const Menu = () => {
  return (
    <Box display="flex" justifyContent="end" overflow="scroll">
      <AddBtn />
      <RmBtn />
    </Box>
  )
}
