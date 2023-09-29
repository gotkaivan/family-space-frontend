import { TransactionDto } from 'generated/api';

export interface IInvestment extends TransactionDto {}

export interface ISellInvestment extends IInvestment {
	sellAmount: number;
}
