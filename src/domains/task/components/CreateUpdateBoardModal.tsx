import { FC, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Textarea from 'common/components/ui/Textarea';
import Button from 'common/components/ui/Button';
import { BoardDto } from 'generated/api';
import FormModal from 'common/components/modals/FormModal';
import Board from '../entities/Board';

interface IProps {
	id?: number | undefined;
	onCreateUpdateTask: (type: 'create' | 'update', board: BoardDto) => Promise<boolean>;
	close: () => void;
	data?: BoardDto | null;
}

const CreateUpdateBoardModal: FC<IProps> = ({ onCreateUpdateTask, close, data, id }) => {
	const [state, setState] = useState<BoardDto>(data || new Board());

	const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

	const buttonTitle = useMemo(() => (id ? 'Обновить доску' : 'Создать доску'), [id]);

	const onClickHandler = async () => {
		setIsLoadingBtn(true);

		try {
			const requestType = id ? 'update' : 'create';

			await onCreateUpdateTask(requestType, { ...state });
		} finally {
			setIsLoadingBtn(false);
		}
	};

	useEffect(() => {
		setState(data || new Board());
	}, [data]);

	return (
		<FormModal
			close={close}
			content={
				<>
					<Input
						label="Название доски"
						placeholder="Введите название доски"
						value={state.title}
						onChange={e => setState({ ...state, title: e.target.value })}
						type="text"
						className="mb-8"
						withError={false}
					/>
					<Textarea
						label="Описание доски"
						placeholder="Введите описание доски"
						value={state.description}
						onChange={e => setState({ ...state, description: e.target.value })}
					/>
				</>
			}
			button={
				<Button
					className="text-white font-medium py-2.5 px-4.5 rounded-md"
					title={buttonTitle}
					isLoading={isLoadingBtn}
					clickHandler={onClickHandler}
				/>
			}
		/>
	);
};

export default CreateUpdateBoardModal;
