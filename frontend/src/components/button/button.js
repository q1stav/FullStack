import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(238, 238, 238);
	font-size: 28px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	border: solid #000 1px;

	&:hover {
		cursor: pointer;
	}
`;
