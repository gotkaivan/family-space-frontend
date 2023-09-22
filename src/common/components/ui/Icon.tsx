import {
	CalendarIcon,
	ProfileIcon,
	SettingsIcon,
	TableIcon,
	EmailIcon,
	LockIcon,
	EllipsisIcon,
	CloseIcon,
	PlusIcon,
	MinusIcon,
	EditIcon,
	TrashIcon,
	DangerIcon,
	CheckIcon,
	CheckboxIcon,
	ExitIcon,
	ChevronIcon,
	SunIcon,
	MoonIcon,
} from '../icons';
import { IPropsIcon } from '../icons/types';

const Icon = ({ name, width, viewBox, height, className }: IPropsIcon) => {
	switch (name) {
		case 'calendar':
			return (
				<CalendarIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'profile':
			return (
				<ProfileIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
		case 'table':
			return (
				<TableIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'settings':
			return (
				<SettingsIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'email':
			return (
				<EmailIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'lock':
			return (
				<LockIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'ellipsis':
			return (
				<EllipsisIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'close':
			return (
				<CloseIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'plus':
			return (
				<PlusIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'minus':
			return (
				<MinusIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'trash':
			return (
				<TrashIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'edit':
			return (
				<EditIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'danger':
			return (
				<DangerIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		case 'check': {
			return (
				<CheckIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		}
		case 'checkbox': {
			return (
				<CheckboxIcon
					width={width}
					height={height}
					className={className}
				/>
			);
		}
		case 'exit': {
			return (
				<ExitIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
		}
		case 'chevron': {
			return (
				<ChevronIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
		}
		case 'sun': {
			return (
				<SunIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
		}
		case 'moon': {
			return (
				<MoonIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
		}
		default:
			return (
				<ProfileIcon
					width={width}
					height={height}
					className={className}
					viewBox={viewBox}
				/>
			);
	}
};

export default Icon;
