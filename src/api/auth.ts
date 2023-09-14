import { AuthResponseDto, AuthService, CancelablePromise, LoginRequestDto, RegisterRequestDto } from './';

export const loginApi = (requestBody: LoginRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerLogin(requestBody);
};

export const registerApi = (requestBody: RegisterRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerRegister(requestBody);
};

export const logoutApi = (): CancelablePromise<void> => {
	return AuthService.authControllerLogout();
};
