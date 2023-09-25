import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../ui/LucideIcon';
import menu from './menu';
import { Link } from 'react-router-dom';
import MenuBurger from '../burger/MenuBurger';
import SwipeButton from './SwipeButton';

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

	const closeHandler = (e: Event) => {
		e.stopPropagation();
		setSidebarOpen(!isSidebarOpen);
	};

	const getMenuItems = () => {
		return menu.map(item => {
			return (
				<li key={item.name}>
					<Link
						to={`/${item.url}`}
						className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-sm ${
							pathname?.includes(item.url) && 'bg-graydark dark:bg-meta-4'
						}`}
					>
						<div className="w-5">
							<div
								data-tooltip-target="tooltip-right"
								data-tooltip-placement="right"
							>
								<Icon
									name={item.icon.name}
									size={20}
								/>
							</div>

							<div
								id="tooltip-right"
								role="tooltip"
								className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
							>
								Tooltip on right
								<div
									className="tooltip-arrow"
									data-popper-arrow
								></div>
							</div>
						</div>

						{<div className={`transition ${!isSidebarOpen ? '' : 'hidden'}`}>{item.name}</div>}
					</Link>
				</li>
			);
		});
	};

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen flex-col bg-black duration-300 ease-linear dark:bg-boxdark
			lg:static translate-x-0 ${isSidebarOpen ? 'translate-x-0 w-22' : '-translate-x-full w-60'} border-r border-solid border-black dark:border-gray-light`}
		>
			<div className="flex flex-col duration-300 ease-linear relative">
				<SwipeButton
					onClick={() => setSidebarOpen(!isSidebarOpen)}
					className={`${!isSidebarOpen ? '' : 'rotate-180'}`}
				/>

				<nav className={`px-4 mt-6 lg:mt-10.5`}>
					<div>
						<div className="mb-6 ml-4  flex justify-end items-center">
							<div className="lg:hidden">
								<MenuBurger
									isOpen={isSidebarOpen}
									clickHandler={closeHandler}
								/>
							</div>
						</div>

						<ul className="mb-6 flex flex-col gap-1.5">{getMenuItems()}</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
