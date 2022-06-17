import axios, { AxiosError, AxiosResponse } from 'axios';

import { removeCookie } from './cookies';
import toastify from './toastify';
import * as cookiesConstant from 'renderer/constants/cookies';
import store from 'renderer/store';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'renderer/store/auth/actions';
import { ResponseError } from 'renderer/types/response';

export const errorHandler = (
	callbackAxiosError?: (err: AxiosResponse<ResponseError>) => void,
	callbackValidationError?: (err: AxiosResponse<ResponseError>) => void,
	callbackStockError?: (err: Error) => void
) => {
	return (error: Error | AxiosError<ResponseError>) => {
		if (axios.isAxiosError(error)) {
			if (error.response?.data) {
				toastify.error(error.response.data.message);
				if (error.response.status === 401) {
					removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
					store.dispatch(authCurrentDataRequestAction(null));
					store.dispatch(authCurrentTokenRequestAction(null));
				} else if (error.response.status === 400) {
					callbackValidationError && callbackValidationError(error.response);
				}
				callbackAxiosError && callbackAxiosError(error.response);
			} else {
				toastify.error(error.message);
			}
		} else {
			toastify.error(error.message);
			callbackStockError && callbackStockError(error);
		}
	};
};
