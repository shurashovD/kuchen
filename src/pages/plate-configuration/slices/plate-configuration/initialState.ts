import { PlateConfigurationState } from "src/types";
import { readFromLocalStorage } from "src/utils/saveInLocalStorage";

const initialState: PlateConfigurationState = {
    center: { depth: null, wall: null },
    connect: null,
    formFactor: "I",
    inputInFocus: null,
    left: { depth: null, wall: null },
    plateInFocus: null,
    right: { depth: null, wall: null },
}

export function getInitialState(): PlateConfigurationState {
    return readFromLocalStorage('PlateSlice') || initialState
}