import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components';


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
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 500px;
	width: 90%;
	border: 2px solid red;
`;
const FormField = styled.div`
	display: flex;
	flex-direction: row;
	height: auto;
	width: 100%;
	border: 2px solid green;
`;

const TextField = styled.div`
	display: flex;
	flex-direction: row;
	height: 200px;
	width: 100%;
	border: 2px solid green;
`;
const Title = styled.div`
	text-align: start;
	height: 100%;
	width: 150px;
	border: 2px solid orange;
`;

const Content = styled.div`
	height: 100%;
	width: 100%;
	border: 2px solid green;
`;

const InputForm = styled.input`
	height: 45px;
	font-size: 30px;
	width: 100%;
`;
const TextAreaForm = styled.textarea`
	height: 200px;
	font-size: 30px;
	width: 100%;
`;

const RatingForm = styled.input`
	height: 45px;
	font-size: 30px;
	width: 150px;
`;

const FeedbacksContainer = ({ className }) => {
	const [feedbacks, setFeedbacks] = useState([]);
	const stars = Array(10).fill('star');

	console.log(stars);

	useEffect(() => {
		console.log('useEffect');
		fetch('/feedback/get')
			.then((response) => response.json())
			.then((res) => {
				setFeedbacks(res);
			})
			.catch((e) => console.log('Ошибка get....', e.message));
	}, []);

	function postFeedbacks() {
		fetch('feedback/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				name: 'NATA',
				text: 'Для современного мира социально-экономическое развитие прекрасно подходит для реализации первоочередных требований. А ещё сделанные на базе интернет-аналитики выводы лишь',
				rating: '9',
			}),
		})
			.then((response) => response.text())
			.then((json) => console.log(json))

			.catch((e) => console.log('Ошибка fetch....', e.message));
	}

	const onPost = () => {
		postFeedbacks();
	};

	console.log(feedbacks);
	feedbacks.forEach((element) => {
		console.log(element.name);
	});

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
			<NewFeedback>
				<FormField>
					<Title>Имя*:</Title>
					<Content>
						<InputForm></InputForm>
					</Content>
				</FormField>
				<FormField>
					<Title>Отзыв*:</Title>
					<Content>
						<TextAreaForm></TextAreaForm>
					</Content>
				</FormField>
				<FormField>
					<Title>Рейтинг*:</Title>
					<Content>
						<RatingForm
							defaultValue="10"
							min="0"
							max="10"
							maxwidth="200px"
							type="number"
							step="1"
						></RatingForm>
					</Content>
				</FormField>
				<Button width="200px" onClick={onPost}>
					POST
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
