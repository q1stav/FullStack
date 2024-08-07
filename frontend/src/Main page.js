import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import styled from 'styled-components';
import { Feedbacks, Login, Reserve } from './pages';
import { Vacancy } from './pages/vacancys/vacancys';

const Content = styled.div`
	padding: 300px 0;
`;

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1800px;
	min-height: 100%;
	background-color: white;
	margin: 0 auto;
`;

export const MainPage = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/menu" element={<div>MENU</div>} />
					<Route path="/reservation" element={<Reserve />} />
					<Route path="/feedback" element={<Feedbacks />} />
					<Route path="/vacancy" element={<div><Vacancy /></div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
		</AppColumn>
	);
};
