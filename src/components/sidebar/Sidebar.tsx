'use client';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import menu from './menu';
import { Link } from 'react-router-dom';

interface SidebarProps {
	isSidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setSidebarOpen }: SidebarProps) => {
	const { pathname } = useLocation();
	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!isSidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!isSidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	const getMenuItems = () => {
		return menu.map(item => {
			return (
				<li>
					<Link
						to={`/${item.url}`}
						className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
							pathname?.includes(item.url) && 'bg-graydark dark:bg-meta-4'
						}`}
					>
						<Icon
							name={item.icon.name}
							width={item.icon.width}
							height={item.icon.height}
						/>
						{item.name}
					</Link>
				</li>
			);
		});
	};

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				isSidebarOpen ? 'translate-x-0 w-0' : '-translate-x-full w-60'
			}`}
		>
			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="px-4 lg:mt-9 lg:px-6">
					<div>
						<h3 className="mb-6 ml-4 text-md font-semibold text-bodydark2">MENU</h3>
						<ul className="mb-6 flex flex-col gap-1.5">{getMenuItems()}</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
