import { getRandomId } from 'common/helpers';
import { SubtaskDto, TaskDto } from 'generated/api';

class Task implements TaskDto {
	constructor(task?: TaskDto) {
		this.id = task?.id || getRandomId();
		this.title = task?.title || '';
		this.description = task?.description || '';
		this.statusId = task?.statusId || 0;
		this.subtasks = task?.subtasks || [];
		this.position = task?.position || 0;
	}
	position: number;

	subtasks: SubtaskDto[];

	id: number;

	title: string;

	description: string;

	statusId: number;
}

export default Task;
