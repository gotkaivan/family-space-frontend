import React, { FC, useCallback, useMemo, useState } from 'react';
import { getRandomId } from '../../../helpers';
import Input from '../../../components/ui/Input';
import PlusMinusButton from '../../../components/ui/PlusMinusButton';
import Icon from '../../../components/ui/Icon';
import Textarea from '../../../components/ui/Textarea';
import Button from '../../../components/ui/Button';

interface IProps {
	clickHandler: () => void;
	close: () => void;
}

interface ITask {
	id: number;
	content: string;
	isCompleted: boolean;
}

interface IFormState {
	title: string;
	description: string;
	tasks: ITask[];
}

const DEFAULT_TASK: ITask = {
	id: getRandomId(),
	content: '',
	isCompleted: false,
};

const DRFAULT_STATE: IFormState = {
	title: '',
	description: '',
	tasks: [DEFAULT_TASK],
};

const CreateModal: FC<IProps> = ({ clickHandler, close }) => {
	const [state, setState] = useState<IFormState>(DRFAULT_STATE);

	const addNewTask = () => {
		const tasks = [...state.tasks];

		const task = { ...DEFAULT_TASK, id: getRandomId() };

		console.log(task);

		tasks.push(task);

		setState({
			...state,
			tasks,
		});

		console.log(state.tasks);
	};

	const firstTask = useMemo(() => {
		return (
			<div className="w-full flex items-center gap-2.5">
				<Input
					type="text"
					placeholder="Enter list text"
					withError={false}
					right={
						<PlusMinusButton
							onClick={() => addNewTask()}
							type={'plus'}
						/>
					}
				/>
			</div>
		);
	}, [state.tasks]);

	const tasks = useMemo(() => {
		if (state.tasks.length < 2) {
			return null;
		} else {
			return state.tasks.map((task, idx) => {
				if (idx > 0)
					return (
						<div className="w-full flex items-center gap-2.5">
							<Input
								key={task.id}
								type="text"
								placeholder="Enter list text"
								withError={false}
								right={
									<>
										<PlusMinusButton
											type={'minus'}
											onClick={function (): void {
												throw new Error('Function not implemented.');
											}}
										/>
										<PlusMinusButton
											onClick={() => addNewTask()}
											type="plus"
										/>
									</>
								}
							/>
						</div>
					);
			});
		}
	}, [state.tasks]);

	return (
		<div
			onClick={() => close()}
			className="fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10"
			>
				<button
					onClick={() => close()}
					className="absolute right-1 top-1 sm:right-5 sm:top-5"
				>
					<Icon
						name={'close'}
						width={20}
						height={20}
					/>
				</button>
				<Input
					label="Task title"
					placeholder="Enter task title"
					type="text"
					className="mb-8"
					withError={false}
				/>
				<Textarea
					label="Task description"
					placeholder="Enter task description"
				/>
				<div className="mb-5">
					<label
						htmlFor="taskList"
						className="mb-2.5 block font-medium text-black dark:text-white"
					>
						Task list
					</label>
					<div className="flex flex-col gap-3.5">
						{firstTask}
						{tasks}
					</div>
				</div>
				<Button
					className="text-white font-medium py-2.5 px-4.5 rounded-sm"
					title={'Add task'}
					clickHandler={() => clickHandler()}
				/>
			</div>
		</div>
	);
};

export default CreateModal;
