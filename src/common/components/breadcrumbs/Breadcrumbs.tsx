import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

const Breadcrumbs = () => {
	const { breadcrumbs } = useAppSelector(state => state.common);

	return (
		<div className="flex items-center gap-2 text-sm">
			{breadcrumbs.map((breadrumb, index, arr) => {
				return (
					<div key={index}>
						{index === arr.length - 1 ? (
							<span className="text-black dark:text-white">{breadrumb.title}</span>
						) : (
							<Link
								className="text-body dark:text-white"
								to={breadrumb.url}
							>
								{breadrumb.title}
							</Link>
						)}
						{index !== arr.length - 1 && <span className="pl-2 dark:text-white">/</span>}
					</div>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
