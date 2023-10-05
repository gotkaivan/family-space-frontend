import { Dispatch, FC, useMemo } from 'react';
import Icon from '../ui/Icon';

interface IProps {
	pageCount: number;
	page: number;
	setPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<IProps> = ({ pageCount, page, setPage }) => {
	const pages = useMemo(() => {
		const pagesArray = [];
		for (let i = 0; i < pageCount; i++) pagesArray.push(i + 1);

		return pagesArray.map(p => (
			<li
				onClick={() => setPage(p)}
				key={p}
				className={`flex items-center justify-center rounded py-1.5 px-3 font-medium  ${p === page ? 'bg-primary text-white' : 'cursor-pointer'}`}
			>
				{p}
			</li>
		));
	}, [pageCount, page]);

	function onClickChevron(type: 'right' | 'left') {
		if (type === 'left' && page !== 1) setPage(page - 1);
		if (type === 'right' && page !== pageCount) setPage(page + 1);
	}
	return (
		<div className="pt-3 text-sm">
			<nav>
				<ul className="flex flex-wrap items-center">
					<li
						onClick={() => onClickChevron('left')}
						className="flex h-8 w-8 items-center justify-center rounded  cursor-pointer"
					>
						<Icon
							name={'chevron-left'}
							size={18}
						/>
					</li>
					{pages}

					<li
						onClick={() => onClickChevron('right')}
						className="flex h-8 w-8 items-center justify-center rounded  cursor-pointer"
					>
						<Icon
							name={'chevron-right'}
							size={18}
						/>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
