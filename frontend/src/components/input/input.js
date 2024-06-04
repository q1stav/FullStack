import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 40px;
	padding: 10px;
	margin: 0 0 10px;
	border: solid 1px black;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
`;
