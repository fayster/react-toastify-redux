import React from 'react';
import {ToastContainerProps as ReactToastContainerProps} from "react-toastify";
import {ComponentClass, SFC} from "react";

export interface ToastBaseOptions {
  /**
   * Render default or custom toast component
   * If use only default component, this property will be ignored
   * `Default: false`
   */
  renderDefaultComponent?: boolean;

  /**
   * Title for custom toast component
   * `Default: ''`
   */
  title?: string;

  /**
   * Set the toast type.
   * `One of: 'info', 'success', 'warning', 'error', 'default'`
   */
  type?: 'info' | 'success' | 'warning' | 'error' | 'default';

  /**
   * Pause the timer when the mouse hover the toast.
   * `Default: true`
   */
  pauseOnHover?: boolean;

  /**
   * Remove the toast when clicked.
   * `Default: true`
   */
  closeOnClick?: boolean;

  /**
   * Set the delay in ms to close the toast automatically.
   * Use `false` to prevent the toast from closing.
   * `Default: 5000`
   */
  autoClose?: number | false;

  /**
   * Set the default position to use.
   * `One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'`
   * `Default: 'top-right'`
   */
  position?: string;

  /**
   * An optional css class to set for the progress bar.
   */
  progressClassName?: string | object;

  /**
   * An optional css class to set.
   */
  className?: string | object;

  /**
   * An optional css class to set for the toast content.
   */
  bodyClassName?: string | object;

  /**
   * Hide or show the progress bar.
   * `Default: false`
   */
  hideProgressBar?: boolean;

  /**
   * Allow toast to be draggable
   * `Default: true`
   */
  draggable?: boolean;

  /**
   * The percentage of the toast's width it takes for a drag to dismiss a toast
   * `Default: 80`
   */
  draggablePercent?: number;
}

/**
 * Toast item property
 */
export interface Toast extends ToastBaseOptions {
  id: string;
  message: any;
}

/**
 * Toast options for add toast actions
 */
export interface ToastOptions extends ToastBaseOptions {
  id?: string;
}

/**
 * Toast Container options
 */
export interface ToastContainerProps {
  /**
   * Custom toast component
   * `Default: undefined`
   */
  toastComponent?: SFC<Toast> | ComponentClass<Toast> | string;
}

/**
 * Additional props for custom toast component
 */
export interface ToastComponentAdditionalProps {
  id: string;
  title: string;
  message: any;
}

/**
 * Props for custom toast component
 */
export interface ToastComponentProps extends ToastComponentAdditionalProps {
  /**
   * Close toast handler
   */
  closeToast(): void;
}

/**
 * Toast action type
 */
export interface ToastAction<T> {
  /**
   * Action type
   */
  type: string;
  payload: T;
}

/**
 * Dismiss action payload
 */
export interface DismissActionPayload {
  /**
   * Identificational number for dismiss toast
   */
  id: string;
}

/**
 * Update action options
 */
export interface UpdateActionOptions extends ToastBaseOptions {
  message?: any;
}

/**
 * Update action payload
 */
export interface UpdateActionPayload {
  /**
   * Identificational number for update toast
   */
  id: string;
  options: UpdateActionOptions;
}

export const toastsReducer: (toastList: Toast[], action: ToastAction<any>) => Toast[];

export class ToastContainer extends React.Component<ReactToastContainerProps & ToastContainerProps> {
}

export const dismiss: (id?: string) => ToastAction<DismissActionPayload>;
export const update: (id: string, options: UpdateActionOptions) => ToastAction<UpdateActionPayload>;
export const error: (message: string, options?: ToastOptions) => ToastAction<Toast>;
export const warning: (message: string, options?: ToastOptions) => ToastAction<Toast>;
export const info: (message: string, options?: ToastOptions) => ToastAction<Toast>;
export const message: (message: string, options?: ToastOptions) => ToastAction<Toast>;
export const success: (message: string, options?: ToastOptions) => ToastAction<Toast>;