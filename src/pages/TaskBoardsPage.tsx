import DeleteModal from 'common/components/modals/DeleteModal';
import Button from 'common/components/ui/Button';
import CreateUpdateBoardModal from 'domains/task/components/CreateUpdateBoardModal';
import { BoardDto } from 'generated/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BoardItem from 'domains/task/components/BoardItem';
import useTaskBoards from 'domains/task/hooks/useTaskBoards';
import ModalWrapper from 'common/components/modals/ModalWrapper';
import PageLoader from 'common/components/ui/Loader/PageLoader';
import { useAppDispatch } from 'store';
import { changeBreadcrumbs } from 'store/features/common';

interface IActionState {
	id?: number;
	actionType: 'create' | 'update' | 'delete';
	data?: BoardDto;
}

const TaskBoardsPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			changeBreadcrumbs([
				{
					title: 'Доски c задачами',
					url: '',
				},
			])
		);

		return function clean() {
			dispatch(changeBreadcrumbs([]));
		};
	});

	const { data, isLoading, createNewBoard, updateBoard, deleteBoard } = useTaskBoards();

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

	async function deleteHandler(): Promise<boolean> {
		if (actionState?.actionType === 'delete' && actionState?.id) {
			const id = await deleteBoard(actionState?.id);
			setActionState(null);
			return true;
		}
		return false;
	}

	async function onCreateUpdateHandler(type: 'create' | 'update', board: BoardDto): Promise<boolean> {
		switch (type) {
			case 'create':
				await createHandler(board);
				return true;
			case 'update':
				await updateHandler(board);
				return true;
		}
		return false;
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

	const content = useMemo(() => {
		return (
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
		);
	}, [data]);

	return (
		<div>
			<Button
				clickHandler={() => setActionState({ actionType: 'create' })}
				title={'Добавить доску'}
				className={`p-2 text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark mb-6`}
			/>

			{isLoading ? <PageLoader /> : content}
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
