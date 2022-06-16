import cookie from 'js-cookie';

export const setCookie = (key: string, value: string, options?: cookie.CookieAttributes): void => {
	window.localStorage.setItem(key, value);
};

export const removeCookie = (key: string, options?: cookie.CookieAttributes): void => {
	window.localStorage.removeItem(key);
};

export const getCookie = (key: string): string | null => {
	return window.localStorage.getItem(key);
};
