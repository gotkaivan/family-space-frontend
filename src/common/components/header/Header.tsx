import React from 'react';
import DarkModeSwitcher from '../ui/DarkModeSwitcher';
import DropdownUser from '../dropdown/DropdownUser';
import MenuBurger from '../burger/MenuBurger';

const Header = (props: { isSideberOpen: boolean; setSidebarOpen: (isOpen: boolean) => void }) => {
	return (
		<header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
			<div className="flex flex-grow items-center justify-between py-2 px-4 shadow-2 md:px-6">
				<div className="items-center gap-3 2xsm:gap-7">
					<ul className="flex items-center gap-2 2xsm:gap-4">
						<MenuBurger
							isOpen={props.isSideberOpen}
							clickHandler={e => {
								e.stopPropagation();
								props.setSidebarOpen(!props.isSideberOpen);
							}}
						/>
						<DarkModeSwitcher />
					</ul>
				</div>

				<div className="flex items-center gap-3 2xsm:gap-7">
					<ul className="flex items-center gap-2 2xsm:gap-4">
						{/* <DropdownNotification /> */}
						{/* <DropdownMessage /> */}
					</ul>
					<DropdownUser />
				</div>
			</div>
		</header>
	);
};

export default Header;
