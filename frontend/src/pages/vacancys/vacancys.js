import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components';
import PhoneInput from 'react-phone-input-2'


const H1=styled.h1`
	font-size:90px;
	color:gray;
	border-bottom: 5px solid red;
`

const Content=styled.div`
display:flex;
justify-content:end;
width:100%;
background-color: #DCDCDC;
box-shadow: 0 0 30px 30px white inset;
`

const VacancyText=styled.div`
display:flex;
text-align:center;
padding:20px;
font-size:60px;
align-items:center;
height:500px;
width:1000px;
margin: 30px;
`

const VacancyForm=styled.form`
padding:30px;
display:flex;
align-items:center;
justify-content:space-around;
flex-direction:column;
height:500px;
width:1000px;
margin: 30px;
`

const Phone = styled(PhoneInput)`

  .form-control
  {
    height: 45px;
	width:750px;
	font-size: 30px;}
`
const FormField=styled.div`
	display: flex;
	font-size:30px;
	align-items:center;
	justify-content:space-between;
	flex-direction: row;
	height: auto;
	width: 100%;
`
const Title = styled.div`
	text-align: start;
	height: 100%;
	width: 200px;
`;

const InputForm = styled.input`
height: 45px;
width: 800px;
font-size: 30px;`

const VacancyContainer = ({ className }) => {




	return(

		<div className={className}>
			<H1>РАБОТАЙТЕ С НАМИ!</H1>
			<Content>
			<VacancyText>Хотите стать частью команды нашего ресторана?<br></br> Заполните форму, и мы вам перезвоним!</VacancyText>
				<VacancyForm >
					<FormField>
						<Title>ИМЯ*:</Title>
						<InputForm name='name' type='text'></InputForm>
					</FormField>
					<FormField>
						<Title>Телефон*:</Title>
						<Phone
				name='phone'
				country='ru'
				specialLabel=''
				/>
					</FormField>
					<FormField>
					<Title>Желаемая должность*:</Title>
					<InputForm name='text' type='text' ></InputForm>
					</FormField>


			<Button width="200px">Отправить</Button>

		</VacancyForm>
			</Content>


		</div>

	)

}


export const Vacancy = styled(VacancyContainer)`
		display: flex;
		flex-direction:column;
		align-items:center;
`
