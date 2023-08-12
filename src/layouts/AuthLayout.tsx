import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-600 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="flex flex-wrap items-center">
					<div className="w-full h-full border-stroke dark:border-strokedark xl:border-l-2">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
