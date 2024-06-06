import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components';


const authFormSchema = yup.object().shape({
	email: yup.string().email('Введите email. Пример: user@email.com'),
	password: yup.string().required('Заполните пароль'),
});

const LoginForm = styled.form`
	margin-top: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 500px;
	font-size: 30px;
`;
const FieldForm = styled.div`
	margin: 20px 10px;
	display: flex;
	width: 100%;
	flex-direction: column;
`;

const InputForm = styled.input`
	height: 45px;
	font-size: 30px;
`;

const LoginContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode:'onChange',
		resolver: yupResolver(authFormSchema),
	});
	const emailError = errors.email?.message;

	function authPost(formData) {
		 fetch('/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				email:formData.email,
				password:formData.password
			}),
		})
			.then((response) => response.text())
			.then((json) => console.log(json))

			.catch((e) => console.log('Ошибка fetch....', e.message));
	}

	const onSubmit = (formData) => {
		console.log(
			JSON.stringify(
				formData
			),
		);
		authPost(formData);
	};

	return (
		<div className={className}>
			<LoginForm onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div>{emailError}</div>}
				<FieldForm className="Email">
					<InputForm type="text" name="email" {...register('email')} />
					<label>email</label>
				</FieldForm>
				<FieldForm className="Password">
					<InputForm
						type="password"
						name="password"
						autoComplete="off"
						{...register('password')}
					/>
					<label>Password</label>
				</FieldForm>
				<Button width="200px" type="submit" disabled={!!emailError}>
					Login
				</Button>
			</LoginForm>
		</div>
	);
};

export const Login = styled(LoginContainer)`
	display: flex;
	justify-content: center;
`;
