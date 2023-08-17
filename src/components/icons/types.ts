export type IconName = 'calendar' | 'profile' | 'table' | 'settings' | 'email' | 'lock' | 'ellipsis' | 'close' | 'plus' | 'minus';

export interface IPropsIcon {
	name: IconName;
	width: number;
	height: number;
	color?: string;
}
