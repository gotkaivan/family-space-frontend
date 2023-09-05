import { ITransaction } from 'domains/transaction/types';

export interface IInvestment extends ITransaction {}

export interface ISellInvestment extends IInvestment {
	sellAmount: number;
}
