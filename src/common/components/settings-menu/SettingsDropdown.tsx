import Icon from '../ui/Icon';

interface IProps {
	isOpen: boolean;
	onEdit: () => void;
	onDelete: () => void;
}

const SettingsDropdown = ({ isOpen = false, onEdit, onDelete }: IProps) => {
	return (
		<div
			className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark block ${
				!isOpen && 'hidden'
			}`}
		>
			<button
				onClick={onEdit}
				className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
			>
				<Icon
					name={'edit'}
					width={16}
					height={16}
				/>
				Обновить
			</button>
			<button
				onClick={onDelete}
				className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
			>
				<Icon
					name={'trash'}
					width={16}
					height={16}
				/>
				Удалить
			</button>
		</div>
	);
};

export default SettingsDropdown;
