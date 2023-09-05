import { TypeAction } from 'common/types';

export enum TRANSACTION_TYPES {
	INCOME__TRANSACTION__TYPE = 'incomeTransactionType',
	EXPENSES__TRANSACTION__TYPE = 'expensesTransactionType',
	INVESTMENT__TRANSACTION__TYPE = 'investmentTransactionType',
	SALE__TRANSACTION__TYPE = 'saleTransactionType',
}

export enum CURRENCY_TYPE {
	EUR = 'EUR',
	RUB = 'RUB',
	USD = 'USD',
}

export interface ITransaction {
	id: number;
	title: string;
	transactionType: TRANSACTION_TYPES;
	currencyType: CURRENCY_TYPE;
	value: number;
	amount: number;
	transactionDate: string | null;
	isUncountable: boolean;
	created: string;
	updated: string;
}

export interface IActionTransactionResponseParams {
	typeAction: TypeAction;
	id?: number;
	data?: ITransaction;
}
