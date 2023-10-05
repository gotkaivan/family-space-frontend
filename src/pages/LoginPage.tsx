import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'common/components/ui/Input';
import Button from 'common/components/ui/Button';
import { useAppDispatch, useAppSelector } from 'store';
import { changeIsAuth, setUser } from 'store/features/profile';
import { loginApi } from 'api/auth';
import { ROUTE__MAIN } from 'common/constants';
import { isEmail } from 'common/helpers';
import { NOTIFY_TYPES, useNotify } from 'common/hooks/useNotify';
import { LoginRequestDto } from 'generated/api';
import Icon from 'common/components/ui/Icon';
import { SubmitHandler, useForm } from 'react-hook-form';

const SignIn: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { notify } = useNotify();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<LoginRequestDto>({});

	const profile = useAppSelector(state => state.profile);

	const onClickHandler: SubmitHandler<LoginRequestDto> = async (form: LoginRequestDto) => {
		try {
			const user = await loginApi(form);
			dispatch(changeIsAuth(true));
			dispatch(setUser(user));
			navigate(ROUTE__MAIN, {
				replace: true,
			});
		} catch (e: any) {
			notify(NOTIFY_TYPES.ERROR, e.body?.message);
		}
	};

	return (
		<>
			<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
				<h1>{profile.user?.name}</h1>
				<h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Авторизация</h2>

				<form onSubmit={handleSubmit(onClickHandler)}>
					<Input
						id="email"
						label="Email"
						type="text"
						classesType="auth"
						hasError={!!errors.email?.message}
						errorMessage={errors.email?.message}
						placeholder="Введите ваш email"
						register={register('email', {
							validate: {
								matchPattern: v => isEmail(v) || 'Введите корректный email',
							},
						})}
						icon={
							<Icon
								name={'mail'}
								size={22}
							/>
						}
					/>

					<Input
						id="password"
						label="Пароль"
						type="password"
						register={register('password', {
							required: 'Пароль должен содерждать минимум 3 символа',
						})}
						className={'mb-6'}
						classesType="auth"
						hasError={!!errors.password?.message}
						errorMessage={errors.password?.message}
						placeholder="6+ символов, 1 Заглавная буква"
						icon={
							<Icon
								name={'lock'}
								size={22}
							/>
						}
					/>

					<Button
						type="submit"
						title={'Войти'}
						className="p-4 text-white"
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
