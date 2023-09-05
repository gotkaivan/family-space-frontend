import { API_HOST, KEY__AUTH_TOKEN } from 'common/constants';
import {
	StatusService,
	TaskService,
	SubtaskService,
	CancelablePromise,
	OpenAPI,
	TaskStatusDto,
	CreateTaskStatusDto,
	TaskDto,
	CreateTaskDto,
	SubtaskDto,
	CreateSubtaskDto,
	DeleteTaskResponseDto,
	DeleteTaskStatusResponseDto,
	DeleteSubtaskResponseDto,
	UpdateSubtaskDto,
} from 'generated/api';

const authToken = localStorage.getItem(KEY__AUTH_TOKEN);

OpenAPI.BASE = API_HOST;

if (authToken) {
	OpenAPI.HEADERS = {
		Authorization: `Bearer ${authToken}`,
	};
}

/**
 * Статусы
 */

export const getStatusesApi = (): CancelablePromise<TaskStatusDto[]> => {
	return StatusService.statusControllerGetStatuses();
};

export const getStatusByIdApi = (id: number): CancelablePromise<TaskStatusDto> => {
	return StatusService.statusControllerGetStatusById(id);
};

export const createStatusApi = (status: CreateTaskStatusDto): CancelablePromise<TaskStatusDto> => {
	return StatusService.statusControllerCreateStatus(status);
};

export const updateStatusApi = (status: TaskStatusDto): CancelablePromise<TaskStatusDto> => {
	return StatusService.statusControllerUpdateStatus(status);
};

export const deleteStatusApi = (id: number): CancelablePromise<DeleteTaskStatusResponseDto> => {
	return StatusService.statusControllerDeleteStatus(id);
};

/**
 * Задачи
 */

export const getTasksApi = (statusId: number): CancelablePromise<TaskDto[]> => {
	return TaskService.taskControllerGetTasks(statusId);
};

export const getTaskByIdApi = (id: number): CancelablePromise<TaskDto> => {
	return TaskService.taskControllerGetTaskById(id);
};

export const createTaskApi = (task: CreateTaskDto): CancelablePromise<TaskDto> => {
	return TaskService.taskControllerCreateTask(task);
};

export const updateTaskApi = (task: TaskDto): CancelablePromise<TaskDto> => {
	return TaskService.taskControllerUpdateTask(task);
};

export const deleteTaskApi = (id: number): CancelablePromise<DeleteTaskResponseDto> => {
	return TaskService.taskControllerDeleteTask(id);
};

/**
 * Подзадачи
 */

export const getSubtasksApi = (statusId: number): CancelablePromise<SubtaskDto[]> => {
	return SubtaskService.subtaskControllerGetSubtasks(statusId);
};

export const getSubtaskByIdApi = (id: number): CancelablePromise<SubtaskDto> => {
	return SubtaskService.subtaskControllerGetSubtaskById(id);
};

export const createSubtaskApi = (status: CreateSubtaskDto): CancelablePromise<SubtaskDto> => {
	return SubtaskService.subtaskControllerCreateSubtask(status);
};

export const updateSubtaskApi = (status: UpdateSubtaskDto): CancelablePromise<SubtaskDto> => {
	return SubtaskService.subtaskControllerUpdateSubtask(status);
};

export const deleteSubtaskApi = (id: number): CancelablePromise<DeleteSubtaskResponseDto> => {
	return SubtaskService.subtaskControllerDeleteSubtask(id);
};
