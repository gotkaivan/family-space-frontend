import { getRandomId } from 'common/helpers';
import { TransactionDto } from 'generated/api';

class Investment implements TransactionDto {
	constructor(investment?: TransactionDto) {
		this.id = investment?.id || getRandomId();
		this.title = investment?.title || '';
		this.description = investment?.description || '';
		this.purchasePrice = investment?.purchasePrice || 0;
		this.currentPrice = investment?.currentPrice || this.purchasePrice;
		this.owesPrice = investment?.owesPrice || 0;
		this.transactionType = TransactionDto.transactionType.INVESTMENT;
		this.currencyType = investment?.currencyType || TransactionDto.currencyType.RUB;
		this.purchaseAmount = investment?.purchaseAmount || 1;
		this.currentAmount = investment?.currentAmount || this.purchaseAmount;
		this.transactionDate = investment?.transactionDate || new Date().toISOString();
		this.transactionSaleId = investment?.transactionSaleId;
		this.status = investment?.status || TransactionDto.status.ACTIVE;
		this.isExistBefore = investment?.isExistBefore;
	}

	status: TransactionDto.status;

	id: number;

	title: string;

	description: string;

	purchasePrice: number;

	owesPrice?: number | undefined;

	currentPrice: number;

	transactionType: TransactionDto.transactionType.INVESTMENT;

	currencyType: TransactionDto.currencyType;

	purchaseAmount: number;

	currentAmount: number;

	transactionDate: string | null;

	transactionSaleId?: number | undefined;

	isExistBefore?: boolean | undefined;
}

export default Investment;
