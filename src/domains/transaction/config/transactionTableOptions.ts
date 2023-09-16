import { getRandomId } from 'common/helpers';

export interface ITransactionTableColumn {
	id: number;
	value: string;
	title: string;
}

const tableOptions: ITransactionTableColumn[] = [
	{
		id: getRandomId(),
		value: 'Название',
		title: 'Название транзакции',
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
		title: 'Валюта',
	},
	{
		id: getRandomId(),
		value: 'TransactionType',
		title: 'Тип транзакции',
	},
	{
		id: getRandomId(),
		value: 'transactionDate',
		title: 'Дата транзакции',
	},
];

export default tableOptions;
