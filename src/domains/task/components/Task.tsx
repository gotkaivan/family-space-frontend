import { Draggable } from 'react-beautiful-dnd';
import SettingsMenu from 'common/components/settings-menu/SettingsMenu';
import SubTask from './SubTask';
import { SubtaskDto, TaskDto } from 'generated/api';

interface IProps {
	item: TaskDto;
	index: number;
	onEdit: (id: number, data: TaskDto) => Promise<void>;
	updateSubtask: (subtask: SubtaskDto) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
}

const DraggableItem = ({ item, index, onDelete, onEdit, updateSubtask }: IProps) => {
	const onEditTask = async (): Promise<void> => {
		await onEdit(item.id, item);
	};

	const onDeleteTask = async (): Promise<void> => {
		await onDelete(item.id);
	};

	return (
		<Draggable
			draggableId={item.id.toString()}
			index={index}
		>
			{(provided: any, snapshot: any) => {
				return (
					<div
						className="relative cursor-move border flex justify-between p-7 pt-8 pr-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4 rounded-lg w-300"
						ref={provided.innerRef}
						snapshot={snapshot}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<SettingsMenu
							onEdit={onEditTask}
							onDelete={onDeleteTask}
							className="right-3 top-3"
						/>
						<div>
							<div className="mb-2 text-lg font-medium text-black dark:text-white">{item.title}</div>
							<div className="mb-6 text-sm">{item.description}</div>
							<div className="flex flex-col gap-2">
								{item.subtasks.map((subtask: SubtaskDto) => (
									<SubTask
										key={subtask.id}
										subtask={subtask}
										updateSubtask={updateSubtask}
									/>
								))}
							</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};

export default DraggableItem;
