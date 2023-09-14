import { FC, ReactNode } from 'react';

interface IProps {
	isOpen: boolean;
	children: ReactNode;
}

const ModalWrapper: FC<IProps> = ({ isOpen, children }) => {
	return <>{isOpen && children}</>;
};

export default ModalWrapper;
