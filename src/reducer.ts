import * as types from './types';
import {Toast, ToastAction, DismissActionPayload, UpdateActionPayload} from './definitions';

const initialState: Toast[] = [];

const handlers = {
  [types.TOAST_MESSAGE]: (toasts: Toast[], action: ToastAction<Toast>) => (
    toasts.concat(action.payload)
  ),
  [types.TOAST_DISMISS]: (toasts: Toast[], action: ToastAction<DismissActionPayload>) => (
    'id' in action.payload
      ? toasts.filter(toast => toast.id !== action.payload.id)
      : []
  ),
  [types.TOAST_UPDATE]: (toasts: Toast[], action: ToastAction<UpdateActionPayload>) => (
    toasts.map(toast => toast.id === action.payload.id
      ? {...toast, ...action.payload.options}
      : toast
    )
  )
};

export default (toasts = initialState, action) => {
  return action.type in handlers
    ? handlers[action.type](toasts, action)
    : toasts;
};
