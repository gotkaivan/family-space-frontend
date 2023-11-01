import { ActionType } from 'common/types';
import { TransactionDto } from 'generated/api';

export interface IActionTransactionResponseParams {
	actionType: ActionType;
	id?: number;
	data?: TransactionDto;
}
