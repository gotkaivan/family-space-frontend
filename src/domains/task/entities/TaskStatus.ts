import { getRandomId } from 'common/helpers';
import { TaskDto, TaskStatusDto } from 'generated/api';

class TaskStatusEntity implements TaskStatusDto {
	constructor(status?: TaskStatusDto) {
		this.id = status?.id || getRandomId();
		this.title = status?.title || 'Новый статус';
		this.description = status?.description || '';
		this.position = status?.position || 0;
		this.tasks = status?.tasks || [];
	}
	position: number;

	tasks: TaskDto[];

	id: number;

	title: string;

	description: string;
}

export default TaskStatusEntity;
