import React from 'react';
import Button from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

const IncomeTabs = () => {
	const { pathname } = useLocation();

	return (
		<div className="flex w-full  mb-4 md:mb-6">
			<Link
				to={'/income/operations'}
				className="mr-4"
			>
				<Button
					title={'Все операции'}
					className={`w-36 p-2 text-sm  text-boxdark dark:bg-boxdark dark:border-boxdark dark:text-white
               ${pathname?.includes('operations') ? 'dark:bg-meta-4 bg-slate-200 border-slate-200' : 'bg-white border-white'}`}
				/>
			</Link>
			<Link to={'/income/types'}>
				<Button
					title={'Типы операций'}
					className={`w-36 p-2 text-sm  text-boxdark dark:bg-boxdark dark:border-boxdark dark:text-white
               ${pathname?.includes('types') ? 'dark:bg-meta-4 bg-slate-200 border-slate-200' : 'bg-white border-white'}`}
				/>
			</Link>
		</div>
	);
};
export default IncomeTabs;
