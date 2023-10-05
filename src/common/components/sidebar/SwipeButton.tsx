import { FC } from 'react';
import Icon from '../ui/Icon';

interface IProps {
	className?: string;
	onClick?: () => void;
}

const SwipeButton: FC<IProps> = ({ className = '', onClick = () => null }) => {
	return (
		<div
			onClick={onClick}
			className={`w-6 h-6 text-black rounded-full absolute top-4.5 -right-3 z-999999 bg-white flex items-center justify-center border border-solid border-stroke cursor-pointer ${className}`}
		>
			<Icon
				name={'arrow-left'}
				size={16}
			/>
		</div>
	);
};

export default SwipeButton;
