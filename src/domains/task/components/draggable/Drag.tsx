import { FC, ReactNode, cloneElement, isValidElement } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';

interface IDrag extends Omit<DraggableProps, 'children'> {
	className?: string;
	children: ReactNode;
	dragAll?: boolean;
}

const Drag: FC<IDrag> = ({ className, children, dragAll, ...props }) => {
	if (!isValidElement(children)) return <div />;
	return (
		<Draggable {...props}>
			{provided => {
				const dragHandleProps = dragAll ? provided.dragHandleProps : {};
				return (
					<div
						className={className}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...dragHandleProps}
					>
						{cloneElement(children, {
							// @ts-ignore
							provided,
						})}
					</div>
				);
			}}
		</Draggable>
	);
};

Drag.defaultProps = {
	dragAll: true,
};

export default Drag;
