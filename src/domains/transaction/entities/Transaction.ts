import { getRandomId } from 'common/helpers';
import { CURRENCY_TYPE, ITransaction, TRANSACTION_TYPES } from '../types';

class Transaction implements ITransaction {
	constructor(transaction?: ITransaction) {
		this.id = transaction?.id || getRandomId();
		this.title = transaction?.title || '';
		this.transactionType = transaction?.transactionType || TRANSACTION_TYPES.INCOME__TRANSACTION__TYPE;
		this.currencyType = transaction?.currencyType || CURRENCY_TYPE.RUB;
		this.value = transaction?.value || 0;
		this.amount = transaction?.amount || 1;
		this.transactionDate = transaction?.transactionDate || new Date().toISOString();
		this.isUncountable = transaction?.isUncountable || false;
		this.created = transaction?.created || new Date().toISOString();
		this.updated = transaction?.updated || new Date().toISOString();
	}
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

export default Transaction;
