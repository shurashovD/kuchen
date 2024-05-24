import { MeasureState } from "src/types";
import { readFromLocalStorage } from "src/utils/saveInLocalStorage";

const initialState: MeasureState = {
    inputInFocus: null,
    measures: [],
    selectedIds: [],
}

export function getInitialState(): MeasureState {
    return readFromLocalStorage('MeasureSlice') || initialState
}