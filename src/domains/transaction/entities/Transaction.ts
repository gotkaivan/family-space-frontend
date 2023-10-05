import { getRandomId } from 'common/helpers';
import { TransactionDto } from 'generated/api';

class Transaction implements TransactionDto {
	constructor(transaction?: TransactionDto) {
		this.id = transaction?.id || getRandomId();
		this.title = transaction?.title || '';
		this.description = transaction?.description || '';
		this.purchasePrice = transaction?.purchasePrice || 0;
		this.currentPrice = transaction?.currentPrice || 0;
		this.owesPrice = transaction?.owesPrice || 0;
		this.transactionType = transaction?.transactionType || TransactionDto.transactionType.INCOME;
		this.currencyType = transaction?.currencyType || TransactionDto.currencyType.RUB;
		this.amount = transaction?.amount || 1;
		this.transactionDate = transaction?.transactionDate || new Date().toISOString();
	}

	id: number;

	title: string;

	description: string;

	purchasePrice: number;

	owesPrice?: number | undefined;

	currentPrice: number;

	transactionType: TransactionDto.transactionType;

	currencyType: TransactionDto.currencyType;

	amount: number;

	transactionDate: string | null;
}

export default Transaction;
