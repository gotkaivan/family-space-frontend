import { getRandomId } from 'common/helpers';
import { TransactionDto } from 'generated/api';

export interface ITransactionTableColumn {
	id: number;
	value: keyof TransactionDto;
	title: string;
}

const tableOptions: ITransactionTableColumn[] = [
	{
		id: getRandomId(),
		value: 'title',
		title: 'Название инвестиции',
	},
	{
		id: getRandomId(),
		value: 'description',
		title: 'Описание инвестиции',
	},
	{
		id: getRandomId(),
		value: 'purchasePrice',
		title: 'Цена покупки единицы',
	},
	{
		id: getRandomId(),
		value: 'currentPrice',
		title: 'Текущая стоимость единицы',
	},
	{
		id: getRandomId(),
		value: 'owesPrice',
		title: 'Долг',
	},
	{
		id: getRandomId(),
		value: 'currentAmount',
		title: 'Текущее количество',
	},
	{
		id: getRandomId(),
		value: 'currencyType',
		title: 'Валюта',
	},
	{
		id: getRandomId(),
		value: 'transactionType',
		title: 'Тип транзакции',
	},
	{
		id: getRandomId(),
		value: 'transactionDate',
		title: 'Дата транзакции',
	},
];

export default tableOptions;
