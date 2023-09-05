import { FC, ReactNode } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

interface IDrop extends Omit<DroppableProps, 'children'> {
	children: ReactNode;
	className?: string;
}

const Drop: FC<IDrop> = ({ children, className, ...props }) => {
	return (
		<Droppable {...props}>
			{(provided, snapshot) => (
				<div
					{...provided.innerRef}
					ref={provided.innerRef}
					className={className}
				>
					{children}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Drop;
