import { CalendarIcon, ProfileIcon, SettingsIcon, TableIcon, EmailIcon, LockIcon } from '../icons';
import { IPropsIcon } from '../icons/types';

export type IconName = 'calendar' | 'profile' | 'table' | 'settings' | 'email' | 'lock';

const Icon = ({ name, width, height, color }: IPropsIcon) => {
	switch (name) {
		case 'calendar':
			return (
				<CalendarIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'profile':
			return (
				<ProfileIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'table':
			return (
				<TableIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'settings':
			return (
				<SettingsIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'email':
			return (
				<EmailIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'lock':
			return (
				<LockIcon
					width={width}
					height={height}
					color={color}
				/>
			);
	}
};

export default Icon;
