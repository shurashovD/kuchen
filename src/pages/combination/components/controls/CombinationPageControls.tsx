import React from 'react'

import { Box, Divider } from '@mui/material'
import { PlateIsManipulatedCheckbox } from './PlateIsManipulatedCheckbox'
import { CanvasRotator } from './CanvasRotator'

export const CombinationPageControls = () => {
  return (
    <Box p={2} display="flex" flexDirection="column" height="100%">
      <Box>
        <PlateIsManipulatedCheckbox />
      </Box>
      <Box my={2}>
        <Divider />
      </Box>
      <Box>
        <CanvasRotator />
      </Box>
    </Box>
  )
}
