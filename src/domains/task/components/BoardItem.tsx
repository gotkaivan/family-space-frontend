import SettingsMenu from 'common/components/settings-menu/SettingsMenu';
import { BoardDto } from 'generated/api';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	item: BoardDto;
	className?: string;
	onEdit: (data: BoardDto) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
}

const BoardItem: FC<IProps> = ({ item, className = '', onEdit, onDelete }) => {
	const onEditBoard = async (): Promise<void> => {
		await onEdit(item);
	};

	const onDeleteBoard = async (): Promise<void> => {
		await onDelete(item.id);
	};
	return (
		<Link
			to={`/tasks/${item.id}`}
			className={`relative rounded-sm border border-stroke bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer
      w-250 ${className}`}
		>
			<SettingsMenu
				className="right-3 top-3"
				onEdit={onEditBoard}
				onDelete={onDeleteBoard}
			/>
			<h4 className="pb-2 text-md font-medium text-black dark:text-white">{item.title}</h4>
			<p className="text-sm pb-5">{item.description}</p>
		</Link>
	);
};

export default BoardItem;
