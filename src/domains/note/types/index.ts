import { ActionType } from 'common/types';
import { NoteDto, NoteGroupDto } from 'generated/api';

export interface IActionNoteGroupResponseParams {
	actionType: ActionType;
	id?: number;
	data?: NoteGroupDto;
}

export interface IActionNotesResponseParams {
	actionType: ActionType | 'view';
	id?: number;
	data?: NoteDto;
}
