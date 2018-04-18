import {ToastContainerProps, ToastType} from "react-toastify";
import {ComponentClass, SFC} from "react";

export interface ToastBaseOptions {
	/**
	 * Set the toast type.
	 * `One of: 'info', 'success', 'warning', 'error', 'default'`
	 */
	type?: ToastType;

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

export interface ToastId {
	/**
	 * Unique toast id.
	 * Default: generated automatically
	 */
	id?: string;
}

export interface ToastMessage {
	/**
	 * Toast message
	 */
	message: string;
}

export type Toast = ToastId & ToastMessage & ToastBaseOptions;

export interface Action<T> {
	/**
	 * Action type
	 */
	type: string;
	payload: T;
}

export type ToastOptions = ToastId & ToastBaseOptions;

export interface DismissActionPayload {
	/**
	 * Identificational number for dismiss toast
	 */
	id: string;
}

export interface UpdateActionPayload extends DismissActionPayload {
	options: ToastBaseOptions & ToastMessage;
}

export interface StateProps {
	toastList: Toast[];
}

export interface DispatchProps {
	dismiss(id: string): void;
}

export interface OwnProps extends ToastContainerProps {
	toastComponent?: SFC<Toast> | ComponentClass<Toast> | string;
}

export interface ToastIds {
	[storageToastId: string]: number;
}