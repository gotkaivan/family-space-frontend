import DeleteModal from 'common/components/modals/DeleteModal';
import Button from 'common/components/ui/Button';
import { NoteGroupDto } from 'generated/api';
import { useEffect, useMemo } from 'react';
import PageLoader from 'common/components/ui/Loader/PageLoader';
import { useAppDispatch } from 'store';
import { changeBreadcrumbs } from 'store/features/common';
import useNoteGroupsPage from 'domains/note/hooks/useNoteGroupsPage';
import ModalWrapper from 'common/components/modals/ModalWrapper';
import CreateUpdateNoteGroupModal from 'domains/note/components/CreateUpdateNoteGroupModal';
import Card from 'common/components/cards/Card';

interface IActionState {
	id?: number;
	actionType: 'create' | 'update' | 'delete';
	data?: NoteGroupDto;
}

const NotesGroupPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			changeBreadcrumbs([
				{
					title: 'Наборы с заметками',
					url: '',
				},
			])
		);

		return function clean() {
			dispatch(changeBreadcrumbs([]));
		};
	});

	const { noteGroups, isLoading, actionData, onCreateUpdateNoteGroup, onDeleteNoteGroup, setActionData } = useNoteGroupsPage();

	const onEditGroupAction = async (group: NoteGroupDto): Promise<void> => {
		await setActionData({
			id: group.id,
			actionType: 'update',
			data: group,
		});
	};

	const onDeleteGroupAction = async (id: number): Promise<void> => {
		await setActionData({
			actionType: 'delete',
			id,
		});
	};

	const content = useMemo(() => {
		return (
			<div className="flex flex-wrap">
				{noteGroups.map(group => {
					return (
						<Card
							key={group.id}
							title={group.title}
							description={group.description}
							to={`/notes/${group.id}`}
							className="mr-4 md:mr-6 mb-4 md:mb-6"
							onEdit={() => onEditGroupAction(group)}
							onDelete={() => onDeleteGroupAction(group.id)}
						/>
					);
				})}
			</div>
		);
	}, [noteGroups]);

	return (
		<div>
			<Button
				clickHandler={() => setActionData({ actionType: 'create' })}
				title={'Добавить группу'}
				className={`p-2 text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark mb-6`}
			/>

			{isLoading ? <PageLoader /> : content}
			<ModalWrapper isOpen={actionData?.actionType === 'create' || actionData?.actionType === 'update'}>
				<CreateUpdateNoteGroupModal
					onCreateUpdateNoteGroup={onCreateUpdateNoteGroup}
					id={actionData?.id}
					data={actionData?.data}
					close={() => setActionData(null)}
				/>
			</ModalWrapper>

			<DeleteModal
				title={`Удалить группу`}
				description={`Вы точно хотите удалить группу ?`}
				cancel={() => setActionData(null)}
				confirm={onDeleteNoteGroup}
				isOpen={actionData?.actionType === 'delete'}
			/>
		</div>
	);
};

export default NotesGroupPage;
