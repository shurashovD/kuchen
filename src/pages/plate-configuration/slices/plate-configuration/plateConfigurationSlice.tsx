import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "./initialState"
import { PlateConfigurationState } from "src/types"
import { saveInLocalStorage } from "src/utils/saveInLocalStorage"

const initialState = getInitialState()

export const plateConfigurationSlice = createSlice({
    initialState,
    name: 'plateConfigurationSlice',
    reducers: {
        setPlateConfigurationFormFactor: (state, { payload }: PayloadAction<PlateConfigurationState['formFactor']>) => {
            const newState = { ...initialState, formFactor: payload }
            saveInLocalStorage('PlateSlice', newState)
            return newState
        },
        setPlateConfigurationConnect: (state, { payload }: PayloadAction<PlateConfigurationState['connect']>) => {
            const newState = { ...initialState, formFactor: state.formFactor, connect: payload }
            saveInLocalStorage('PlateSlice', newState)
            return newState
        },
        setPlateConfigurationInputInfocus: (state, { payload }: PayloadAction<PlateConfigurationState['inputInFocus']>) => ({ ...state, inputInFocus: payload }),
        setPlateConfigurationDim(state, { payload }: PayloadAction<{ position: 'center' | 'left' | 'right', key: 'depth' | 'wall', value: number | null }>) {
            const { key, position, value } = payload
            state[position][key] = value
            saveInLocalStorage('PlateSlice', state)
        },
        setPlateConfigurationPlateInFocus: (state, { payload }: PayloadAction<PlateConfigurationState['plateInFocus']>) => ({ ...state, plateInFocus: payload })
    },
})

export const {
    setPlateConfigurationConnect,
    setPlateConfigurationDim,
    setPlateConfigurationFormFactor,
    setPlateConfigurationInputInfocus,
    setPlateConfigurationPlateInFocus,
} = plateConfigurationSlice.actions