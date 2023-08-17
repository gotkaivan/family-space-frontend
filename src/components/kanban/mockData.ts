import { IKanbanColumn } from './types';

const kanbanMock: IKanbanColumn[] = [
	{
		title: 'Todo',
		id: 1,
		items: [
			{
				id: 1,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
			},
			{
				id: 2,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
			},
			{
				id: 3,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
			},
		],
	},
	{
		title: 'In progress',
		id: 2,
		items: [
			{
				id: 4,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 2,
			},
			{
				id: 5,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 2,
			},
			{
				id: 6,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 2,
			},
		],
	},
	{
		title: 'Done',
		id: 7,
		items: [
			{
				id: 7,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 7,
			},
			{
				id: 8,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 7,
			},
			{
				id: 9,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 7,
			},
		],
	},
];

export default kanbanMock;
