import React from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { Link } from 'react-router-dom';


const ModalWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100%;
`;

const ModalContent = styled.div`
	padding:15px;
	position: relative;
	display:flex;
	flex-direction:column;
	width: 100%;
	max-width: 600px;
	background-color: white;
	justify-content:end;
	align-items:end;
	border-radius:25px;

`;

const StyledIcon = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const ModalContainer = ({ className, onClose,isOpen,children}) => {
	return (
		<div className={className}>
			<ModalWrapper>
				<ModalContent>
				<Link to="/">
						<Icon id="fa-times"  margin="10px" />
					</Link>

					{children}
				</ModalContent>
			</ModalWrapper>
		</div>
	);
};
export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.75);
	overflow: hidden;
	transition: opacity 0.3s;
`;
