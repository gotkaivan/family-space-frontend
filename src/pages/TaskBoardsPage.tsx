import DeleteModal from 'common/components/modals/DeleteModal';
import Button from 'common/components/ui/Button';
import CreateUpdateBoardModal from 'domains/task/components/CreateUpdateBoardModal';
import { BoardDto } from 'generated/api';
import { useState } from 'react';
import BoardItem from 'domains/task/components/BoardItem';
import useTaskBoards from 'domains/task/hooks/useTaskBoards';
import ModalWrapper from 'common/components/modals/ModalWrapper';

interface IActionState {
	id?: number;
	actionType: 'create' | 'update' | 'delete';
	data?: BoardDto;
}

const TaskBoardsPage = () => {
	const { data, createNewBoard, updateBoard, deleteBoard } = useTaskBoards();

	const [actionState, setActionState] = useState<IActionState | null>(null);

	async function updateHandler(board: BoardDto): Promise<BoardDto | null> {
		const updatedBoard = await updateBoard(board);
		setActionState(null);
		return updatedBoard;
	}

	async function createHandler(board: BoardDto): Promise<BoardDto | null> {
		const { id, ...createBoard } = board;
		const createdBoard = await createNewBoard(createBoard);
		setActionState(null);
		return createdBoard;
	}

	async function deleteHandler() {
		if (actionState?.actionType === 'delete' && actionState?.id) {
			const id = await deleteBoard(actionState?.id);
			setActionState(null);
			return id;
		}
	}

	function onCreateUpdateHandler(type: 'create' | 'update', board: BoardDto) {
		switch (type) {
			case 'create':
				createHandler(board);
				return;
			case 'update':
				updateHandler(board);
				return;
		}
	}

	const onEditBoardAction = async (board: BoardDto): Promise<void> => {
		await setActionState({
			id: board.id,
			actionType: 'update',
			data: board,
		});
	};

	const onDeleteBoardAction = async (id: number): Promise<void> => {
		await setActionState({
			actionType: 'delete',
			id,
		});
	};

	return (
		<div>
			<Button
				clickHandler={() => setActionState({ actionType: 'create' })}
				title={'Добавить новую доску'}
				className={`w-50 p-3 text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark mb-6`}
			/>

			<div className="flex flex-wrap">
				{data.map(board => {
					return (
						<BoardItem
							key={board.id}
							item={board}
							className="mr-4 md:mr-6 mb-4 md:mb-6"
							onEdit={onEditBoardAction}
							onDelete={onDeleteBoardAction}
						/>
					);
				})}
			</div>
			<ModalWrapper isOpen={actionState?.actionType === 'create' || actionState?.actionType === 'update'}>
				<CreateUpdateBoardModal
					onCreateUpdateTask={onCreateUpdateHandler}
					id={actionState?.id}
					data={actionState?.data}
					close={() => setActionState(null)}
				/>
			</ModalWrapper>

			<DeleteModal
				title={`Удалить доску`}
				description={`Вы точно хотите удалить доску ?`}
				cancel={() => setActionState(null)}
				confirm={deleteHandler}
				isOpen={actionState?.actionType === 'delete'}
			/>
		</div>
	);
};

export default TaskBoardsPage;
