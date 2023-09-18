import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { useEffect, useMemo, useState } from 'react';
import {
	getStatusesByGroupIdApi,
	createStatusApi,
	createTaskApi,
	deleteTaskApi,
	updateStatusApi,
	updateTaskApi,
	deleteStatusApi,
	createSubtaskApi,
	updateSubtaskApi,
	deleteSubtaskApi,
} from '../api';
import { CancelablePromise, CreateTaskStatusDto, DeleteTaskResponseDto, DeleteTaskStatusResponseDto, SubtaskDto, TaskDto, TaskStatusDto } from 'generated/api';
import { redirect, useParams } from 'react-router-dom';

const INITIAL_POSITION = 10000000;

const useTask = () => {
	const { notify } = useNotify();
	const { boardId } = useParams();
	const [data, setData] = useState<TaskStatusDto[]>([]);

	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

	const isLoading = useMemo(() => {
		if (!isPageLoaded && isLoadingData) return true;
		return false;
	}, [isLoadingData, isPageLoaded]);

	async function getData() {
		setIsLoadingData(true);

		try {
			if (!boardId) return;
			const statuses = await getStatusesByGroupIdApi(+boardId);
			setData(statuses);
			setIsPageLoaded(true);
			setIsPageLoaded(true);
			return;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось получить задачи');
			redirect('/tasks');
		} finally {
			setIsLoadingData(false);
		}
	}

	function getStatusPosition(): number {
		return data.length ? data[data.length - 1].position / 2 : INITIAL_POSITION;
	}

	function getTaskPosition(task: TaskDto): number {
		let position = INITIAL_POSITION;
		data.forEach(async status => {
			if (status.id === task.statusId && status.tasks.length) {
				position = status.tasks[status.tasks.length - 1].position / 2;
			}
		});
		return position;
	}

	function getPosition(prev: TaskStatusDto | TaskDto, next: TaskStatusDto | TaskDto, initialPosition = INITIAL_POSITION) {
		if (!prev && !next) {
			return INITIAL_POSITION;
		}
		if (!next && prev) {
			return prev.position / 2;
		}
		if (!prev && next) {
			return next.position * 2;
		}
		if (prev && next) {
			return (prev.position + next.position) / 2;
		}
		return initialPosition;
	}

	function changeTaskPosition(statusId: number, task: TaskDto, statuses: TaskStatusDto[]) {
		let position = INITIAL_POSITION;
		statuses.forEach(status => {
			if (status.id === +statusId) {
				status.tasks.forEach((t: TaskDto, index: number, arr) => {
					if (t.id === task.id) {
						const prev = arr[index - 1];
						const next = arr[index + 1];

						position = getPosition(prev, next);
					}
				});
			}
		});

		const request: TaskDto = {
			...task,
			statusId,
			position,
		};

		updateTask(request, false);
	}

	async function changeStatusPosition(status: TaskStatusDto, statuses: TaskStatusDto[]) {
		let position = INITIAL_POSITION;
		statuses.forEach((s, index, arr) => {
			if (s.id === status.id) {
				const prev = arr[index - 1];
				const next = arr[index + 1];

				position = getPosition(prev, next);
			}
		});

		const request: TaskStatusDto = {
			...status,
			position,
		};

		updateStatus(request);
	}

	async function createNewStatus(boardId: number): Promise<TaskStatusDto | null> {
		try {
			const newStatus: CreateTaskStatusDto = {
				title: 'Новый статус',
				description: '',
				boardId,
				position: getStatusPosition(),
			};

			const status = await createStatusApi(newStatus);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Статус успешно создан');

			return status;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось создать статус');
			return null;
		}
	}

	async function createNewTask(task: TaskDto): Promise<TaskDto | null> {
		try {
			const promises: CancelablePromise<SubtaskDto>[] = [];

			const createdTask = await createTaskApi({ ...task, position: getTaskPosition(task) });

			task.subtasks.forEach(async subtask => {
				promises.push(
					createSubtaskApi({
						...subtask,
						taskId: createdTask.id,
					})
				);
			});
			await Promise.allSettled(promises);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Задача успешно создана');
			return createdTask;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось создать новую задачу');
			return null;
		}
	}

	async function updateTask(task: TaskDto, updateSubtask: boolean = true): Promise<TaskDto | null> {
		console.log('update task');
		try {
			const promises: CancelablePromise<SubtaskDto>[] = [];

			const updatedTask = await updateTaskApi(task);

			if (updateSubtask) {
				task.subtasks.forEach(async subtask => {
					console.log(subtask);
					promises.push(
						updateSubtaskApi({
							...subtask,
							taskId: updatedTask.id,
						})
					);
				});

				await Promise.allSettled(promises);
			}

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Задача успешно обновлена');
			return updatedTask;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось обновить задачу');
			return null;
		}
	}

	async function deleteStatus(statusId: number): Promise<DeleteTaskStatusResponseDto | null> {
		try {
			const response = await deleteStatusApi(statusId);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Статус удачно удален');

			return response;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось удалить статус');
			return null;
		}
	}

	async function deleteTask(taskId: number): Promise<DeleteTaskResponseDto | null> {
		try {
			const response = await deleteTaskApi(taskId);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Задача удачно удалена');

			return response;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось удалить задачу');
			return null;
		}
	}

	async function deleteSubtask(subtaskId: number): Promise<DeleteTaskResponseDto | null> {
		try {
			const response = await deleteSubtaskApi(subtaskId);
			await getData();
			return response;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось удалить подзадачу');
			return null;
		}
	}

	async function updateStatus(status: TaskStatusDto): Promise<TaskStatusDto | null> {
		try {
			const updatedStatus = await updateStatusApi(status);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Статус успешно обновлен');

			return updatedStatus;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось обновить статус');
			return null;
		}
	}

	async function updateSubtask(subtask: SubtaskDto): Promise<void> {
		try {
			await updateSubtaskApi(subtask);

			notify(NOTIFY_TYPES.SUCCESS, 'Подзадача успешно обновлен');
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось обновить подзадачу');
		}
	}

	useEffect(() => {
		getData();
	}, [boardId]);
	return {
		data,
		isLoading,
		createNewTask,
		createNewStatus,
		updateStatus,
		updateTask,
		changeTaskPosition,
		changeStatusPosition,
		updateSubtask,
		deleteStatus,
		deleteTask,
		deleteSubtask,
	};
};

export default useTask;
