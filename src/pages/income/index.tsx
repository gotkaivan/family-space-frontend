import React from 'react';
import { Outlet } from 'react-router-dom';
import IncomeTabs from '../../components/income/IncomeTabs';

const IncomePage = () => {
	return (
		<>
			<IncomeTabs />
			<Outlet />
		</>
	);
};

export default IncomePage;
