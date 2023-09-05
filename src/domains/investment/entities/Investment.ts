import { getRandomId } from 'common/helpers';
import { IInvestment } from '../types';
import { CURRENCY_TYPE, TRANSACTION_TYPES } from 'domains/transaction/types';

class Investment implements IInvestment {
	constructor(investment?: IInvestment) {
		this.id = investment?.id || getRandomId();
		this.title = investment?.title || '';
		this.transactionType = TRANSACTION_TYPES.INVESTMENT__TRANSACTION__TYPE;
		this.currencyType = investment?.currencyType || CURRENCY_TYPE.RUB;
		this.value = investment?.value || 0;
		this.amount = investment?.amount || 1;
		this.transactionDate = investment?.transactionDate || new Date().toISOString();
		this.isUncountable = investment?.isUncountable || false;
		this.created = investment?.created || new Date().toISOString();
		this.updated = investment?.updated || new Date().toISOString();
	}
	id: number;

	title: string;

	transactionType: TRANSACTION_TYPES.INVESTMENT__TRANSACTION__TYPE;

	currencyType: CURRENCY_TYPE;

	value: number;

	amount: number;

	transactionDate: string | null;

	isUncountable: boolean;

	created: string;

	updated: string;
}

export default Investment;
