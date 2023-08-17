import React, { useState } from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen overflow-hidden">
				<Sidebar
					isSidebarOpen={isSidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<Header
						isSideberOpen={isSidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>
					<main>
						<div className="mx-auto max-w-screen p-4 md:p-6">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
