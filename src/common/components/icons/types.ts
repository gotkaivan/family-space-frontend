export type IconName =
	| 'calendar'
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
	| 'checkbox';

export interface IPropsIcon {
	name: IconName;
	width: number;
	height: number;
	color?: string;
}
