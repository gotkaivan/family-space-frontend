import { getRandomId } from 'common/helpers';
import { TaskDto, BoardDto } from 'generated/api';

class Board implements BoardDto {
	constructor(group?: TaskDto) {
		this.id = group?.id || getRandomId();
		this.title = group?.title || '';
		this.description = group?.description || '';
		this.position = group?.position || 1;
	}
	position: number;

	id: number;

	title: string;

	description: string;
}

export default Board;
