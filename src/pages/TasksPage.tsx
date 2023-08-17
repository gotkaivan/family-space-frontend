import React, { useState } from 'react';
import Kanban from '../components/kanban';
import { IKanbanColumn } from '../components/kanban/types';
import mockData from '../components/kanban/mockData';
import { NOTIFY_TYPES, useNotify } from '../hooks/useNotify';
import { getRandomId } from '../helpers';

const TasksPage = () => {
	const { notify } = useNotify();
	const [data, setData] = useState<IKanbanColumn[]>(mockData);

	const addNewCard = async (columnId: number): Promise<boolean> => {
		const result = data.map(col => {
			if (col.id === columnId) {
				col.items.push({
					id: getRandomId(),
					columnId,
					title: 'New task',
					description: 'New description',
				});
			}
			return col;
		});

		notify(NOTIFY_TYPES.SUCCESS, 'Карточка успешно создана');

		setData(result);
		return true;
	};

	const addNewColumn = () => {
		const randomId = Math.floor(Math.random() * 1000);
		const result = [...data];
		result.push({
			id: randomId,
			title: 'New column',
			items: [
				{
					id: randomId,
					columnId: randomId,
					title: 'New task',
					description: 'New description',
				},
			],
		});
		setData(result);
	};
	return (
		<div>
			<Kanban
				data={data}
				setData={setData}
				addNewCard={(id: number) => addNewCard(id)}
				addNewColumn={() => addNewColumn()}
			/>
		</div>
	);
};

export default TasksPage;
