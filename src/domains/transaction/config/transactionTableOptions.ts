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
		title: 'Название транзакции',
	},
	{
		id: getRandomId(),
		value: 'description',
		title: 'Описание транзакции',
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
		value: 'amount',
		title: 'Колличество',
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
