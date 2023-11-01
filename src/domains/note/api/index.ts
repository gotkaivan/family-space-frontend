import {
	CancelablePromise,
	NoteDto,
	DeleteNoteResponseDto,
	NotesService,
	NoteBoardsService,
	CreateNoteDto,
	CreateNoteResponseDto,
	UpdateNoteResponseDto,
	NoteGroupDto,
	CreateNoteGroupDto,
	CreateNoteGroupResponseDto,
	UpdateNoteGroupResponseDto,
	DeleteNoteGroupResponseDto,
} from 'api';

/**
 * Наборы заметок
 * @returns
 */

export const getNoteGroupsApi = (): CancelablePromise<NoteGroupDto[]> => {
	return NoteBoardsService.noteBoardsControllerGetNoteBoards();
};

export const getNoteGroupByIdApi = (id: number): CancelablePromise<NoteGroupDto> => {
	return NoteBoardsService.noteBoardsControllerGetNoteBoardById(id);
};

export const createNoteGroupApi = (board: CreateNoteGroupDto): CancelablePromise<CreateNoteGroupResponseDto> => {
	return NoteBoardsService.noteBoardsControllerCreateNoteBoard(board);
};

export const updateNoteGroupApi = (board: NoteGroupDto): CancelablePromise<UpdateNoteGroupResponseDto> => {
	return NoteBoardsService.noteBoardsControllerUpdateNoteBoard(board);
};

export const deleteNoteGroupApi = (id: number): CancelablePromise<DeleteNoteGroupResponseDto> => {
	return NoteBoardsService.noteBoardsControllerDeleteNoteBoard(id);
};

/**
 * Заметки
 * @returns
 */

export const getNotesApi = (boardId: number): CancelablePromise<NoteDto[]> => {
	return NotesService.notesControllerGetNotes(boardId);
};

export const getNoteByIdApi = (id: number): CancelablePromise<NoteDto> => {
	return NotesService.notesControllerGetNoteById(id);
};

export const createNoteApi = (board: CreateNoteDto): CancelablePromise<CreateNoteResponseDto> => {
	return NotesService.notesControllerCreateNote(board);
};

export const updateNoteApi = (board: NoteDto): CancelablePromise<UpdateNoteResponseDto> => {
	return NotesService.notesControllerUpdateNote(board);
};

export const deleteNoteApi = (id: number): CancelablePromise<DeleteNoteResponseDto> => {
	return NotesService.notesControllerDeleteNote(id);
};
