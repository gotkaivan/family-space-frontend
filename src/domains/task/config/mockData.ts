import { ITaskColumn } from '../types';

const kanbanMock: ITaskColumn[] = [
	{
		title: 'Todo',
		id: 1,
		items: [
			{
				id: 1,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
				subtasks: [],
			},
			{
				id: 2,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
				subtasks: [],
			},
			{
				id: 3,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 1,
				subtasks: [],
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
				subtasks: [],
			},
			{
				id: 5,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 2,
				subtasks: [],
			},
			{
				id: 6,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 2,
				subtasks: [],
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
				subtasks: [],
			},
			{
				id: 8,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 7,
				subtasks: [],
			},
			{
				id: 9,
				title: 'Task title',
				description: 'Dedicated form for a category of users that will perform.',
				columnId: 7,
				subtasks: [],
			},
		],
	},
];

export default kanbanMock;
