import { getRandomId } from '../../../helpers';
import { ISubTask } from '../types';

class SubTask implements ISubTask {
	constructor(subtask: ISubTask) {
		this.id = subtask.id || getRandomId();
		this.content = subtask.content || '';
		this.isCompleted = subtask.isCompleted || false;
	}

	id: number;

	content: string;

	isCompleted: boolean;
}

export default SubTask;
