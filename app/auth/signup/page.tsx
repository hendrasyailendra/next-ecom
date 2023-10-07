'use client';
import { validateForm } from '@/app/utils/validateForm';
import AuthFormContainer from '@components/AuthFormContainer';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function SignUp() {
	const validationSchema = yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().email('invalid email').required('email is required'),
		password: yup
			.string()
			.min(8, 'Password At least 8 character')
			.required('Password is required'),
	});

	const {
		values,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		errors,
		touched,
	} = useFormik({
		initialValues: { name: '', email: '', password: '' },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify(values),
			}).then(async (res) => {
				if (res.ok) {
					const result = await res.json();
					console.log(result);
				}
			});
		},
	});

	const formErrors: string[] = validateForm(errors, touched, values);

	const { name, email, password } = values;

	return (
		<AuthFormContainer title='Create New Account' onSubmit={handleSubmit}>
			<Input
				name='name'
				label='Name'
				crossOrigin={undefined}
				onChange={handleChange}
				onBlur={handleBlur}
				value={name}
			/>
			<Input
				name='email'
				label='Email'
				crossOrigin={undefined}
				onChange={handleChange}
				onBlur={handleBlur}
				value={email}
			/>
			<Input
				name='password'
				label='Password'
				type='password'
				crossOrigin={undefined}
				onChange={handleChange}
				onBlur={handleBlur}
				value={password}
			/>
			<Button type='submit' className='w-full'>
				Sign up
			</Button>
			<div className=''>
				{formErrors.map((err) => {
					return (
						<div key={err} className='space-x-1 flex items-center text-red-500'>
							<XMarkIcon className='w-4 h-4' />
							<p className='text-xs'>{err}</p>
						</div>
					);
				})}
			</div>
		</AuthFormContainer>
	);
}
