import { useEffect, useState } from 'react';
import { DraggableProvided, Droppable } from 'react-beautiful-dnd';
import { IActionTaskResponseParams } from '../types';
import SettingsMenu from 'common/components/settings-menu/SettingsMenu';
import Button from 'common/components/ui/Button';
import Input from 'common/components/ui/Input';
import SquareButton from 'common/components/ui/SquareButton';
import { SubtaskDto, TaskDto, TaskStatusDto } from 'generated/api';
import Task from './Task';

interface IProps {
	taskStatus: TaskStatusDto;
	createNewTask: (taskStatusId: number) => void;
	onUpdateStatus: (status: TaskStatusDto) => Promise<void>;
	onUpdateTask: (task: TaskDto) => Promise<void>;
	updateSubtask: (subtask: SubtaskDto) => Promise<void>;
	onActionHandler: (params: IActionTaskResponseParams<TaskDto | TaskStatusDto | null>) => void;
	isUpdateStatus?: boolean;
	provided?: DraggableProvided;
}

const TaskStatus = ({ taskStatus, createNewTask, onActionHandler, onUpdateStatus, updateSubtask, onUpdateTask, isUpdateStatus, provided }: IProps) => {
	const [item, setItem] = useState<TaskStatusDto>(taskStatus);

	useEffect(() => {
		setItem(taskStatus);
	}, [taskStatus]);

	const onEditTaskAction = async (taskId: number, data: TaskDto): Promise<void> => {
		await onActionHandler({
			typeItem: 'task',
			typeAction: 'edit',
			statusId: taskStatus.id,
			taskId,
			data,
		});
	};

	const onDeleteTaskAction = async (taskId: number): Promise<void> => {
		await onActionHandler({
			typeItem: 'task',
			typeAction: 'delete',
			statusId: taskStatus.id,
			taskId,
		});
	};

	const onEditColumnAction = async (): Promise<void> => {
		await onActionHandler({
			typeItem: 'status',
			typeAction: 'edit',
			statusId: taskStatus.id,
			data: item,
		});
	};

	const onDeleteColumnAction = async (): Promise<void> => {
		await onActionHandler({
			typeItem: 'status',
			typeAction: 'delete',
			statusId: taskStatus.id,
		});
	};

	return (
		<div className="mr-6 relative h-100">
			<div className={`mb-18px ${!isUpdateStatus && 'hidden'}`}>
				<Input
					value={item.title}
					onChange={e => setItem({ ...item, title: e.target.value })}
					withError={false}
					inputSize="sm"
					right={
						<SquareButton
							buttonSize="sm"
							iconName="check"
							size={14}
							onClick={() => onUpdateStatus(item)}
						/>
					}
				/>
			</div>
			<div className={`${isUpdateStatus && 'hidden'}`}>
				<SettingsMenu
					onDelete={onDeleteColumnAction}
					onEdit={onEditColumnAction}
					className="right-3 pt-1"
				/>
				<div
					{...provided?.dragHandleProps}
					className="text-xl font-semibold text-black dark:text-white mb-8 w-300"
				>
					{`${item.title} (${item.tasks.length})`}{' '}
				</div>
			</div>

			<Droppable
				type="TASK"
				droppableId={`${taskStatus.id.toString()}`}
			>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{taskStatus.tasks.map((item: TaskDto, index: number) => (
							<Task
								onEdit={onEditTaskAction}
								onDelete={onDeleteTaskAction}
								updateSubtask={updateSubtask}
								key={item.id}
								item={item}
								index={index}
							/>
						))}
						{provided.placeholder}
						<Button
							clickHandler={() => createNewTask(taskStatus.id)}
							title={'Добавить задачу'}
							className={`w-36 p-3 text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark`}
						/>
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default TaskStatus;
