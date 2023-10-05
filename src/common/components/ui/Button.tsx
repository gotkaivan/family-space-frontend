import { MouseEventHandler, useMemo } from 'react';
import Loader from './Loader';

type ButtonType = 'base' | 'custom';

interface IProps {
	isLoading?: boolean;
	title: string;
	leftIcon?: JSX.Element;
	rightIcon?: JSX.Element;
	disabled?: boolean;
	clickHandler?: MouseEventHandler;
	bgColor?: string;
	textColor?: string;
	className?: string;
	buttonType?: ButtonType;
	type?: 'button' | 'submit';
}

const Button = ({ title, leftIcon, rightIcon, clickHandler, disabled = false, bgColor, className = '', buttonType = 'base', type = 'button', isLoading = false }: IProps) => {
	const classes = useMemo(() => {
		switch (buttonType) {
			case 'base':
				return `flexCenter text-sm gap-3 cursor-pointer rounded-lg border transition hover:bg-opacity-90 ${className}
        ${bgColor ? bgColor : 'border-primary bg-primary'}`;
			default:
				return className;
		}
	}, [buttonType, className]);

	function onClick(e: any) {
		if (!isLoading && clickHandler) clickHandler(e);
	}

	const content = useMemo(() => {
		const content = isLoading ? (
			<Loader />
		) : (
			<>
				{leftIcon && leftIcon}
				{title}
				{rightIcon && rightIcon}
			</>
		);

		return content;
	}, [leftIcon, title, rightIcon, isLoading]);

	return (
		<button
			type={type}
			disabled={disabled}
			className={'min-w-160 ' + classes}
			onClick={onClick}
		>
			{content}
		</button>
	);
};

export default Button;
