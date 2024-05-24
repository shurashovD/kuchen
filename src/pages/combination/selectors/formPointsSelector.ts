import { createSelector } from '@reduxjs/toolkit'
import { platePointsOrthoAbsoluteSelector } from 'src/selectors'
import { RootState } from 'src/stores/appStore'
import {
  changeOriginPolarPoints,
  pointOrthoToPolar,
  pointOrthoTranslate,
  pointPolarRotateRad,
  pointPolarToOrtho,
} from 'src/utils/coordsTransform'

const plateOriginConfigSelector = createSelector(
  ({ combinationPagePlateCanvasConfigSlice }: RootState) => combinationPagePlateCanvasConfigSlice,
  item => item,
)

const originConfigSelector = createSelector(
  ({ combinationPageCanvasConfigSlice }: RootState) => combinationPageCanvasConfigSlice,
  item => item,
)

const configSelector = createSelector(plateOriginConfigSelector, config => {
  const result: RootState['combinationPagePlateCanvasConfigSlice'] = { ...config, scale: 1 }

  return result
})

export const formPointsSelector = createSelector(
  [originConfigSelector, configSelector, platePointsOrthoAbsoluteSelector],
  (originConfig, config, points) => {
    // points - точки столешницы в декартовых координатах mm с началом в точке А столешницы;
    // переход в СК рулетка;

    // 1. Перевести точку поворота в СК с началом в т. А столешницы.
    const coordsOriginTranslateX = config.rotateOriginX || config.coordsOriginTranslateX
    const coordsOriginTranslateY = config.rotateOriginY || config.coordsOriginTranslateY

    const x = coordsOriginTranslateX - config.coordsOriginTranslateX
    const y = coordsOriginTranslateY - config.coordsOriginTranslateY

    // 2. Повернуть точку поворота на угол поворота столешницы и зафиксировать смещение.
    const { alpha, r } = pointOrthoToPolar({ x, y })
    const translateX = pointPolarToOrtho({ alpha: alpha + config.rotateRad, r }).x - x
    const translateY = pointPolarToOrtho({ alpha: alpha + config.rotateRad, r }).y - y

    // 3. Перевести столешницу в СК рулетки.
    const measureOriginPlatePoints = points
      .map(item => pointOrthoTranslate(item, -x, -y))
      .map(pointOrthoToPolar)
      .map(item => pointPolarRotateRad(item, config.rotateRad))
      .map(pointPolarToOrtho)
      .map(item => pointOrthoTranslate(item, coordsOriginTranslateX, coordsOriginTranslateY))

    // 4. Сместить столешницу в СК рулетки на результат пп.2.

    // 5. Перевести столешницу в СК canvas.
    return changeOriginPolarPoints(originConfig, measureOriginPlatePoints.map(pointOrthoToPolar))
  },
)
