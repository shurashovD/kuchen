import { createSelector } from "@reduxjs/toolkit";

import { RootState } from 'src/stores/appStore';

export const canAddMeasureSelector = createSelector(({ measureSlice }: RootState) => measureSlice, ({ measures }) => {
    return !measures.length || (measures.slice(1).every(({ angle, move }) => angle && move) &&
        measures.every(({ radius }) => radius))
})