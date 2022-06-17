import { Navigate, useLocation } from 'react-router-dom';

import * as routeConstant from 'renderer/constants/route';
import * as userConstant from 'renderer/constants/user';
import useAppSelector from 'renderer/hooks/useAppSelector';
import { selectAppInitialized } from 'renderer/store/app/selectors';
import { selectAuthCurrent, selectIsAuth } from 'renderer/store/auth/selectors';

type Props = {
	children: JSX.Element;
};

const AccessControl: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const isAuth = useAppSelector(selectIsAuth);
	const authCurrent = useAppSelector(selectAuthCurrent);
	const appInitialized = useAppSelector(selectAppInitialized);
	console.log('AccessControl');

	if (!appInitialized) {
		return <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} state={{ from: location }} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_AUTH}`) > -1 && isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}`) > -1 && !isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`} state={{ from: location }} />;
	} else if (
		location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`) > -1 &&
		authCurrent.data?.role !== userConstant.USER_ROLE_OWNER
	) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	}
	return children;
};

export default AccessControl;
