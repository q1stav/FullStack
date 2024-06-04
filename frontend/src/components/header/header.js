import styled from 'styled-components';
import { Logo, ControlPanel, NavigationBar } from './components';

const Discription = styled.div`
	font-style: italic;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	top: 0;
	width: 100%;
	height: 200px;
	padding: 20px 40px;
	margin-right: 40px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<HeaderContent>
			<Logo />
			<Discription></Discription>
			<ControlPanel></ControlPanel>
		</HeaderContent>

		<NavigationBar></NavigationBar>
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	width: 1800px;
	height: 250px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0px -2px 17px #000;
`;
