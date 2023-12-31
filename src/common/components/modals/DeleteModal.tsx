import { FC, useState } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

interface IProps {
	title: string;
	description: string;
	isOpen: boolean;
	confirm: () => Promise<boolean>;
	cancel: () => void;
}

const DeleteModal: FC<IProps> = ({ isOpen, title, description, cancel, confirm }) => {
	const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

	if (!isOpen) return null;

	async function deleteHandler() {
		setIsLoadingBtn(true);

		try {
			if (!isLoadingBtn) await confirm();
		} finally {
			setIsLoadingBtn(false);
		}
	}

	return (
		<div
			onClick={() => cancel()}
			className="fixed top-0 left-0 flex z-999999 h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
		>
			<div
				onClick={e => e.stopPropagation()}
				className="w-full max-w-142.5 rounded-lg bg-white py-10 px-8 text-center dark:bg-boxdark"
			>
				<span
					onClick={() => cancel()}
					className="mx-auto inline-block"
				>
					<Icon
						name={'alert-triangle'}
						size={45}
						color="red"
					/>
				</span>
				<h3 className="mt-3 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">{title}</h3>
				<p className="mb-10">{description}</p>
				<div className="flex justify-between flex-wrap gap-y-4">
					<div className="w-full px-3 2xsm:w-1/2">
						<Button
							title={'Отменить'}
							buttonType="custom"
							clickHandler={cancel}
							className={`block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white hover:bg-opacity-90`}
						/>
					</div>
					<div className="w-full px-3 2xsm:w-1/2">
						<Button
							title={'Удалить'}
							buttonType="custom"
							isLoading={isLoadingBtn}
							clickHandler={deleteHandler}
							className={`block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
