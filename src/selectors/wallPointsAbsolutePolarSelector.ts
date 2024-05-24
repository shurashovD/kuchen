// возвращает полярные координаты точек стены в mm и rad с началом координат в точке устновки рулетки;

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/stores/appStore";
import { MeasurePointAbsolutePolarCoords } from "src/types";

export const wallPointsAbsolutePolarSelector = createSelector(({ measureSlice }: RootState) => measureSlice.measures, (measures) => 
    measures.map<MeasurePointAbsolutePolarCoords>((measure, index) => {
        const { id: measureId, radius: r } = measure
        const alpha = measures.slice(0, index + 1).reduce((acc, { angle }) => +acc + angle, 0)
        const polarCoords = { alpha, r }
        return { ...polarCoords, measureId }
    })
)