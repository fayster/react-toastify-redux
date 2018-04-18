import * as types from './types';
import {Toast, Action, DismissActionPayload, UpdateActionPayload} from './interfaces';

const initialState: Toast[] = [];

const handlers = {
	[types.TOAST_MESSAGE]: (toasts: Toast[], action: Action<Toast>) => (
		toasts.concat(action.payload)
	),
	[types.TOAST_DISMISS]: (toasts: Toast[], action: Action<DismissActionPayload>) => (
		'id' in action.payload
			? toasts.filter(toast => toast.id !== action.payload.id)
			: []
	),
	[types.TOAST_UPDATE]: (toasts: Toast[], action: Action<UpdateActionPayload>) => (
		toasts.map(toast => toast.id === action.payload.id
			? {...toast, ...action.payload.options}
			: toast
		)
	)
};

export default (toasts=initialState, action) => {
	return action.type in handlers
		? handlers[action.type](toasts, action)
		: toasts;
};
