import React, { FC, useEffect } from 'react';
import { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableColumn from './DraggableColumn';
import Button from '../ui/Button';
import { IKanbanColumn, IKanbanItem } from './types';
import CreateModal from './CreateModal';

interface IProps {
	data: IKanbanColumn[];
	setData: any;
	addNewCard: (id: number) => Promise<boolean>;
	addNewColumn: () => void;
}

const DragList: FC<IProps> = ({ data, setData, addNewCard, addNewColumn }) => {
	const formatData = useCallback((data: IKanbanColumn[]) => data.reduce((acc, col) => ({ ...acc, [col.id]: col.items }), {}), []);

	const [elements, setElements] = useState(formatData(data));

	const [createModalColumnId, setCreateModalColumnId] = useState<number | null>(null);

	const removeFromList = (list: IKanbanItem[], index: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(index, 1);
		return [removed, result];
	};

	const addToList = useCallback((list: IKanbanItem[], index: number, element) => {
		const result = Array.from(list);
		result.splice(index, 0, element);
		return result;
	}, []);

	const onDragEnd = useCallback(
		result => {
			if (!result.destination) {
				return;
			}

			const listCopy: typeof elements = { ...elements };
			const sourceList = listCopy?.[result.source.droppableId];

			const [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);

			listCopy[result.source.droppableId] = newSourceList;
			const destinationList = listCopy[result.destination.droppableId];
			listCopy[result.destination.droppableId] = addToList(destinationList, result.destination.index, removedElement);
			const localData = [...data];
			localData.map(col => {
				Object.keys(listCopy).forEach(c => {
					if (col.id.toString() === c) {
						col.items = listCopy[c];
					}
				});
				return col;
			});

			setData(localData);
		},
		[elements, addToList]
	);

	const onSaveCard = async () => {
		if (createModalColumnId) {
			await addNewCard(createModalColumnId);
			setCreateModalColumnId(null);
		}
	};

	useEffect(() => {
		setElements(formatData(data));
	}, [data]);

	return (
		<div className="overflow-x-scroll h-screen">
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="flex justify-start">
					{data.map(column => (
						<DraggableColumn
							column={column}
							key={column.id}
							addNewHandler={(id: number) => setCreateModalColumnId(id)}
						/>
					))}
					<div>
						<Button
							clickHandler={addNewColumn}
							title={'Add new column'}
							className={`p-3 w-full text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark`}
						/>
					</div>
				</div>
			</DragDropContext>
			{createModalColumnId && (
				<CreateModal
					clickHandler={() => onSaveCard()}
					close={() => setCreateModalColumnId(null)}
				/>
			)}
		</div>
	);
};

export default DragList;
