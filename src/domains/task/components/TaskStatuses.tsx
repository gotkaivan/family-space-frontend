import { FC, useEffect, useMemo } from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskStatus from './TaskStatus';
import { IActionTaskResponseParams } from '../types';
import CreateUpdateModal from './CreateUpdateModal';
import Button from 'common/components/ui/Button';
import DeleteModal from 'common/components/modals/DeleteModal';
import { DeleteTaskResponseDto, DeleteTaskStatusResponseDto, SubtaskDto, TaskDto, TaskStatusDto } from 'generated/api';
import Drop from './draggable/Drop';
import Drag from './draggable/Drag';
import useTaskStatuses from '../hooks/useTaskStatuses';

export interface ITaskStatusesProps {
	data: TaskStatusDto[];
	createNewTask: (task: TaskDto) => Promise<TaskDto | null>;
	createNewStatus: () => Promise<TaskStatusDto | null>;
	deleteStatus: (statusId: number) => Promise<DeleteTaskStatusResponseDto | null>;
	deleteTask: (taskId: number) => Promise<DeleteTaskResponseDto | null>;
	updateStatus: (status: TaskStatusDto) => Promise<TaskStatusDto | null>;
	updateSubtask: (subtask: SubtaskDto) => Promise<void>;
	changeTaskPosition: (statusId: number, task: TaskDto, data: TaskStatusDto[]) => void;
	changeStatusPosition: (status: TaskStatusDto, data: TaskStatusDto[]) => void;
	deleteSubtask: (subtaskId: number) => Promise<DeleteTaskResponseDto | null>;
	updateTask: (task: TaskDto) => Promise<TaskDto | null>;
}

const TaskStatuses: FC<ITaskStatusesProps> = props => {
	const { createNewStatus, updateSubtask, deleteSubtask } = props;

	const { localData, onDragEnd, isUpdateColumn, onUpdateStatus, onActionHandler, onUpdateTask, actionData, setActionData, modalData, onCreateUpdateTask, deleteElement } =
		useTaskStatuses(props);

	const tableWidth = useMemo(() => {
		return localData.length * 330 + 'px';
	}, [localData.length]);

	const deleteTitleWord = useMemo(() => (actionData?.typeItem === 'status' ? 'статус' : 'задачу'), [actionData?.typeItem]);

	return (
		<div className="overflow-x-scroll h-screen">
			<DragDropContext onDragEnd={onDragEnd}>
				<Drop
					droppableId="all-columns"
					type="COLUMN"
					direction="horizontal"
				>
					<div className="flex justify-start">
						<div
							className="flex justify-start"
							style={{ width: tableWidth }}
						>
							{localData.map((taskStatus, index) => (
								<Drag
									key={taskStatus.id}
									draggableId={taskStatus.id.toString()}
									index={index}
									dragAll={false}
								>
									<TaskStatus
										taskStatus={taskStatus}
										isUpdateStatus={isUpdateColumn(taskStatus.id)}
										onUpdateStatus={onUpdateStatus}
										onActionHandler={onActionHandler}
										onUpdateTask={onUpdateTask}
										updateSubtask={updateSubtask}
										key={taskStatus.id}
										createNewTask={(statusId: number) =>
											setActionData({
												typeItem: 'task',
												typeAction: 'create',
												statusId,
												isOpen: true,
											})
										}
									/>
								</Drag>
							))}
						</div>

						<div>
							<Button
								clickHandler={createNewStatus}
								title={'Добавить новый статус'}
								className={`p-3 w-full text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark`}
							/>
						</div>
					</div>
				</Drop>
			</DragDropContext>
			{actionData?.statusId && actionData.typeItem === 'task' && (actionData.typeAction === 'create' || actionData?.typeAction === 'edit') && (
				<CreateUpdateModal
					id={actionData.taskId}
					statusId={actionData.statusId}
					data={modalData}
					deleteSubtask={deleteSubtask}
					onCreateUpdateTask={onCreateUpdateTask}
					close={() => setActionData(null)}
				/>
			)}

			{actionData?.typeAction === 'delete' && (
				<DeleteModal
					title={`Удалить ${deleteTitleWord}`}
					description={`Вы точно хотите удалить ${deleteTitleWord} ?`}
					cancel={() => setActionData(null)}
					confirm={() => deleteElement()}
				/>
			)}
		</div>
	);
};

export default TaskStatuses;
