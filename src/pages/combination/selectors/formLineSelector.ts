import { createSelector } from '@reduxjs/toolkit'

import { LineItem } from 'src/types'

import { formPointsSelector } from './formPointsSelector'

export const formLineSelector = createSelector(formPointsSelector, points => {
  function getLines(points: { x: number; y: number }[]) {
    return points.reduce<LineItem[]>((acc, item, index) => {
      const prevIndex = index === 0 ? points.length - 1 : index - 1
      const prevPoint = points[prevIndex]
      const id = `fl-${index}`
      acc.push({
        id,
        coordinates: [prevPoint.x, prevPoint.y, item.x, item.y],
      })
      return acc
    }, [])
  }

  return getLines(points)
})
