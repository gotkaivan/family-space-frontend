import React, { useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import Icon from '../ui/Icon';
import SettingsDropdown from './SettingsDropdown';

interface IProps {
	className?: string;
}

const SettingsMenu = ({ className = '' }: IProps) => {
	const clickRef = React.useRef();

	const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<boolean>(false);

	useClickOutside(clickRef, () => setIsOpenSettingsMenu(false));
	return (
		<div
			ref={clickRef}
			className={`absolute ${className}`}
		>
			<div
				onClick={() => setIsOpenSettingsMenu(!isOpenSettingsMenu)}
				className="relative p-1 cursor-pointer"
			>
				<Icon
					name={'ellipsis'}
					width={18}
					height={18}
				/>
			</div>
			<SettingsDropdown isOpen={isOpenSettingsMenu} />
		</div>
	);
};

export default SettingsMenu;
