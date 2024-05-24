import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "src/stores/appStore";
import { Connect } from "src/types";

export const plateConfigConnectSelector = createSelector((state: RootState) => state, ({ plateConfigurationSlice }) => {
    const { connect, formFactor } = plateConfigurationSlice
    const value = connect || ''

    if (formFactor === 'I') {
        return null
    } 

    if (formFactor === 'LL' || formFactor === 'RL') {
        const options: { label: string, value: Connect }[] = [
            { label: 'Обратное', value: "LEFT-ROUND" },
            { label: 'Прямое', value: "RIGHT-ROUND" },
        ]

        return { options, value }
    }

    if (formFactor === 'U') {
        const options: { label: string, value: Connect }[] = [
            { label: 'Обратное', value: "LEFT-ROUND" },
            { label: 'Прямое', value: "RIGHT-ROUND" },
            { label: 'Порт', value: "PORT" },
            { label: 'Клещи', value: "GRIP" },
        ]

        return { options, value }
    }
})