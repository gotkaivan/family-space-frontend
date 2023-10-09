import { TransactionDto } from 'generated/api';

export interface ISellInvestment extends TransactionDto {
	sellAmount: number;
}
