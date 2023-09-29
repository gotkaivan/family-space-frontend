import { getRandomId } from 'common/helpers';
import { IInvestment } from '../types';
import { TransactionDto } from 'generated/api';

class Investment implements TransactionDto {
	constructor(investment?: IInvestment) {
		this.id = investment?.id || getRandomId();
		this.title = investment?.title || '';
		this.description = investment?.description || '';
		this.purchasePrice = investment?.purchasePrice || 0;
		this.currentPrice = investment?.currentPrice || 0;
		this.transactionType = TransactionDto.transactionType.INVESTMENT;
		this.currencyType = investment?.currencyType || TransactionDto.currencyType.RUB;
		this.amount = investment?.amount || 1;
		this.transactionDate = investment?.transactionDate || new Date().toISOString();
	}

	id: number;

	title: string;

	description: string;

	purchasePrice: number;

	owesPrice?: number | undefined;

	currentPrice: number;

	transactionType: TransactionDto.transactionType.INVESTMENT;

	currencyType: TransactionDto.currencyType;

	amount: number;

	transactionDate: string | null;
}

export default Investment;
