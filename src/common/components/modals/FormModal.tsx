import { FC } from 'react';
import Icon from '../ui/Icon';

interface IProps {
	isOpen: boolean;
	content: JSX.Element;
	button: JSX.Element;
	close: () => void;
}

const FormModal: FC<IProps> = ({ isOpen, content, button, close }) => {
	if (!isOpen) return null;

	return (
		<div
			onClick={() => close()}
			className="fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10"
			>
				<button
					onClick={() => close()}
					className="absolute right-1 top-1 sm:right-5 sm:top-5"
				>
					<Icon
						name={'close'}
						width={20}
						height={20}
					/>
				</button>
				{content}
				{button}
			</div>
		</div>
	);
};

export default FormModal;
