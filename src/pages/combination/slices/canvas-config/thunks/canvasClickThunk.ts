import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from 'src/stores/appStore'
import { fromGlobalToLocalOrigin } from 'src/utils/coordsTransform'

import { setPlateCanvasRotateOrigin } from '../../plate-origin/plateCanvasConfigSlice'
import { setRotateOriginPointSetModeEnabled } from '../../combination-page/combinationPageSlice'

export const canvasClickThunk = createAsyncThunk<void, number[], { state: RootState }>(
  'combinationPageCanvasConfigSlice/click',
  async ([x, y], thunkApi) => {
    // x y точка в СК canvas;
    const { dispatch, getState } = thunkApi
    const { combinationPageSlice, combinationPageCanvasConfigSlice } = getState()

    if (combinationPageSlice.rotateOriginPointSetModeEnabled) {
      // перейти в СК рулетки;
      const [pointInMeasureOrigin] = fromGlobalToLocalOrigin(
        [{ x, y }],
        combinationPageCanvasConfigSlice,
      )

      const { x: rotateOriginX, y: rotateOriginY } = pointInMeasureOrigin
      dispatch(setPlateCanvasRotateOrigin({ rotateOriginX, rotateOriginY }))
      dispatch(setRotateOriginPointSetModeEnabled(false))
    }
  },
)
