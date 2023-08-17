import { getRandomId } from '../../../helpers';
import { ISubTask, ITask } from '../types';

class Task implements ITask {
	constructor(task: ITask) {
		this.id = task.id || getRandomId();
		this.columnId = task.columnId || getRandomId();
		this.title = task.title || '';
		this.description = task.description || '';
		this.subtasks = task.subtasks || [];
	}

	id: number;

	columnId: number;

	title: string;

	description: string;

	subtasks: ISubTask[];
}

export default Task;
