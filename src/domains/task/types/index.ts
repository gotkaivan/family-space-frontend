import { ActionType } from 'common/types';

export type ItemType = 'status' | 'task';

export interface IActionTaskResponseParams<DataType> {
	itemType: ItemType;
	typeAction: ActionType;
	statusId: number;
	taskId?: number;
	data?: DataType;
}
