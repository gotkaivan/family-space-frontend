import { getRandomId } from 'common/helpers';

export interface ITableColumn {
	id: number;
	value: string;
	title: string;
}

const tableOptions: ITableColumn[] = [
	{
		id: getRandomId(),
		value: 'title',
		title: 'Название инестиции',
	},
	{
		id: getRandomId(),
		value: 'value',
		title: 'Сумма',
	},
	{
		id: getRandomId(),
		value: 'amount',
		title: 'Колличество',
	},
	{
		id: getRandomId(),
		value: 'currencyType',
		title: 'Валюта покупки',
	},
	{
		id: getRandomId(),
		value: 'transactionDate',
		title: 'Дата создания инвестиции',
	},
];

export default tableOptions;
