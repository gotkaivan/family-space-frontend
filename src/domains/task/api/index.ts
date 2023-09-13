import { API_HOST } from 'common/constants';
import {
	BoardsService,
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
	BoardDto,
	CreateBoardDto,
	DeleteBoardResponseDto,
} from 'generated/api';

OpenAPI.BASE = API_HOST;

OpenAPI.CREDENTIALS = 'include';

OpenAPI.WITH_CREDENTIALS = true;

/**
 * Доски
 */

export const getBoardsApi = (): CancelablePromise<BoardDto[]> => {
	return BoardsService.boardControllerGetBoards();
};

export const getBoardByIdApi = (id: number): CancelablePromise<BoardDto> => {
	return BoardsService.boardControllerGetBoardById(id);
};

export const createBoardApi = (board: CreateBoardDto): CancelablePromise<BoardDto> => {
	return BoardsService.boardControllerCreateBoard(board);
};

export const updateBoardApi = (status: BoardDto): CancelablePromise<BoardDto> => {
	return BoardsService.boardControllerUpdateBoard(status);
};

export const deleteBoardApi = (id: number): CancelablePromise<DeleteBoardResponseDto> => {
	return BoardsService.boardControllerDeleteBoard(id);
};

/**
 * Статусы
 */

export const getStatusesByGroupIdApi = (groupId: number): CancelablePromise<TaskStatusDto[]> => {
	return StatusService.statusControllerGetStatuses(groupId);
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
