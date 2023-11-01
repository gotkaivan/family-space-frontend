import { getRandomId } from 'common/helpers';
import { NoteDto } from 'generated/api';

class Note implements NoteDto {
	constructor(note?: NoteDto) {
		this.id = note?.id || getRandomId();
		this.title = note?.title || '';
		this.description = note?.description || '';
		this.content = note?.content || '';
		this.boardId = note?.boardId || getRandomId();
		this.isFavorite = note?.isFavorite || false;
	}

	id: number;

	title: string;

	description: string;

	content: string;

	boardId: number;

	isFavorite: boolean;
}

export default Note;
