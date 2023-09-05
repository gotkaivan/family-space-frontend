import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import SquareButton from 'common/components/ui/SquareButton';
import Icon from 'common/components/ui/Icon';
import Textarea from 'common/components/ui/Textarea';
import Button from 'common/components/ui/Button';
import Task from '../entities/Task';
import SubTask from '../entities/SubTask';
import { DeleteTaskResponseDto, SubtaskDto, TaskDto } from 'generated/api';

interface IProps {
	id?: number | undefined;
	statusId: number;
	onCreateUpdateTask: (type: 'create' | 'update', task: TaskDto) => void;
	deleteSubtask: (subtaskId: number) => Promise<DeleteTaskResponseDto | null>;
	close: () => void;
	data?: TaskDto | null;
}

type WithNewParameter = {
	isNewSubtask?: boolean;
};

type LocalSubtask = SubtaskDto & WithNewParameter;

const CreateUpdateModal: FC<IProps> = ({ onCreateUpdateTask, deleteSubtask, close, data, id, statusId }) => {
	const [state, setState] = useState<TaskDto>(data || new Task());

	const addNewSubtask = useCallback(() => {
		const subtasks = [...state.subtasks];

		const subtask = { ...new SubTask() };

		subtasks.push(subtask);

		const result = { ...state, subtasks };

		setState(result);
	}, [state]);

	const removeSubtask = useCallback(
		async (subtask: LocalSubtask) => {
			if (!subtask.isNewSubtask) await deleteSubtask(subtask.id);

			const subtasks = state.subtasks.filter(s => s.id !== subtask.id);

			const result = { ...state, subtasks };

			setState(result);
		},
		[state]
	);

	const changeSubtask = useCallback(
		(e: ChangeEvent<HTMLInputElement>, id: number) => {
			const subtasks = state.subtasks.map(subtask => {
				if (subtask.id === id) {
					return {
						...subtask,
						content: e.target.value,
					};
				} else {
					return subtask;
				}
			});

			setState({ ...state, subtasks });
		},
		[state]
	);

	const buttonTitle = useMemo(() => (id ? 'Update task' : 'Create task'), [id]);

	const onClickHandler = async () => {
		const requestType = id ? 'update' : 'create';
		const subtasks = state.subtasks.filter(subtask => subtask.content.length);
		const request = { ...state, statusId, subtasks };

		await onCreateUpdateTask(requestType, request);
	};

	const renderSubtasks = useMemo(() => {
		return state.subtasks.map(subtask => {
			return (
				<div
					key={subtask.id}
					className="w-full flex items-center gap-2.5"
				>
					<Input
						type="text"
						placeholder="Enter list text"
						value={subtask.content}
						onChange={e => changeSubtask(e, subtask.id)}
						withError={false}
						right={
							<>
								<SquareButton
									iconName={'minus'}
									onClick={() => removeSubtask(subtask)}
								/>
								<SquareButton
									onClick={() => addNewSubtask()}
									iconName="plus"
								/>
							</>
						}
					/>
				</div>
			);
		});
	}, [state]);

	return (
		<div
			onClick={() => close()}
			className="fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10"
			>
				<button
					onClick={() => close()}
					className="absolute right-1 top-1 sm:right-5 sm:top-5"
				>
					<Icon
						name={'close'}
						width={20}
						height={20}
					/>
				</button>
				<Input
					label="Task title"
					placeholder="Enter task title"
					value={state.title}
					onChange={e => setState({ ...state, title: e.target.value })}
					type="text"
					className="mb-8"
					withError={false}
				/>
				<Textarea
					label="Task description"
					placeholder="Enter task description"
					value={state.description}
					onChange={e => setState({ ...state, description: e.target.value })}
				/>
				<div className="mb-5">
					<div className="flex justify-between">
						<label
							htmlFor="taskList"
							className="mb-2.5 block font-medium text-black dark:text-white"
						>
							Список задач
						</label>
						{!state.subtasks.length && (
							<SquareButton
								onClick={() => addNewSubtask()}
								iconName="plus"
							/>
						)}
					</div>

					<div className="flex flex-col gap-3.5">{renderSubtasks}</div>
				</div>
				<Button
					className="text-white font-medium py-2.5 px-4.5 rounded-sm"
					title={buttonTitle}
					clickHandler={() => onClickHandler()}
				/>
			</div>
		</div>
	);
};

export default CreateUpdateModal;
