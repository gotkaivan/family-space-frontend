import { IPropsIcon, IconName } from '../icons/types';

interface IMenuItem {
	name: string;
	url: string;
	icon: IPropsIcon & { name: IconName };
}

const menu: IMenuItem[] = [
	{
		name: 'Tasks',
		url: 'tasks',
		icon: {
			name: 'table',
			width: 18,
			height: 19,
		},
	},

	{
		name: 'Transactions',
		url: 'transactions',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
	{
		name: 'Capitalization',
		url: 'capitalization',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
	{
		name: 'Analytics',
		url: 'analytics',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
];

export default menu;
