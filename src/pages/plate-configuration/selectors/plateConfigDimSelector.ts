import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "src/stores/appStore";

type ResultItem = {
    label: string
    position: 'center' | 'left' | 'right'
	key: 'wall' | 'depth'
	min: number
	max: number
    value: string | number
}

export const plateConfigDimSelector = createSelector((state: RootState) => state, ({ plateConfigurationSlice }): ResultItem[] => {
    const { center, connect, formFactor, left, right } = plateConfigurationSlice

    if (formFactor === "I") {
        return [
            { label: 'Длина', value: center.wall || '', position: 'center', key: 'wall', min: 10, max: 99999 },
            { label: 'Глубина', value: center.depth || '', position: 'center', key: 'depth', min: 10, max: 1200 },
        ]
    }

    if (formFactor === "LL") {
        return [
            {
                label: 'Длина основания',
                value: center.wall || '',
                position: 'center',
                key: 'wall',
                min: left.depth || 10,
                max: 9999
            },
            { label: 'Глубина основания', value: center.depth || '', position: 'center', key: 'depth', min: 10, max: 1200 },
            { label: 'Длина левого крыла', value: left.wall || '', position: 'left', key: 'wall', min: center.depth || 10, max: 99999 },
            { label: 'Глубина левого крыла', value: left.depth || '', position: 'left', key: 'depth', min: 10, max: Math.min(1200, center.wall || 1200) }
        ]
    }

    if (formFactor === "RL") {
        return [
            {
                label: 'Длина основания',
                value: center.wall || '',
                position: 'center',
                key: 'wall',
                min: right.depth || 10,
                max: 9999
            },
            { label: 'Глубина основания', value: center.depth || '', position: 'center', key: 'depth', min: 10, max: 1200 },
            { label: 'Длина правого крыла', value: right.wall || '', position: 'right', key: 'wall', min: center.depth || 10, max: 99999 },
            { label: 'Глубина правого крыла', value: right.depth || '', position: 'right', key: 'depth', min: 10, max: Math.min(1200, center.wall || 1200) }
        ]
    }
    
    if (formFactor === "U") {
        return [
            {
                label: 'Длина основания',
                value: center.wall || '',
                position: 'center',
                key: 'wall',
                min: (left.depth || 10) + (right.depth || 10),
                max: 99999,
            },
            { label: 'Глубина основания', value: center.depth || '', position: 'center', key: 'depth', min: 10, max: 1200 },
            { label: 'Длина левого крыла', value: left.wall || '', position: 'left', key: 'wall', min: center.depth || 10, max: 99999 },
            {
                label: 'Глубина левого крыла',
                value: left.depth || '',
                position: 'left',
                key: 'depth',
                min: 10,
                max: Math.min(99989, (center.wall || 20) - (right.depth || 10))
            },
            { label: 'Длина правого крыла', value: right.wall || '', position: 'right', key: 'wall', min: center.depth || 10, max: 99999 },
            {
                label: 'Глубина правого крыла',
                value: right.depth || '',
                position: 'right',
                key: 'depth',
                min: 10,
                max: Math.min(99989, (center.wall || 20) - (right.depth || 10))
            },
        ]
    }

    return []
})