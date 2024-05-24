import React, { ChangeEvent, FC, KeyboardEventHandler, useEffect, useState } from "react"
import { TextField, TextFieldProps } from "@mui/material"
import { useAppDispatch } from "src/hooks/redux.hook"

import { setPlateConfigurationDim, setPlateConfigurationInputInfocus, setPlateConfigurationPlateInFocus } from "../../slices"

type Props = {
	position: 'center' | 'left' | 'right',
	field: 'wall' | 'depth',
	min: number,
	max: number
} & TextFieldProps

export const PlateConfigInput: FC<Props> = (props) => {
	const [state, setState]  = useState('')
	const dispatch = useAppDispatch()
	
	const action = () => {
		const { field, position } = props
		
		if (state === '') {
			dispatch(setPlateConfigurationDim({ key: field, position, value: null }))
			return
		}
		
		if (!isNaN(+state)) {
			dispatch(setPlateConfigurationDim({ key: field, position, value: Math.max(Math.min(props.max, +state), props.min) }))
			return
		}
	}

	const onBlur = () => {
		dispatch(setPlateConfigurationInputInfocus(null))
		dispatch(setPlateConfigurationPlateInFocus(null))
		action()
	}

	const onFocus = () => {
		dispatch(setPlateConfigurationInputInfocus(props.field))
		dispatch(setPlateConfigurationPlateInFocus(props.position))
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === '') {
			setState('')
		}

		if (event.target.value !== '0' && +event.target.value === 0) {
			return
		}

		if (!isNaN(+event.target.value)) {
			setState(event.target.value)
		}
	}

	const onKeyDown: KeyboardEventHandler = (event) => {
		if (event.key === 'Enter') {
			action()
		}

		if (event.key === 'Escape') {
			setState(props.value as string)
		}
	}

	useEffect(() => {
		setState(props.value as string)
	}, [props.value])

    return (
		<TextField
            fullWidth
			onBlur={onBlur}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onFocus={onFocus}
			size="small"
			{...props}
			value={state}
		/>
	)
}