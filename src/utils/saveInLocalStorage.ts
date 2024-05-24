import { LocalStorageKey } from "src/types";

export function readFromLocalStorage(key: LocalStorageKey) {
    const resultJSON = localStorage.getItem(key)
    if (!resultJSON) {
        return null
    }

    try {
        return JSON.parse(resultJSON)
    } catch (e) {
        localStorage.removeItem(key)
    }
}

export function saveInLocalStorage(key: LocalStorageKey, value: object) {
    localStorage.setItem(key, JSON.stringify(value))
}