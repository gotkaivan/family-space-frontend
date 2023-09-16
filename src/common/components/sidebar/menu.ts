import { IPropsIcon, IconName } from '../icons/types';

interface IMenuItem {
	name: string;
	url: string;
	icon: IPropsIcon & { name: IconName };
}

const menu: IMenuItem[] = [
	{
		name: 'Задачи',
		url: 'tasks',
		icon: {
			name: 'table',
			width: 18,
			height: 19,
		},
	},

	{
		name: 'Транзакции',
		url: 'transactions',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
	{
		name: 'Капитализация',
		url: 'capitalization',
		icon: {
			name: 'calendar',
			width: 18,
			height: 18,
		},
	},
	// {
	// 	name: 'Аналитика',
	// 	url: 'analytics',
	// 	icon: {
	// 		name: 'calendar',
	// 		width: 18,
	// 		height: 18,
	// 	},
	// },
];

export default menu;
