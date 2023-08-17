export interface IKanbanColumn {
	id: number;
	title: string;
	items: IKanbanItem[];
}

export interface IKanbanItem {
	id: number;
	columnId: number;
	title: string;
	description: string;
}
