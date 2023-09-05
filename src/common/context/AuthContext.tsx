import React, { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserDto } from 'generated/api';
import Loader from '../components/ui/Loader';
import { loginApi } from '../api/auth';
import { ACTION__APP_INIT, ACTION__LOGIN, ACTION__LOGOUT, KEY__AUTH_TOKEN, ROUTE__LOGIN, ROUTE__MAIN } from '../constants';
import useLocalStorage from '../hooks/useLocalStorage';
import { getUserByToken } from 'domains/user/api/user';

export interface AuthState {
	isAuthenticated: boolean;
	isInitialised: boolean;
	user: UserDto | null;
}

const initialAuthState: AuthState = {
	isAuthenticated: false,
	isInitialised: false,
	user: null,
};

interface AppInitAction {
	type: typeof ACTION__APP_INIT;
	payload: UserDto | null;
}

interface LoginAction {
	type: typeof ACTION__LOGIN;
	payload: UserDto;
}

interface LogoutAction {
	type: typeof ACTION__LOGOUT;
}

const reducer = (state: AuthState, action: AppInitAction | LoginAction | LogoutAction) => {
	switch (action.type) {
		case ACTION__APP_INIT: {
			const user = action.payload;

			return {
				...state,
				isAuthenticated: !!user,
				isInitialised: true,
				user,
			};
		}
		case ACTION__LOGIN: {
			const user = action.payload;

			return {
				...state,
				isAuthenticated: true,
				user,
			};
		}
		case ACTION__LOGOUT: {
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		}
		default: {
			return { ...state };
		}
	}
};

export interface AuthContextType extends AuthState {
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	...initialAuthState,
	login: () => Promise.resolve(),
	logout: () => {},
});

interface Props {
	children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialAuthState);
	const navigate = useNavigate();
	const location = useLocation();
	const [authToken, setAuthToken] = useLocalStorage(KEY__AUTH_TOKEN, '');

	const login = useCallback(
		async (email: string, password: string) => {
			try {
				const response = await loginApi({ email, password });

				dispatch({
					type: ACTION__LOGIN,
					payload: response.user,
				});

				setAuthToken(response.token);

				navigate(ROUTE__MAIN, {
					replace: true,
				});
			} catch (e) {
				console.log(e);
			}
		},
		[navigate, setAuthToken]
	);

	const logout = useCallback(() => {
		setAuthToken('');
		dispatch({ type: ACTION__LOGOUT });
		navigate(ROUTE__LOGIN, {
			replace: true,
		});
	}, [navigate, setAuthToken]);

	const contextValue = useMemo(
		() => ({
			...state,
			login,
			logout,
		}),
		[state, login, logout]
	);

	useEffect(() => {
		const initApp = async () => {
			try {
				if (authToken && !state.user) {
					const response = await getUserByToken(authToken);

					console.log(response);

					dispatch({
						type: ACTION__APP_INIT,
						payload: response,
					});

					if (location.pathname === ROUTE__LOGIN) {
						navigate(ROUTE__MAIN);
					}
					console.log(state);
				}

				if (!authToken) {
					dispatch({
						type: ACTION__APP_INIT,
						payload: null,
					});

					navigate(ROUTE__LOGIN);
				}
			} catch (err) {
				console.error(err);

				dispatch({
					type: ACTION__APP_INIT,
					payload: null,
				});

				navigate(ROUTE__LOGIN);
			}
		};
		if (!state.isInitialised) {
			initApp();
		}
	}, [location, navigate, authToken, state.isInitialised, state]);

	if (!state.isInitialised) {
		return <Loader />;
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
