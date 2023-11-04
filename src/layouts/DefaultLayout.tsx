import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'common/components/header/Header';
import Sidebar from 'common/components/sidebar/Sidebar';
import { IS__SIDEBAR__OPEN } from 'common/constants';

export default function DefaultLayout() {
	const isSidebarOpenedFromStorage = localStorage.getItem(IS__SIDEBAR__OPEN);

	const isOpened = useMemo(() => (isSidebarOpenedFromStorage ? JSON.parse(isSidebarOpenedFromStorage) : false), [isSidebarOpenedFromStorage]);

	const [isSidebarOpen, setSidebarOpen] = useState(isOpened);

	const changeSidebarState = (isOpen: boolean) => {
		localStorage.setItem(IS__SIDEBAR__OPEN, JSON.stringify(isOpen));
		setSidebarOpen(isOpen);
	};

	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen">
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					setSidebarOpen={changeSidebarState}
				/>
				<div className={`relative flex flex-1 flex-col duration-300 ${!isSidebarOpen ? 'pl-60' : 'pl-22'}`}>
					<Header />
					<main className="overflow-scroll">
						<div className="mx-auto max-w-screen p-4 md:p-6">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
