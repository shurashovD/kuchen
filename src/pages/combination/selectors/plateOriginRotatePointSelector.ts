import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'src/stores/appStore'
import { changeOriginPolarPoints } from 'src/utils'
import { pointOrthoToPolar } from 'src/utils/coordsTransform'

const measureOriginSelector = createSelector(
  (state: RootState) => state.combinationPageCanvasConfigSlice,
  item => item,
)
const plateOriginSelector = createSelector(
  (state: RootState) => state.combinationPagePlateCanvasConfigSlice,
  item => item,
)

export const plateOriginRotatePointSelector = createSelector(
  [measureOriginSelector, plateOriginSelector],
  (measureOrigin, plateOrigin) => {
    if (!plateOrigin.rotateOriginX || !plateOrigin.rotateOriginY) {
      return null
    }

    const x = plateOrigin.rotateOriginX
    const y = plateOrigin.rotateOriginY
    const [point] = changeOriginPolarPoints(measureOrigin, [pointOrthoToPolar({ x, y })])

    return point
  },
)
