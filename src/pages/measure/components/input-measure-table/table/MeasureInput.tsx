import React, { ChangeEvent, FC, FocusEventHandler, KeyboardEventHandler, useEffect, useState } from "react"
import { TextField, TextFieldProps } from "@mui/material"

import { useAppDispatch } from "src/hooks/redux.hook"
import { setInputInFocus } from "src/pages/measure/slices"

type Props = TextFieldProps & {
    changeHandler(measure: number): void
    max?: number
    min?: number
    measure: number | null
}

export const MeasureInput: FC<Props> = ({ changeHandler, label, max, measure, min, ...props }) => {
    const [state, setState] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useAppDispatch()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value === '') {
            return setState('')
        }

        if (!isNaN(+event.target.value)) {
            if (+event.target.value === 0 && event.target.value !== '0') {
                return
            }
            setState(event.target.value)
        }
    }

    const blurHandler: FocusEventHandler = () => {
        dispatch(setInputInFocus(null))
        if (state.length) {
            const value = Math.min(Math.max(+state, (min || -Infinity) + 1), (max || Infinity) - 1)
            changeHandler(value)
        } else {
            const state = measure ? measure.toString() : ""
            setState(state)
        }
    }

    const keyDownHandler: KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            if (state.length) {
                const value = Math.min(Math.max(+state, (min || -Infinity) + 1), (max || Infinity) - 1)
                changeHandler(value)
            } else {
                const state = measure ? measure.toString() : ""
                setState(state)
            }
        }
        if (event.key === 'Escape') {
            const state = measure ? measure.toString() : ""
            setState(state)
        }
    }

    useEffect(() => {
        const state = measure ? measure.toString() : ''
		setState(state)
	}, [measure])

    useEffect(() => {
        setError(!state.length)
    }, [state])
    
    useEffect(() => {
        setError((+state > (max || Infinity)) || (+state < (min || -Infinity)))
    }, [max, min, state])

	return (
		<TextField
			size="small"
			label={label}
			required
			error={error}
			value={state}
			onBlur={blurHandler}
			onChange={handleChange}
            onKeyDown={keyDownHandler}
            {...props}
		/>
	)
}
