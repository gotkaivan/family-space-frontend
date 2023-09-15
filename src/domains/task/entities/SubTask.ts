import { getRandomId } from 'common/helpers';
import { SubtaskDto } from 'generated/api';

class SubTask implements SubtaskDto {
	constructor(subtask?: SubtaskDto) {
		this.id = subtask?.id || getRandomId();
		this.title = subtask?.title || '';
		this.description = subtask?.description || '';
		this.isCompleted = subtask?.isCompleted || false;
		this.position = subtask?.position || 0;
		this.taskId = subtask?.taskId || 0;
		this.isNewSubtask = true;
	}
	position: number;

	taskId: number;

	id: number;

	title: string;

	description: string;

	isCompleted: boolean;

	isNewSubtask: boolean;
}

export default SubTask;
