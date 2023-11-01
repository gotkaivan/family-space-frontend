import { IIconProps } from '../ui/Icon';

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
			name: 'list-checks',
		},
	},

	{
		name: 'Заметки',
		url: 'notes',
		icon: {
			name: 'scroll-text',
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
		name: 'Инвестиции',
		url: 'investments',
		icon: {
			name: 'circle-dollar-sign',
		},
	},
];

export default menu;
