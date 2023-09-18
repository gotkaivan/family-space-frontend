import { FC } from 'react';
import Loader from './';

interface IProps {
	className?: string;
}

const PageLoader: FC<IProps> = ({ className = 'h-35' }) => {
	return (
		<div className={`w-full flex justify-center items-center ${className}`}>
			<Loader
				size={7}
				background="text-whiten dark:text-boxdark-2"
			/>
		</div>
	);
};

export default PageLoader;
