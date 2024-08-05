import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from '../../components';
// import PhoneInput from 'react-phone-number-input';
import PhoneInput from 'react-phone-input-2';

const reserveFormSchema = yup.object().shape({
	name: yup.string().required('Введите имя').max(20, 'Не более 20 символов'),
	phone: yup
		.string()
		.required('Введите Телефон')
		.length(12, 'Введите корректный номер телефона, пример: +79998887766'),
	guests: yup
		.number()
		.required('Введите количество гостей от 1 до 30')
		.matches(/^([1-9]|[1-2][\d]|3[0])$/, 'Введите количество гостей от 1 до 30'),
	booking: yup.string().required('Выберите дату'),
	date: yup.string(),
});

const H1 = styled.h1`
	font-size: 50px;
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

const ReserveText = styled.div`
	display: flex;
	text-align: center;
	padding: 20px;
	font-size: 60px;
	align-items: center;
	height: 500px;
	width: 1000px;
	margin: 30px;
`;

const ReserveForm = styled.form`
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
const DataField = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
`;
const Title = styled.div`
	text-align: start;
	height: 100%;
	width: 225px;
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

const ReserveContainer = ({ className }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			phone: '',
			guests: '',
			booking: '',
			date: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(reserveFormSchema),
	});

	const nameError = errors.name?.message;
	const phoneError = errors.phone?.message;
	const guestsError = errors.guests?.message;
	const bookingError = errors.booking?.message;

	function postReserve(formData) {
		fetch('reserve/sendRes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				name: formData.name,
				phone: formData.phone,
				guests: formData.guests,
				booking: formData.booking,
				date: new Date().toLocaleString(),
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				setModalIsOpen(true);
			})

			.catch((e) => console.log('Ошибка POST....', e.message));
	}

	const onSubmit = (formData) => {
		console.log(JSON.stringify(formData));
		postReserve(formData);
	};

	return (
		<div className={className}>
			{modalIsOpen && (
				<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
					<h1>
						Благодарим за заявку. Она успешна отправлена! менеджер скоро с
						вами свяжется
					</h1>
				</Modal>
			)}
			<H1>Встречи и время наедине с собой в нашей атмосфере – прекрасны!</H1>
			<Content>
				<ReserveText>
					Заполните форму,<br></br> и мы перезвоним вам для подтверждения
					бронирования
				</ReserveText>
				<ReserveForm onSubmit={handleSubmit(onSubmit)}>
					<FormField>
						<DataField>
							<Title>ИМЯ*:</Title>
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
						<DataField>
							<Title>Телефон*:</Title>
							<InputForm
								name="phone"
								type="text"
								autoComplete="off"
								{...register('phone', { required: 'Укажите телефон' })}
							></InputForm>
						</DataField>
						{phoneError && <ErrorForm>{phoneError}</ErrorForm>}
					</FormField>

					<FormField>
						<DataField>
							<Title>Количество гостей*:</Title>
							<InputForm
								name="guests"
								type="number"
								autoComplete="off"
								{...register('guests', {
									required: 'Укажите количество гостей',
								})}
							></InputForm>
						</DataField>
						{guestsError && <ErrorForm>{guestsError}</ErrorForm>}
					</FormField>
					<FormField>
						<DataField>
							<Title>Дата бронирования*:</Title>
							<InputForm
								name="booking"
								type="text"
								placeholder=""
								onFocus={(e) => (e.target.type = 'date')}
								onBlur={(e) => (e.target.type = 'text')}
								{...register('booking', { required: 'Выберите дату' })}
							></InputForm>
						</DataField>
						{bookingError && <ErrorForm>{bookingError}</ErrorForm>}
					</FormField>

					<Button
						width="200px"
						type="submit"
						disabled={
							!!nameError || !!phoneError || !!guestsError || !!bookingError
						}
					>
						Отправить
					</Button>
				</ReserveForm>
			</Content>
		</div>
	);
};

export const Reserve = styled(ReserveContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
