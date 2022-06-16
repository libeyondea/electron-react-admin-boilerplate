import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@reduxjs/toolkit';
import {
	profileUpdateDataRequestAction,
	profileUpdateDataSuccessAction,
	profileUpdateLoadingRequestAction,
	profileUpdateLoadingSuccessAction,
	profileShowDataRequestAction,
	profileShowDataSuccessAction,
	profileShowLoadingRequestAction,
	profileShowLoadingSuccessAction
} from './actions';

export const profileShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(profileShowDataRequestAction.match),
		map((action) => profileShowDataSuccessAction(action.payload))
	);

export const profileShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(profileShowLoadingRequestAction.match),
		map((action) => profileShowLoadingSuccessAction(action.payload))
	);

export const profileUpdateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(profileUpdateDataRequestAction.match),
		map((action) => profileUpdateDataSuccessAction(action.payload))
	);

export const profileUpdateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(profileUpdateLoadingRequestAction.match),
		map((action) => profileUpdateLoadingSuccessAction(action.payload))
	);
