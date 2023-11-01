import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { useEffect, useMemo, useState } from 'react';
import { NoteGroupDto } from 'generated/api';
import { IActionNoteGroupResponseParams } from '../types';
import { createNoteGroupApi, deleteNoteGroupApi, getNoteGroupsApi, updateNoteGroupApi } from '../api';

const useNoteGroupsPage = () => {
	const { notify } = useNotify();

	const [actionData, setActionData] = useState<IActionNoteGroupResponseParams | null>(null);

	const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

	const [noteGroups, setNoteGroups] = useState<NoteGroupDto[]>([]);

	const isLoading = useMemo(() => {
		if (!isPageLoaded && isLoadingData) return true;
		return false;
	}, [isLoadingData, isPageLoaded]);

	async function getNoteGroups() {
		setIsLoadingData(true);

		try {
			const items = await getNoteGroupsApi();
			setNoteGroups(items);
			setIsPageLoaded(true);
			return items;
		} catch (e) {
			notify(NOTIFY_TYPES.ERROR, 'Не удалось получить группы для заметок');
		} finally {
			setIsLoadingData(false);
		}
	}

	async function createNoteGroup(group: NoteGroupDto) {
		try {
			const { id, ...request } = group;
			return await createNoteGroupApi(request);
		} catch (e) {
			throw 'Не удалось создать новую группу для заметок';
		}
	}

	const updateNoteGroup = async (transaction: NoteGroupDto) => {
		try {
			return await updateNoteGroupApi(transaction);
		} catch (e) {
			throw 'Не удалось обновить группу для заметок';
		}
	};

	const deleteNoteGroup = async (id: number) => {
		try {
			return await deleteNoteGroupApi(id);
		} catch (e) {
			throw 'Не удалось удалить транзакцию';
		}
	};

	async function onCreateUpdateNoteGroup(type: 'create' | 'update', group: NoteGroupDto): Promise<void> {
		try {
			if (type === 'create') {
				await createNoteGroup(group);
				getNoteGroups();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Группа успешно создана');
			}

			if (type === 'update') {
				await updateNoteGroup(group);
				await getNoteGroups();
				setActionData(null);
				notify(NOTIFY_TYPES.SUCCESS, 'Группа успешно обновлена');
			}
		} catch (message: any) {
			notify(NOTIFY_TYPES.ERROR, message);
			setActionData(null);
		}
	}

	async function onDeleteNoteGroup(): Promise<boolean> {
		if (actionData?.id) {
			try {
				await deleteNoteGroup(actionData.id);

				const response = await getNoteGroups();
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
		getNoteGroups();
	}, []);

	return {
		noteGroups,
		actionData,
		isLoading,
		setActionData,
		onCreateUpdateNoteGroup,
		onDeleteNoteGroup,
	};
};

export default useNoteGroupsPage;
