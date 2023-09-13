import { BoardDto, CreateBoardDto, DeleteBoardResponseDto } from 'generated/api';
import { useEffect, useState } from 'react';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { createBoardApi, deleteBoardApi, getBoardsApi, updateBoardApi } from '../api';

const useTaskBoards = () => {
	const { notify } = useNotify();

	const [data, setData] = useState<BoardDto[]>([]);

	async function getData() {
		try {
			const boards = await getBoardsApi();
			setData(boards);
			return;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось получить доски');
		}
	}

	async function createNewBoard(board: CreateBoardDto): Promise<BoardDto | null> {
		try {
			const createdBoard = await createBoardApi(board);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Доска успешно создана');

			return createdBoard;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось создать доску');
			return null;
		}
	}

	async function updateBoard(board: BoardDto): Promise<BoardDto | null> {
		try {
			const updatedBoard = await updateBoardApi(board);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Доска успешно обновлена');
			return updatedBoard;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось обновить доску');
			return null;
		}
	}

	async function deleteBoard(boardId: number): Promise<DeleteBoardResponseDto | null> {
		try {
			const response = await deleteBoardApi(boardId);

			await getData();

			notify(NOTIFY_TYPES.SUCCESS, 'Доска удачно удалена');

			return response;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось удалить доску');
			return null;
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return {
		data,
		createNewBoard,
		updateBoard,
		deleteBoard,
	};
};

export default useTaskBoards;
