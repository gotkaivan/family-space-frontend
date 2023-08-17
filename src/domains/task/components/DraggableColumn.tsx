import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from './Draggabletem';
import { ITask, ITaskColumn } from '../types';
import SettingsMenu from '../../../components/settings-menu/SettingsMenu';
import Button from '../../../components/ui/Button';

interface IProps {
	column: ITaskColumn;
	addNewHandler: (id: number) => void;
}

const DraggableElement = ({ column, addNewHandler }: IProps) => {
	return (
		<div className="mr-8 relative">
			<SettingsMenu className="right-3 pt-1" />
			<div className="text-xl font-semibold text-black dark:text-white mb-6 w-300">{`${column.title} (${column.items.length})`} </div>

			<Droppable droppableId={`${column.id.toString()}`}>
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{column.items.map((item: ITask, index: number) => (
							<DraggableItem
								key={item.id}
								item={item}
								index={index}
							/>
						))}
						{provided.placeholder}
						<Button
							clickHandler={() => addNewHandler(column.id)}
							title={'Add new'}
							className={`w-36 p-3 text-sm  dark:bg-boxdark dark:border-boxdark dark:text-white mr-4 bg-white border-white text-boxdark`}
						/>
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default DraggableElement;
