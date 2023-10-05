import { useState, useRef } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import Icon from '../ui/Icon';
import SettingsDropdown from './SettingsDropdown';

interface IProps {
	className?: string;
	onEdit: () => Promise<void>;
	onDelete: () => Promise<void>;
}

const SettingsMenu = ({ className = '', onEdit, onDelete }: IProps) => {
	const clickRef = useRef();

	const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<boolean>(false);

	const onEditHandler = async () => {
		await onEdit();
		setIsOpenSettingsMenu(false);
	};

	const onDeleteHandler = async () => {
		await onDelete();
		setIsOpenSettingsMenu(false);
	};

	useClickOutside(clickRef, () => setIsOpenSettingsMenu(false));

	return (
		<div
			// @ts-ignore
			ref={clickRef}
			onClick={e => e.preventDefault()}
			className={`absolute ${className}`}
		>
			<div
				onClick={() => setIsOpenSettingsMenu(!isOpenSettingsMenu)}
				className="relative p-1 cursor-pointer"
			>
				<Icon
					name={'more-vertical'}
					size={18}
				/>
			</div>
			<SettingsDropdown
				onEdit={() => onEditHandler()}
				onDelete={() => onDeleteHandler()}
				isOpen={isOpenSettingsMenu}
			/>
		</div>
	);
};

export default SettingsMenu;
