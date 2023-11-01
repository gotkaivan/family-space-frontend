import DeleteModal from 'common/components/modals/DeleteModal';
import { useEffect, useMemo } from 'react';
import PageLoader from 'common/components/ui/Loader/PageLoader';
import { useAppDispatch } from 'store';
import { changeBreadcrumbs } from 'store/features/common';
import useNotePage from 'domains/note/hooks/useNotesPage';
import NoteCard from 'domains/note/components/NoteCard';

const NotesPage = () => {
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

	const { notes, isLoading, actionData, setActionData, onCreateUpdateNote, onDeleteNote } = useNotePage();

	console.log(notes);

	const content = useMemo(() => {
		return (
			<div className="flex flex-wrap">
				{notes.map(note => {
					return (
						<NoteCard
							key={note.id}
							title={note.title}
							description={note.description}
							content={note.content}
							isFavorite={false}
							className="mr-4 md:mr-6 mb-4 md:mb-6"
						/>
					);
				})}
			</div>
		);
	}, [notes]);

	return (
		<div>
			{isLoading ? <PageLoader /> : content}

			<DeleteModal
				title={`Удалить Заметку`}
				description={`Вы точно хотите удалить заметку ?`}
				cancel={() => setActionData(null)}
				confirm={onDeleteNote}
				isOpen={actionData?.actionType === 'delete'}
			/>
		</div>
	);
};

export default NotesPage;
