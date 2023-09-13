import { TypeAction } from 'common/types';

export interface ITaskColumn {
	id: number;
	title: string;
	items: ITask[];
}

export interface ITask {
	id: number;
	columnId: number;
	title: string;
	description: string;
	subtasks: ISubTask[];
}

export interface ISubTask {
	id: number;
	content: string;
	isCompleted: boolean;
}

export type TypeItem = 'status' | 'task';

export interface IActionTaskResponseParams<DataType> {
	typeItem: TypeItem;
	typeAction: TypeAction;
	statusId: number;
	taskId?: number;
	data?: DataType;
}
