import { TypeAction } from 'common/types';
import { TransactionDto } from 'generated/api';

export interface IActionTransactionResponseParams {
	typeAction: TypeAction;
	id?: number;
	data?: TransactionDto;
}
