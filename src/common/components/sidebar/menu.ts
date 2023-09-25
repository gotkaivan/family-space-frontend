import {} from 'lucide-react';
import { IIconProps } from '../ui/LucideIcon';

interface IMenuItem {
	name: string;
	url: string;
	icon: Omit<IIconProps, 'size'>;
}

const menu: IMenuItem[] = [
	{
		name: 'Задачи',
		url: 'tasks',
		icon: {
			name: 'clipboard-list',
		},
	},

	{
		name: 'Транзакции',
		url: 'transactions',
		icon: {
			name: 'arrow-left-right',
		},
	},
	{
		name: 'Капитализация',
		url: 'capitalization',
		icon: {
			name: 'circle-dollar-sign',
		},
	},
];

export default menu;
