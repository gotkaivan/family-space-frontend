import { FC } from 'react';

interface IProps {
	title: string;
	right?: JSX.Element;
	center?: JSX.Element;
}

const PageHeader: FC<IProps> = ({ title, center, right }) => {
	return (
		<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<h1 className="text-title-md font-semibold text-black dark:text-white">{title}</h1>
			{center}
			{right}
		</div>
	);
};

export default PageHeader;
