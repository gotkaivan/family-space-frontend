import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import SquareButton from 'common/components/ui/SquareButton';
import Textarea from 'common/components/ui/Textarea';
import Button from 'common/components/ui/Button';
import Task from '../entities/Task';
import SubTask from '../entities/SubTask';
import { BoardDto, DeleteTaskResponseDto, SubtaskDto, TaskDto } from 'generated/api';
import FormModal from 'common/components/modals/FormModal';
import Select from 'common/components/ui/Select';
import { getBoardsApi } from '../api';
import { useParams } from 'react-router-dom';

interface IProps {
	id?: number | undefined;
	statusId?: number | undefined;
	onCreateUpdateTask: (type: 'create' | 'update', task: TaskDto) => void;
	deleteSubtask: (subtaskId: number) => Promise<DeleteTaskResponseDto | null>;
	close: () => void;
	data?: TaskDto | null;
}

type WithNewParameter = {
	isNewSubtask?: boolean;
};

type LocalSubtask = SubtaskDto & WithNewParameter;

const CreateUpdateTaskModal: FC<IProps> = ({ onCreateUpdateTask, deleteSubtask, close, data, id, statusId }) => {
	const { boardId } = useParams();
	const [state, setState] = useState<TaskDto>(data || new Task());

	const [boards, setBoards] = useState<BoardDto[]>([]);

	const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

	const boardsOptions = useMemo(() => {
		const options = boards
			.filter(board => {
				return boardId ? board.id !== +boardId : true;
			})
			.map(board => {
				return {
					id: board.id,
					value: board.id,
					title: board.title,
				};
			});

		return [
			{
				id: 0,
				value: '',
				title: 'Не выбрано',
			},
			...options,
		];
	}, [boards]);

	async function getBoards() {
		try {
			const boards = await getBoardsApi();
			if (boards) setBoards(boards);
		} catch (e) {
			console.log(e);
		}
	}

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
						title: e.target.value,
					};
				} else {
					return subtask;
				}
			});

			setState({ ...state, subtasks });
		},
		[state]
	);

	const buttonTitle = useMemo(() => (id ? 'Обновить задачу' : 'Создать задачу'), [id]);

	const onClickHandler = async () => {
		try {
			if (!statusId) return;
			setIsLoadingBtn(true);

			const requestType = id ? 'update' : 'create';
			const subtasks = state.subtasks
				.filter(subtask => subtask.title.length)
				.map((subtask: LocalSubtask) => {
					if (subtask.isNewSubtask) subtask.id = 0;
					return subtask;
				});
			const request = { ...state, statusId, subtasks, linkBoardId: !!state.linkBoardId ? state.linkBoardId : null };

			await onCreateUpdateTask(requestType, request);
		} finally {
			setIsLoadingBtn(false);
		}
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
						placeholder="Введите название подзадачи"
						value={subtask.title}
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

	useEffect(() => {
		getBoards();
	}, []);

	useEffect(() => {
		setState(data || new Task());
	}, [data]);

	return (
		<FormModal
			close={close}
			content={
				<>
					<Input
						label="Название задачи"
						placeholder="Введите название задачи"
						value={state.title}
						onChange={e => setState({ ...state, title: e.target.value })}
						type="text"
						className="mb-8"
						withError={false}
					/>
					<Textarea
						label="Описание задачи"
						placeholder="Введите описание задачи"
						value={state.description}
						onChange={e => setState({ ...state, description: e.target.value })}
					/>
					<Select
						label="Ссылка на доску"
						value={state.linkBoardId || ''}
						onChange={e => setState({ ...state, linkBoardId: (e.target as any).value })}
						className="mb-8"
						withError={false}
						options={boardsOptions}
					/>
					<div className="mb-5">
						<div className="flex justify-between">
							<label
								htmlFor="taskList"
								className="mb-2.5 block font-medium text-black dark:text-white"
							>
								Список подзадач
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
				</>
			}
			button={
				<Button
					className="text-white font-medium py-2.5 px-4.5 rounded-md"
					title={buttonTitle}
					isLoading={isLoadingBtn}
					clickHandler={() => onClickHandler()}
				/>
			}
		/>
	);
};

export default CreateUpdateTaskModal;
