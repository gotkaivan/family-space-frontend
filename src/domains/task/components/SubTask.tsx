import { FC, useEffect, useState } from 'react';
import Subtask from '../entities/SubTask';
import { SubtaskDto } from 'generated/api';
import Icon from 'common/components/ui/Icon';

interface IProps {
	subtask: SubtaskDto;
	updateSubtask: (subtask: SubtaskDto) => Promise<void>;
}

const SubTask: FC<IProps> = ({ subtask, updateSubtask }) => {
	const [item, setItem] = useState<SubtaskDto>(new Subtask());

	const [isCompleted, setIsCompleted] = useState<boolean>(subtask.isCompleted);

	const onChangeState = () => {
		updateSubtask({ ...item, isCompleted: !isCompleted });
		setIsCompleted(!isCompleted);
	};

	useEffect(() => {
		setItem(subtask);
	}, [subtask]);

	return (
		<label
			htmlFor={`subtask${subtask.id}`}
			className="cursor-pointer"
		>
			<div className="relative flex items-center pt-0.5">
				<input
					onChange={onChangeState}
					type="checkbox"
					id={`subtask${subtask.id}`}
					className="taskCheckbox sr-only"
					checked={isCompleted}
				/>
				<div className="box mr-3 flex h-4.5 w-4.5 min-w-4.5 min-h-4.5 items-center justify-center rounded border border-bodydark dark:border-strokedark dark:bg-boxdark-2">
					<span className="text-white opacity-0">
						<Icon
							name={'check'}
							size={10}
						/>
					</span>
				</div>

				<p className="text-sm w-200">{subtask.title}</p>
			</div>
		</label>
	);
};

export default SubTask;
