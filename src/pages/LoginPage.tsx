import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'common/components/ui/Input';
import Button from 'common/components/ui/Button';
import Icon from 'common/components/ui/Icon';
import { useAppDispatch, useAppSelector } from 'store';
import { changeIsAuth, setUser } from 'store/features/profile';
import { loginApi } from 'api/auth';
import { KEY__AUTH_TOKEN, ROUTE__MAIN } from 'common/constants';
import { isEmail } from 'common/helpers';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { LoginRequestDto } from 'generated/api';

const SignIn: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { notify } = useNotify();

	const EMAIL_ERROR = 'Введите корректный email';

	const PASSWORD_ERROR = 'Пароль должен содерждать минимум 3 символа';

	const profile = useAppSelector(state => state.profile);

	const [currentUser, setCurrentUser] = useState<LoginRequestDto>({ email: '', password: '' });

	const [isTouched, setIsTouched] = useState<boolean>(false);

	const hasEmailError = useMemo(() => !currentUser.email || !isEmail(currentUser.email), [currentUser.email]);

	const hasPasswordError = useMemo(() => !currentUser.password, [currentUser.password]);

	const hasTouchedEmailError: boolean = useMemo(() => hasEmailError && isTouched, [hasEmailError, isTouched]);

	const hasTouchedPasswordError: boolean = useMemo(() => hasPasswordError && isTouched, [hasPasswordError, isTouched]);

	const validateForm = () => {
		if (hasEmailError || hasPasswordError) return false;
		return true;
	};

	const clickHandler = useCallback(async () => {
		setIsTouched(true);

		if (validateForm()) {
			try {
				const user = await loginApi(currentUser);

				dispatch(changeIsAuth(true));

				dispatch(setUser(user));

				navigate(ROUTE__MAIN, {
					replace: true,
				});
			} catch (e: any) {
				notify(NOTIFY_TYPES.ERROR, e.body?.message);
			}
		}
	}, [isTouched, navigate, currentUser, dispatch, hasEmailError, hasPasswordError]);

	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (keyCode === 13) clickHandler();
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h1>{profile.user?.name}</h1>
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Авторизация</h2>

				<form>
					<Input
						label="Email"
						type="text"
						classesType="auth"
						hasError={hasTouchedEmailError}
						errorMessage={EMAIL_ERROR}
						placeholder="Введите ваш email"
						value={currentUser.email}
						onChange={e => setCurrentUser({ ...currentUser, email: e.target.value })}
						icon={
							<Icon
								name={'email'}
								width={22}
								height={22}
							/>
						}
					/>

					<Input
						label="Пароль"
						type="password"
						className={'mb-6'}
						classesType="auth"
						hasError={hasTouchedPasswordError}
						errorMessage={PASSWORD_ERROR}
						placeholder="6+ символов, 1 Заглавная буква"
						value={currentUser.password}
						onChange={e => setCurrentUser({ ...currentUser, password: e.target.value })}
						icon={
							<Icon
								name={'lock'}
								width={22}
								height={22}
							/>
						}
					/>

					<Button
						title={'Войти'}
						className="p-4 text-white"
						clickHandler={clickHandler}
					/>

					<div className="mt-6 text-center">
						<p>
							У вас нет аккаунта ?{' '}
							<Link
								to="/auth/register"
								className="text-primary"
							>
								Зарегистрироваться
							</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};

export default SignIn;
