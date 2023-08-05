import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div>
			<header>Header</header>
			<main>
				<Outlet />
			</main>
			<footer>Footer</footer>
		</div>
	);
};

export default AuthLayout;
