import { TaskDto, TaskStatusDto } from 'generated/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITaskStatusesProps } from '../components/TaskStatuses';
import { IActionTaskResponseParams } from '../types';

const useTaskStatuses = (props: ITaskStatusesProps) => {
	const formatData = (data: TaskStatusDto[]) => data.reduce((acc, col) => ({ ...acc, [col.id]: col.tasks }), {});

	const [localData, setLocalData] = useState(props.data);

	const [actionData, setActionData] = useState<IActionTaskResponseParams<TaskDto | TaskStatusDto | null> | null>(null);

	const isUpdateColumn = (id: number): boolean => !!(actionData?.itemType === 'status' && actionData.statusId === id);

	const modalData = useMemo((): TaskDto | null => {
		if (actionData?.data) {
			return actionData.data as TaskDto;
		}
		return null;
	}, [actionData?.data]);

	const removeFromList = (list: TaskDto[], index: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(index, 1);
		return [removed, result];
	};

	const addToList = (list: TaskDto[], destinationIndex: number, statusId: number, task: TaskDto) => {
		const result = Array.from(list);
		result.splice(destinationIndex, 0, task);
		return result;
	};

	function swap(arr: TaskStatusDto[], start: number, end: number) {
		arr[start] = arr.splice(end, 1, arr[start])[0];
	}

	const dragTask = useCallback(
		(result: any) => {
			const listCopy = { ...formatData(localData) };
			// @ts-ignore
			const sourceList = listCopy?.[result.source.droppableId];

			const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);
			// @ts-ignore
			listCopy[result.source.droppableId] = newSourceList;

			// @ts-ignore

			const destinationList = listCopy[result.destination.droppableId];
			const statusId = result.destination.droppableId;

			// @ts-ignore
			listCopy[result.destination.droppableId] = addToList(destinationList, result.destination.index, statusId, removedElement, statusId);
			const tasks = [...localData];

			const res = tasks.map(status => {
				Object.keys(listCopy).forEach(c => {
					if (status.id.toString() === c) {
						// @ts-ignore
						status.tasks = listCopy[c];
					}
				});
				return status;
			});

			setLocalData(res);
			props.changeTaskPosition(statusId, removedElement as TaskDto, props.data);
		},
		[addToList, props.data]
	);

	const dragColumn = useCallback(
		(result: any) => {
			const { source, destination, draggableId } = result;

			const sourceIndex = source.index;
			const destinationIndex = destination.index;

			const temporaryData = [...props.data];

			swap(temporaryData, sourceIndex, destinationIndex);

			const reqStatus = props.data.find(status => status.id === +draggableId);

			if (reqStatus) props.changeStatusPosition(reqStatus, temporaryData);

			setLocalData(temporaryData);
		},
		[addToList, props.data]
	);

	const onDragEnd = useCallback(
		(result: any) => {
			if (!result.destination) return;
			if (result.type === 'TASK') dragTask(result);
			if (result.type === 'COLUMN') dragColumn(result);
		},
		[addToList, props.data]
	);

	const onCreateUpdateTask = async (type: 'create' | 'update', task: TaskDto) => {
		if (type === 'update' && task && actionData?.statusId) {
			await props.updateTask(task);
			setActionData(null);
		} else if (actionData?.statusId) {
			await props.createNewTask(task);
			setActionData(null);
		}
	};

	const onUpdateStatus = async (status: TaskStatusDto) => {
		await props.updateStatus(status);
		setActionData(null);
	};

	async function deleteElement(): Promise<boolean> {
		if (actionData?.itemType === 'status' && actionData.statusId) {
			await props.deleteStatus(actionData.statusId);
			setActionData(null);
			return true;
		}

		if (actionData?.itemType === 'task' && actionData.statusId && actionData.taskId) {
			await props.deleteTask(actionData?.taskId);
			setActionData(null);
			return true;
		}
		return false;
	}

	const onActionHandler = async (actionData: IActionTaskResponseParams<TaskDto | TaskStatusDto | null>): Promise<boolean> => {
		setActionData(actionData);
		return true;
	};

	const onUpdateTask = async (task: TaskDto) => {
		await props.updateTask(task);
	};

	useEffect(() => {
		setLocalData(props.data);
	}, [props.data]);

	return {
		localData,
		onDragEnd,
		isUpdateColumn,
		onUpdateStatus,
		onActionHandler,
		onUpdateTask,
		actionData,
		setActionData,
		modalData,
		onCreateUpdateTask,
		deleteElement,
	};
};

export default useTaskStatuses;
