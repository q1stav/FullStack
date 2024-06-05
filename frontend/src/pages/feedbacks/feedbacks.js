import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components';

const feedbackFormSchema = yup.object().shape({
	name: yup.string().required('Введите имя'),
	text: yup.string().required('Введите отзыв').max(400,"Отзыв не более 400 символов"),
	rating:yup.number().required('Поставьте оценку'),
});

const AllFeedbacks = styled.div`
	padding: 5px;
	display: flex;
	flex-wrap: wrap;
	width: 95%;
	height: 600px;
	overflow: auto;
	box-shadow: 0px -2px 17px #000;
`;

const StarContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

const Star = styled(StarContainer)`
	font-size: ${({ size = '40px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ color = 'orange' }) => color};
`;

const Feedback = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	justify-content: space-between;
	flex-direction: column;
	margin: 15px 10px;
	width: 45%;
	height: auto;
	border: 2px solid blue;
	border-radius: 25px;
`;

const Text = styled.div`
	padding: 15px;
	display: flex;
	text-align: justify;
	justify-content: center;
	width: 100%;
`;
const Name = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 2px solid blue;
`;

const StarBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	height: 40px;
	width: 100%;
`;

const NewFeedback = styled.form`
	margin-top:20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 500px;
	width: 90%;
`;
const FormField = styled.div`
	display: flex;
	flex-direction: row;
	height: auto;
	width: 100%;
`;

const Title = styled.div`
	text-align: start;
	height: 100%;
	width: 150px;
`;

const Content = styled.div`
	height: 100%;
	width: 100%;
`;

const InputForm = styled.input`
	height: 45px;
	font-size: 30px;
	width: 100%;
	&:focus {
		background-color: #FFF5EE;}
`;
const TextAreaForm = styled.textarea`
	height: 200px;
	font-size: 30px;
	width: 100%;
	&:focus {
		background-color: #FFF5EE;}
`;

const RatingForm = styled.input`
	height: 45px;
	font-size: 30px;
	width: 150px;
	&::-webkit-keygen-select{
    background: black;
    color: red;}

`;

const ErrorForm=styled.div`
	font-size:25px;
	color:red;
`

const FeedbacksContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			text: '',
			rating:10
		},
		mode:'onChange',
		resolver: yupResolver(feedbackFormSchema),
	});

	const nameError = errors.name?.message;
	const textError = errors.text?.message;
	const ratingError = errors.rating?.message;

	const [feedbacks, setFeedbacks] = useState([]);
	const stars = Array(10).fill('star');

	function getFeedbacks(){
		fetch('/feedback/get')
		.then((response) => response.json())
		.then((res) => {
			setFeedbacks(res);
		})
		.catch((e) => console.log('Ошибка get....', e.message));
	}

	useEffect(() => {
		console.log('useEffect');
		getFeedbacks()
	}, []);

	function postFeedback(formData) {
		fetch('feedback/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				name: formData.name,
				text:  formData.text,
				rating:  formData.rating,
			}),
		})
			.then((response) => response.json())
			.then((json) => getFeedbacks())

			.catch((e) => console.log('Ошибка POST....', e.message));
	}

	const onSubmit = (formData) => {
		console.log(
			JSON.stringify(
				formData
			));
		postFeedback(formData);
	}

	return (
		<div className={className}>
			<AllFeedbacks>
				{feedbacks.map((feedback) => {
					return (
						<Feedback>
							<Name>{feedback.name}</Name>

							<Text>{feedback.text}</Text>
							<StarBox>
								{stars.map((value, index) => {
									return index < feedback.rating ? (
										<Star id="fa-solid fa-star" />
									) : (
										<Star
											id="fa-solid fa-star"
											color="black"
											size="40px"
										/>
									);
								})}
							</StarBox>
						</Feedback>
					);
				})}
			</AllFeedbacks>
			<NewFeedback onSubmit={handleSubmit(onSubmit)}>

				<FormField>
					<Title>Имя*:</Title>
					<Content>
						<InputForm
						type="text"
						name="name"
						autoComplete='off'
						{...register('name',{required:'Укажите имя'})}
						/>
					</Content>
					</FormField>
					{nameError && <ErrorForm>{nameError}</ErrorForm>}
				<FormField>
					<Title>Отзыв*:</Title>
					<Content>
						<TextAreaForm
						type="text"
						name="text"
						autoComplete="off"
						{...register('text',{required:'Оставте отзыв'})}
						/>
					</Content>
				</FormField>
				{textError && <ErrorForm>{textError}</ErrorForm>}
				<FormField>
					<Title>Рейтинг*:</Title>
					<Content>
						<RatingForm
							defaultValue="10"
							min="0"
							max="10"
							maxwidth="200px"
							type="number"
							name='rating'
							step="1"
							{...register('rating')}
						></RatingForm>
					</Content>
				</FormField>
				<Button width="250px"  type="submit" disabled={!!nameError || !!textError}>
					ОПУБЛИКОВАТЬ
				</Button>
			</NewFeedback>
		</div>
	);
};

export const Feedbacks = styled(FeedbacksContainer)`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: center;
	font-size: 30px;
`;
