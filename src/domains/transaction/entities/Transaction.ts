import { getRandomId } from 'common/helpers';
import { TransactionDto } from 'generated/api';

class Transaction implements TransactionDto {
	constructor(transaction?: TransactionDto) {
		this.id = transaction?.id || getRandomId();
		this.title = transaction?.title || '';
		this.description = transaction?.description || '';
		this.purchasePrice = transaction?.purchasePrice || 0;
		this.currentPrice = transaction?.currentPrice || this.purchasePrice;
		this.owesPrice = transaction?.owesPrice || 0;
		this.transactionType = transaction?.transactionType || TransactionDto.transactionType.INCOME;
		this.currencyType = transaction?.currencyType || TransactionDto.currencyType.RUB;
		this.purchaseAmount = transaction?.purchaseAmount || 1;
		this.currentAmount = transaction?.currentAmount || this.purchaseAmount;
		this.transactionDate = transaction?.transactionDate || new Date().toISOString();
		this.transactionSaleId = transaction?.transactionSaleId;
		this.status = transaction?.status || TransactionDto.status.ACTIVE;
	}

	status: TransactionDto.status;

	id: number;

	title: string;

	description: string;

	purchasePrice: number;

	owesPrice?: number | undefined;

	currentPrice: number;

	transactionType: TransactionDto.transactionType;

	currencyType: TransactionDto.currencyType;

	purchaseAmount: number;

	currentAmount: number;

	transactionDate: string | null;

	transactionSaleId?: number | undefined;
}

export default Transaction;
