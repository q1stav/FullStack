import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from '../../components';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';

const vacancyFormSchema = yup.object().shape({
	name: yup.string().required('Введите имя').max(20, 'Не более 20 символов'),
	phone: yup
		.string()
		.required('Введите Телефон')
		.length(12, 'Введите корректный номер телефона, пример: +79998887766'),
	position: yup.string().required('Укажите должность'),
	date: yup.string(),
});

const H1 = styled.h1`
	font-size: 90px;
	color: gray;
	border-bottom: 5px solid red;
`;

const Content = styled.div`
	display: flex;
	justify-content: end;
	width: 100%;
	background-color: #dcdcdc;
	box-shadow: 0 0 30px 30px white inset;
`;

const VacancyText = styled.div`
	display: flex;
	text-align: center;
	padding: 20px;
	font-size: 60px;
	align-items: center;
	height: 500px;
	width: 1000px;
	margin: 30px;
`;

const VacancyForm = styled.form`
	padding: 30px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	height: 500px;
	width: 1000px;
	margin: 30px;
`;

const Phone = styled(PhoneInput)`
	.form-control {
		height: 45px;
		width: 750px;
		font-size: 30px;
	}
`;
const FormField = styled.div`
	display: flex;
	font-size: 30px;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	height: auto;
	width: 100%;
`;
const DataField=styled.div`
display:flex;
align-items:center;
flex-direction:row;

`
const Title = styled.div`
	text-align: start;
	height: 100%;
	width: 200px;
`;

const InputForm = styled.input`
	height: 45px;
	width: 800px;
	font-size: 30px;
`;

const ErrorForm = styled.div`
	margin: 0px;
	font-size: 15px;
	color: red;
`;


const VacancyContainer = ({ className }) => {
	const [modalIsOpen, setModalIsOpen]=useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			position: '',
			date: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(vacancyFormSchema),
	});

	const nameError = errors.name?.message;
	const phoneError = errors.phone?.message;
	const positionError = errors.position?.message;

	function postVacancy(formData) {
		fetch('vacancy/sendVac', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				name: formData.name,
				phone: formData.phone,
				position: formData.position,
				date: new Date().toLocaleString(),
			}),
		})
			.then((response) => response.json())
			.then((json) => setModalIsOpen(true))

			.catch((e) => console.log('Ошибка POST....', e.message));
	}

	const onSubmit = (formData) => {
		console.log(JSON.stringify(formData));
		postVacancy(formData);
	};

	return (
		<div className={className}>
			{modalIsOpen && <Modal
			isOpen={modalIsOpen}
			onClose={()=>setModalIsOpen(false)}

			>
				<h1>Благодарим за заявку. Она успешна отправлена!  менеджер скоро с вами свяжется</h1></Modal>}
			<H1>РАБОТАЙТЕ С НАМИ!</H1>
			<Content>
				<VacancyText>
					Хотите стать частью команды нашего ресторана?<br></br> Заполните
					форму, и мы вам перезвоним!
				</VacancyText>
				<VacancyForm onSubmit={handleSubmit(onSubmit)}>
					<FormField>
						<DataField><Title>ИМЯ*:</Title>
						<InputForm
							name="name"
							type="text"
							autoComplete="off"
							{...register('name', { required: 'Укажите имя' })}
						></InputForm>
						</DataField>
						{nameError && <ErrorForm>{nameError}</ErrorForm>}
					</FormField>

					<FormField>
						<DataField><Title>Телефон*:</Title>
						<InputForm
							name="phone"
							type="text"
							autoComplete="off"
							{...register('phone', { required: 'phone' })}
						></InputForm>
						{/* <Phone
							name="phone"
							type="tel"
							country="ru"
							specialLabel=""
							{...register('phone', { required: 'Укажите телефон' })}
						/> */}
						{/* <PhoneInput
							placeholder="Enter phone number"
							name="phone"
							type="tel"
							country="ru"
							specialLabel=""
							{...register('phone', { required: 'Укажите телефон' })}
						/> */}
						</DataField>
						{phoneError && <ErrorForm>{phoneError}</ErrorForm>}
					</FormField>

					<FormField>
						<DataField><Title>Желаемая должность*:</Title>
						<InputForm
							name="position"
							type="text"
							autoComplete="off"
							{...register('position', { required: 'Укажите должность' })}
						></InputForm>
						</DataField>
						{positionError && <ErrorForm>{positionError}</ErrorForm>}
					</FormField>


					<Button width="200px" type="submit" disabled={!!nameError || !!phoneError || positionError}>
						Отправить
					</Button>
				</VacancyForm>
			</Content>
		</div>
	);
};

export const Vacancy = styled(VacancyContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
