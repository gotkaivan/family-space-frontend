import { API_HOST } from 'common/constants';
import { AuthResponseDto, AuthService, CancelablePromise, LoginRequestDto, OpenAPI, RegisterRequestDto } from 'generated/api';

OpenAPI.BASE = API_HOST;

export const loginApi = (requestBody: LoginRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerLogin(requestBody);
};

export const registerApi = (requestBody: RegisterRequestDto): CancelablePromise<AuthResponseDto> => {
	return AuthService.authControllerRegister(requestBody);
};

export const logoutApi = (): CancelablePromise<void> => {
	return AuthService.authControllerLogout();
};
