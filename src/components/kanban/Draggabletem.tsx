import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IKanbanItem } from './types';
import Icon from '../ui/Icon';
import SettingsMenu from '../settings-menu/SettingsMenu';

interface IProps {
	item: IKanbanItem;
	index: number;
}

const DraggableItem = ({ item, index }: IProps) => {
	return (
		<Draggable
			draggableId={item.id.toString()}
			index={index}
		>
			{(provided, snapshot) => {
				return (
					<div
						className="relative cursor-move border flex justify-between p-7 pt-10 pr-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4 rounded-lg w-300"
						ref={provided.innerRef}
						snapshot={snapshot}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<SettingsMenu className="right-3 top-3" />
						<div>
							<div className="mb-4 text-lg font-medium text-black dark:text-white">{item.title}d</div>
							<div className="">{item.description}</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};

export default DraggableItem;
