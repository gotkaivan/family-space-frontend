import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import HomePage from '../pages/HomePage';
import ChatPage from '../pages/ChatPage';
import { Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotesPage from '../pages/NotesPage';
import TasksPage from '../pages/TasksPage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={<DefaultLayout />}
			>
				<Route
					index
					element={<Navigate to="/analitycs" />}
				/>
				<Route
					path="analitycs"
					element={<HomePage />}
				/>
				<Route
					path="tasks"
					element={<TasksPage />}
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
		</>
	)
);

export default router;
