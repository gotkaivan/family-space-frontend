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
