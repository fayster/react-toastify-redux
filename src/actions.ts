import * as types from './types';
import {toast, ToastType} from "react-toastify";
import uniqueId from './utils/uniqueId';
import {
  ToastAction, DismissActionPayload, Toast, ToastOptions, UpdateActionOptions, UpdateActionPayload
} from './definitions';

export const toastActionCreator = (type: ToastType) => {
  return (message: any, options: ToastOptions = {}): ToastAction<Toast> => ({
    type: types.TOAST_MESSAGE,
    payload: {
      id: options.id || uniqueId('toast'),
      ...options,
      message,
      type
    }
  });
};

export const dismiss = (id?: string): ToastAction<DismissActionPayload> => ({
  type: types.TOAST_DISMISS,
  payload: {id}
});

export const update = (id: string, options: UpdateActionOptions): ToastAction<UpdateActionPayload> => ({
  type: types.TOAST_UPDATE,
  payload: {id, options}
});

export const error = toastActionCreator(toast.TYPE.ERROR as ToastType);
export const warning = toastActionCreator(toast.TYPE.WARNING as ToastType);
export const info = toastActionCreator(toast.TYPE.INFO as ToastType);
export const message = toastActionCreator(toast.TYPE.DEFAULT as ToastType);
export const success = toastActionCreator(toast.TYPE.SUCCESS as ToastType);