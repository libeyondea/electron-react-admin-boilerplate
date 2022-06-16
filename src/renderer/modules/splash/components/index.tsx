import { getCookie } from 'renderer/helpers/cookies';
import { appInitializedRequestAction } from 'renderer/store/app/actions';
import { authCurrentDataRequestAction, authCurrentTokenRequestAction } from 'renderer/store/auth/actions';
import ImageComponent from 'renderer/components/Image/components';
import config from 'renderer/config';
import { selectIsAuth } from 'renderer/store/auth/selectors';
import * as cookiesConstant from 'renderer/constants/cookies';
import * as routeConstant from 'renderer/constants/route';
import useAppDispatch from 'renderer/hooks/useAppDispatch';
import useAppSelector from 'renderer/hooks/useAppSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import useOnceEffect from 'renderer/hooks/useOnceEffect';
import authService from 'renderer/services/authService';
import { errorHandler } from 'renderer/helpers/error';
import { LocationState } from 'renderer/types/router';

type Props = {};

const SplashComponent: React.FC<Props> = () => {
	const navigate = useNavigate();
	const location = useLocation() as LocationState;
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	console.log('SplashComponent');

	useOnceEffect(() => {
		dispatch(appInitializedRequestAction(true));
		const token = getCookie(cookiesConstant.COOKIES_KEY_TOKEN);
		const initialUrl = location.state?.from?.pathname;

		if (isAuth) {
			if (initialUrl) {
				navigate(initialUrl, {
					replace: true
				});
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
					replace: true
				});
			}
		} else if (token) {
			authService
				.me(token)
				.then((response) => {
					dispatch(authCurrentDataRequestAction(response.data.data));
					dispatch(authCurrentTokenRequestAction(token));
					if (initialUrl) {
						navigate(initialUrl, {
							replace: true
						});
					} else {
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
							replace: true
						});
					}
				})
				.catch(
					errorHandler(() =>
						navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`, {
							replace: true,
							state: {
								from: location.state?.from
							}
						})
					)
				);
		} else {
			dispatch(authCurrentDataRequestAction(null));
			dispatch(authCurrentTokenRequestAction(null));
			if (initialUrl) {
				navigate(initialUrl, {
					replace: true
				});
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`, {
					replace: true,
					state: {
						from: location.state?.from
					}
				});
			}
		}
	});

	return (
		<div className="flex h-screen">
			<ImageComponent className="m-auto animate-spin rounded-full h-32 w-32" src={config.LOGO_URL} alt="Loading" />
		</div>
	);
};

export default SplashComponent;
