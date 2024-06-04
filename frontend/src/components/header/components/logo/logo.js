import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FSB from './FISH_LOGO.jpg';

const LargeText = styled.div`
	font-size: 90px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 40px;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<img src={FSB} alt="logo" height={150}></img>
		<div>
			<LargeText>
			Seafood Haven
			</LargeText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
