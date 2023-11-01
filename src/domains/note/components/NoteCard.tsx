import SettingsMenu from 'common/components/settings-menu/SettingsMenu';
import { NoteDto } from 'generated/api';
import { FC } from 'react';

interface IProps {
	title: string;
	description?: string | undefined;
	content: string;
	isFavorite: boolean;
	className?: string;
}

const NoteCard: FC<IProps> = ({ title, description, content, isFavorite, className }) => {
	return (
		<div
			className={`relative rounded-md border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer
      w-250 ${className}`}
		>
			<SettingsMenu
				className="right-3 top-3"
				onEdit={function (): Promise<void> {
					throw new Error('Function not implemented.');
				}}
				onDelete={function (): Promise<void> {
					throw new Error('Function not implemented.');
				}}
			/>
			<h4 className="text-sm text-black">{title}</h4>
			{description?.length && <p className="text-sm text-body">{description}</p>}
			{!description?.length && <p className="text-sm text-body">{content}</p>}
		</div>
	);
};

export default NoteCard;
