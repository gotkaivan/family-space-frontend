import React, { FC, memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotesPage from '../pages/NotesPage';
import TasksPage from '../pages/TasksPage';

import { useAuth } from '../common/hooks/useAuth';
import CapitalizationPage from 'pages/CapitalizationPage';
import TransactionsPage from 'pages/TransactionsPage';
import TaskBoardsPage from 'pages/TaskBoardsPage';

const CustomRoutes: FC = () => {
	const { isAuth, isInitialised } = useAuth();

	const getSecureRoutes = () => {
		return (
			<Route
				path="/"
				element={<DefaultLayout />}
			>
				<Route
					index
					element={<Navigate to="/tasks" />}
				/>
				<Route
					path="analytics"
					element={<HomePage />}
				/>
				<Route
					path="transactions"
					element={<TransactionsPage />}
				/>
				<Route
					path="capitalization/"
					element={<CapitalizationPage />}
				/>
				<Route
					path="tasks"
					element={<TaskBoardsPage />}
				/>
				<Route
					element={<TasksPage />}
					path="tasks/:boardId"
				/>
				<Route
					path="chat"
					element={<ChatPage />}
				/>
				<Route
					path="notes"
					element={<NotesPage />}
				/>
			</Route>
		);
	};

	const getAuthRoutes = () => {
		return (
			<Route
				path="/auth"
				element={<AuthLayout />}
			>
				<Route
					path="login"
					element={<LoginPage />}
				/>
				<Route
					path="register"
					element={<RegisterPage />}
				/>
			</Route>
		);
	};

	const loadedRoutes = isAuth ? getSecureRoutes() : getAuthRoutes();

	const routes = isInitialised ? loadedRoutes : null;

	return <Routes>{routes}</Routes>;
};

export default memo(CustomRoutes);
