import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/reducers';
import authReducer from './auth/reducers';
import userReducer from './user/reducers';
import profileReducer from './profile/reducers';
import settingReducer from './setting/reducers';

export default combineReducers({
	appState: appReducer,
	authState: authReducer,
	userState: userReducer,
	profileState: profileReducer,
	settingState: settingReducer
});
