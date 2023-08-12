import { configureStore } from '@reduxjs/toolkit';
import { ProfileSlice } from './features/profile';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		profile: ProfileSlice.reducer,
	},
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
