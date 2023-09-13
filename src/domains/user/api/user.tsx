import { API_HOST, KEY__AUTH_TOKEN } from 'common/constants';
import { CancelablePromise, OpenAPI, UserDto, UsersService } from 'generated/api';

const authToken = localStorage.getItem(KEY__AUTH_TOKEN);

OpenAPI.BASE = API_HOST;

export const getUserByToken = (accessToken: string): CancelablePromise<UserDto> => {
	return UsersService.usersControllerGetUserByToken();
};
