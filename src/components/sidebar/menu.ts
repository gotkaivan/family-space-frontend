import { IPropsIcon, IconName } from '../icons/types';

interface IMenuItem {
	name: string;
	url: string;
	icon: IPropsIcon & { name: IconName };
}

const menu: IMenuItem[] = [
	{
		name: 'Analytics',
		url: 'analytics',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
	{
		name: 'Income/Expenses',
		url: 'income',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
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
		name: 'Chat',
		url: 'chat',
		icon: {
			name: 'profile',
			width: 18,
			height: 18,
		},
	},
	{
		name: 'Notes',
		url: 'notes',
		icon: {
			name: 'table',
			width: 18,
			height: 19,
		},
	},
];

export default menu;
