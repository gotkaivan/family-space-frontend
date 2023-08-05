import { CalendarIcon, ProfileIcon, SettingsIcon, TableIcon } from '../icons';

export type IconName = 'calendar' | 'profile' | 'table' | 'settings';

interface IProps {
	name: IconName;
	width: number;
	height: number;
}

const Icon = ({ name, width, height }: IProps) => {
	switch (name) {
		case 'calendar':
			return (
				<CalendarIcon
					width={width}
					height={height}
				/>
			);
		case 'profile':
			return (
				<ProfileIcon
					width={width}
					height={height}
				/>
			);
		case 'table':
			return (
				<TableIcon
					width={width}
					height={height}
				/>
			);
		case 'settings':
			return (
				<SettingsIcon
					width={width}
					height={height}
				/>
			);
	}
};

export default Icon;
