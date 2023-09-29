import {
	CancelablePromise,
	NoteDto,
	DeleteNoteResponseDto,
	NotesService,
	NoteBoardsService,
	NoteBoardDto,
	DeleteNoteBoardResponseDto,
	CreateNoteBoardDto,
	CreateNoteBoardResponseDto,
	UpdateNoteBoardResponseDto,
	CreateNoteDto,
	CreateNoteResponseDto,
	UpdateNoteResponseDto,
} from 'api';

/**
 * Наборы заметок
 * @returns
 */

export const getNoteBoardsApi = (): CancelablePromise<NoteBoardDto[]> => {
	return NoteBoardsService.noteBoardsControllerGetNoteBoards();
};

export const getNoteBoardByIdApi = (id: number): CancelablePromise<NoteBoardDto> => {
	return NoteBoardsService.noteBoardsControllerGetNoteBoardById(id);
};

export const createNoteBoardApi = (board: CreateNoteBoardDto): CancelablePromise<CreateNoteBoardResponseDto> => {
	return NoteBoardsService.noteBoardsControllerCreateNoteBoard(board);
};

export const updateNoteBoardApi = (board: NoteBoardDto): CancelablePromise<UpdateNoteBoardResponseDto> => {
	return NoteBoardsService.noteBoardsControllerUpdateNoteBoard(board);
};

export const deleteNoteBoardApi = (id: number): CancelablePromise<DeleteNoteBoardResponseDto> => {
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
