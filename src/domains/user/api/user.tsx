import { CancelablePromise, UserDto, UsersService } from 'api';

export const getUserByToken = (): CancelablePromise<UserDto> => {
	return UsersService.usersControllerGetUserByToken();
};
