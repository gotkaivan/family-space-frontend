import SettingsMenu from 'common/components/settings-menu/SettingsMenu';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	title: string;
	description: string;
	to: string;
	className?: string;
	onEdit: () => Promise<void>;
	onDelete: () => Promise<void>;
}

const Card: FC<IProps> = ({ className = '', to, title, description, onEdit, onDelete }) => {
	return (
		<Link
			to={to}
			className={`relative rounded-md border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer
      w-250 ${className}`}
		>
			<SettingsMenu
				className="right-3 top-3"
				onEdit={() => onEdit()}
				onDelete={() => onDelete()}
			/>
			<h4 className="pb-2 text-md font-medium text-black dark:text-white">{title}</h4>
			<p className="text-sm pb-5 text-body">{description}</p>
		</Link>
	);
};

export default Card;
