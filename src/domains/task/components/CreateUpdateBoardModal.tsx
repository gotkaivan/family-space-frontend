import { FC, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Textarea from 'common/components/ui/Textarea';
import Button from 'common/components/ui/Button';
import { BoardDto } from 'generated/api';
import FormModal from 'common/components/modals/FormModal';
import Board from '../entities/Board';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IProps {
	id?: number | undefined;
	onCreateUpdateBoard: (type: 'create' | 'update', board: BoardDto) => Promise<boolean>;
	close: () => void;
	data?: BoardDto | null;
}

const CreateUpdateBoardModal: FC<IProps> = ({ onCreateUpdateBoard, close, data, id }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BoardDto>({
		defaultValues: {
			...data,
		},
	});

	const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

	const buttonTitle = useMemo(() => (id ? 'Обновить доску' : 'Создать доску'), [id]);

	const onClickHandler: SubmitHandler<BoardDto> = async (form: BoardDto) => {
		setIsLoadingBtn(true);
		try {
			const requestType = id ? 'update' : 'create';
			await onCreateUpdateBoard(requestType, new Board({ ...form }));
		} finally {
			setIsLoadingBtn(false);
		}
	};

	useEffect(() => {
		reset();
	}, [data]);

	return (
		<FormModal
			close={close}
			content={
				<form onSubmit={handleSubmit(onClickHandler)}>
					<Input
						id="title"
						label="Название доски"
						register={register('title', {
							required: 'Поле должно быть заполнено',
						})}
						placeholder="Введите название доски"
						type="text"
						className="mb-8"
						hasError={!!errors.title?.message}
						errorMessage={errors.title?.message}
						withError={!!errors.title?.message}
					/>
					<Textarea
						id="description"
						register={register('description')}
						label="Описание доски"
						placeholder="Введите описание доски"
					/>
					<Button
						type="submit"
						className="text-white font-medium py-2.5 px-4.5 rounded-md"
						title={buttonTitle}
						isLoading={isLoadingBtn}
					/>
				</form>
			}
		/>
	);
};

export default CreateUpdateBoardModal;
