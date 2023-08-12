import { useEffect, useState } from 'react';
import { AUTH__ROUTES__ALIAS, KEY__AUTH_TOKEN, ROUTE__LOGIN, ROUTE__MAIN } from '../constants';
import { useAppDispatch, useAppSelector } from '../store';
import { getUserByToken } from '../api/user';
import { changeIsAuth, setUser } from '../store/features/profile';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAuth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const [isInitialised, setIsInitialised] = useState<boolean>(false);
	const { isAuth, user } = useAppSelector(state => state.profile);

	const authToken = localStorage.getItem(KEY__AUTH_TOKEN);

	useEffect(() => {
		const initApp = async () => {
			try {
				if (authToken?.length && !user) {
					const userDto = await getUserByToken(authToken);

					dispatch(setUser(userDto));
					dispatch(changeIsAuth(true));

					if (location.pathname === ROUTE__LOGIN) navigate(ROUTE__MAIN);
				}

				if (!authToken) {
					dispatch(setUser(null));
					if (!location.pathname.includes(AUTH__ROUTES__ALIAS)) navigate(ROUTE__LOGIN);
				}
			} catch (err) {
				console.error(err);

				dispatch(setUser(null));
				navigate(ROUTE__LOGIN);
			} finally {
				setIsInitialised(true);
			}
		};
		if (!isInitialised) {
			initApp();
		}
	}, [location, navigate, authToken]);
	return {
		isAuth,
		isInitialised,
	};
};
