import React from 'react';
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
} from '../icons';
import { IPropsIcon } from '../icons/types';

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
		case 'ellipsis':
			return (
				<EllipsisIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'close':
			return (
				<CloseIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'plus':
			return (
				<PlusIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'minus':
			return (
				<MinusIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'trash':
			return (
				<TrashIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'edit':
			return (
				<EditIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'danger':
			return (
				<DangerIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		case 'check': {
			return (
				<CheckIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		}
		case 'checkbox': {
			return (
				<CheckboxIcon
					width={width}
					height={height}
					color={color}
				/>
			);
		}
	}
};

export default Icon;