import styled from 'styled-components';
import { Icon, Button } from '../../..';
import { Link, useNavigate } from 'react-router-dom';

const NavButtons = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
`;

const NavButton = styled.button`
	height: 50px;
	border: none;
	font-size: 50px;
	margin-left: 100px;
	background: none;
	&:hover {
		cursor: pointer;
	}
`;




const NavigationBarContainer = ({ className }) => {
	return (
		<div className={className}>
			<NavButtons>
				<Link to="/menu">
					<NavButton>Меню</NavButton>
				</Link>
				<Link to="/reservation">
					<NavButton>Бронь</NavButton>
				</Link>
				<Link to="/feedback">
					<NavButton>Отзывы</NavButton>
				</Link>
				<Link to="/vacancy">
					<NavButton>Вакасии</NavButton>
				</Link>
			</NavButtons>
		</div>
	);
};

export const NavigationBar = styled(NavigationBarContainer)``;
