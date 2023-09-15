import { TypeAction } from 'common/types';

export type TypeItem = 'status' | 'task';

export interface IActionTaskResponseParams<DataType> {
	typeItem: TypeItem;
	typeAction: TypeAction;
	statusId: number;
	taskId?: number;
	data?: DataType;
}
