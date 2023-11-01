import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { useEffect, useMemo, useState } from 'react';
import { NoteDto } from 'generated/api';
import { IActionNotesResponseParams } from '../types';
import notesConfigItems from './config';
import { createNoteApi, deleteNoteApi, updateNoteApi } from '../api';

const useNotePage = () => {
	const { notify } = useNotify();

	const boardId = 1;

	const [actionData, setActionData] = useState<IActionNotesResponseParams | null>(null);

	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

	const [notes, setNotes] = useState<NoteDto[]>([]);

	const isLoading = useMemo(() => {
		if (!isPageLoaded && isLoadingData) return true;
		return false;
	}, [isLoadingData, isPageLoaded]);

	async function getNotes() {
		setIsLoadingData(true);

		try {
			// const items = await getNotesApi(boardId);
			const items = notesConfigItems;
			setNotes(items);
			setIsPageLoaded(true);
			return items;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось получить заметки');
		} finally {
			setIsLoadingData(false);
		}
	}

	async function createNote(note: NoteDto) {
		try {
			const { id, ...request } = note;
			return await createNoteApi(request);
		} catch (e) {
			throw 'Не удалось создать новую заметку';
		}
	}

	const updateNote = async (note: NoteDto) => {
		try {
			return await updateNoteApi(note);
		} catch (e) {
			throw 'Не удалось обновить заметку';
		}
	};

	const deleteNote = async (id: number) => {
		try {
			return await deleteNoteApi(id);
		} catch (e) {
			throw 'Не удалось удалить транзакцию';
		}
	};

	async function onCreateUpdateNote(type: 'create' | 'update', note: NoteDto): Promise<void> {
		try {
			if (type === 'create') {
				await createNote(note);
				getNotes();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Заметка успешно создана');
			}

			if (type === 'update') {
				await updateNote(note);
				await getNotes();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Заметка успешно обновлена');
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
			setActionData(null);
		}
	}

	async function onDeleteNote(): Promise<boolean> {
		if (actionData?.id) {
			try {
				await deleteNote(actionData.id);

				const response = await getNotes();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Группа успешно удалена');
				return true;
			} catch (message: any) {
				notify(NOTIFY_TYPES.ERROR, message);
				setActionData(null);
				return false;
			}
		}
		return false;
	}

	useEffect(() => {
		getNotes();
	}, []);

	return {
		notes,
		isLoading,
		actionData,
		setActionData,
		onDeleteNote,
		onCreateUpdateNote,
	};
};

export default useNotePage;
