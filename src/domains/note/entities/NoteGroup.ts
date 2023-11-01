import { getRandomId } from 'common/helpers';
import { NoteGroupDto } from 'generated/api';

class NoteGroup implements NoteGroupDto {
	constructor(group?: NoteGroupDto) {
		this.id = group?.id || getRandomId();
		this.title = group?.title || '';
		this.description = group?.description || '';
		this.isFavorite = group?.isFavorite || false;
	}

	id: number;

	title: string;

	description: string;

	isFavorite: boolean;
}

export default NoteGroup;
