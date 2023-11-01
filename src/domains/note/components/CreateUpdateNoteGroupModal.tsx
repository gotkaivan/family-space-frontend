import { FC, useEffect, useMemo, useState } from 'react';
import Input from 'common/components/ui/Input';
import Textarea from 'common/components/ui/Textarea';
import Button from 'common/components/ui/Button';
import { BoardDto, NoteGroupDto } from 'generated/api';
import FormModal from 'common/components/modals/FormModal';
import NoteGroup from '../entities/NoteGroup';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IProps {
	id?: number | undefined;
	onCreateUpdateNoteGroup: (type: 'create' | 'update', group: NoteGroupDto) => Promise<void>;
	close: () => void;
	data?: NoteGroupDto | null;
}

const CreateUpdateNoteGroupModal: FC<IProps> = ({ onCreateUpdateNoteGroup, close, data, id }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NoteGroupDto>({
		defaultValues: {
			...data,
		},
	});

	const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

	const buttonTitle = useMemo(() => (id ? 'Обновить группу' : 'Создать группу'), [id]);

	const onClickHandler: SubmitHandler<NoteGroup> = async (form: NoteGroup) => {
		setIsLoadingBtn(true);
		try {
			const requestType = id ? 'update' : 'create';
			await onCreateUpdateNoteGroup(requestType, new NoteGroup({ ...form }));
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
						label="Название группы для заметок"
						register={register('title', {
							required: 'Поле должно быть заполнено',
						})}
						placeholder="Введите название группы для заметок"
						type="text"
						className="mb-8"
						hasError={!!errors.title?.message}
						errorMessage={errors.title?.message}
						withError={!!errors.title?.message}
					/>
					<Textarea
						id="description"
						register={register('description')}
						label="Описание группы для заметок"
						placeholder="Введите описание группы для заметок"
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

export default CreateUpdateNoteGroupModal;
