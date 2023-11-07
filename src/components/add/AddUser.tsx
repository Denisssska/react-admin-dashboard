import { zodResolver } from '@hookform/resolvers/zod';
import { GridColDef } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './add.scss';

import { useForm } from 'react-hook-form';
import { usersSchema, usersSchemaType } from '../../validate/usersSchema';
type Props = {
	slug: string
	columns: GridColDef[]
	onClose: () => void
	itemLength: number
}
type RegisterUserType =
	| 'number'
	| 'createdAt'
	| 'id'
	| 'firstName'
	| 'lastName'
	| 'email'
	| 'phone'
	| 'verified'
	| 'img'

export const AddUser = (props: Props) => {
	const randomValue = Math.floor(Math.random() * 1000)
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		watch,
		trigger,
		formState: { isSubmitting, errors },
	} = useForm<usersSchemaType>({
		mode: 'onTouched',
		shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
		resolver: zodResolver(usersSchema),
		defaultValues: {
			id: randomValue,
			number: props.itemLength + 1,
		},
	})

	const queryClient = useQueryClient()
	// console.log(watch('title'))

	//доделать типизацию
	// и решить вопрос с вынесением компоненты по добавлению юзера или пользователя отдельно
	// добавить фото в форму создания
	// доделать айдишники
	// доделать логин и регистрацию
	const addItem = async (params: usersSchemaType) => {
		console.log(params)
		const data = await fetch(`http://localhost:8800/api/${props.slug}s`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		})
		return data
	}
	const mutation = useMutation({
		mutationFn: addItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`all${props.slug}s`] })
		},
	})
	// console.log(watch('img') && watch('img')[0])

	const onSubmit = (data: usersSchemaType) => {
		let body = {
			...data,
			// img: data.img && watch('img')[0],
			// id: randomValue,
			// number: props.itemLength + 1,
		}

		//add new item
		mutation.mutateAsync(body)
		props.onClose()
	}
	// console.log(props.itemLength, id)
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{props.columns
				// .filter(item => item.field !== 'id' && item.field !== 'number' && item.field !== 'img')
				.map((column, id) => {
					return (
						<div key={id} className='item'>
							<label htmlFor={`${id}-${column.field}`}>{column.headerName}</label>
							<input
								readOnly={column.field === 'id' ? true : column.field === 'number' ? true : false}
								id={`${id}-${column.field}`}
								type={column.type === 'boolean' ? 'checkbox' : column.type}
								placeholder={
									column.field === 'id'
										? String(randomValue)
										: column.field === 'number'
										? String(props.itemLength + 1)
										: column.field
								}
								{...register(column.field as RegisterUserType)}
							/>
							{errors[`${column.field as keyof typeof errors}`] && (
								<p className='errorMessage' id={`${id}-${column.field}`} aria-live='assertive'>
									{String(errors[column.field as keyof typeof errors]?.message)}
								</p>
							)}
						</div>
					)
				})}
			<button disabled={isSubmitting} type='submit'>
				Send
			</button>
		</form>
	)
}
