import React from 'react'
import { Box, Divider } from '@mui/material'

import { Menu } from './menu'
import { MeasureList } from './table/MeasureList'

export const InputMeasureTable = () => {
  return (
    <Box p={1} display="flex" flexDirection="column" height="100%">
      <Box>
        <Menu />
      </Box>
      <Box>
        <Divider />
      </Box>
      <Box pt={2} flexGrow={1} overflow="scroll">
        <MeasureList />
      </Box>
    </Box>
  )
}
