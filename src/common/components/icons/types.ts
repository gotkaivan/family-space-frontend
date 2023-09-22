export type IconName =
	| 'calendar'
	| 'exit'
	| 'profile'
	| 'table'
	| 'settings'
	| 'email'
	| 'lock'
	| 'ellipsis'
	| 'close'
	| 'plus'
	| 'minus'
	| 'trash'
	| 'edit'
	| 'danger'
	| 'check'
	| 'checkbox'
	| 'chevron'
	| 'sun'
	| 'moon';

export interface IPropsIcon {
	name: IconName;
	width: number;
	height: number;
	className?: string;
	viewBox?: string;
}
