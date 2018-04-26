import * as actions from '../actions';
import * as types from '../types';
import {toast, ToastType} from 'react-toastify';

describe('actions', () => {
  const message = 'Foo bar';

  describe('message', () => {
    it('should create an action to add a default toast', () => {
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          id: 'toast1',
          type: toast.TYPE.DEFAULT,
          message,
          title: 'foo bar'
        }
      };
      expect(actions.message(message, {title: 'foo bar'})).toEqual(expectedAction);
    });
  });

  describe('error', () => {
    it('should create an action to add a error toast', () => {
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          id: 'toast2',
          type: toast.TYPE.ERROR,
          message
        }
      };
      expect(actions.error(message)).toEqual(expectedAction);
    });
  });

  describe('success', () => {
    it('should create an action to add a success toast', () => {
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          id: 'toast3',
          type: toast.TYPE.SUCCESS,
          message
        }
      };
      expect(actions.success(message)).toEqual(expectedAction);
    });
  });

  describe('info', () => {
    it('should create an action to add a info toast', () => {
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          id: 'toast4',
          type: toast.TYPE.INFO,
          message
        }
      };
      expect(actions.info(message)).toEqual(expectedAction);
    });
  });

  describe('warning', () => {
    it('should create an action to add a warning toast', () => {
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          id: 'toast5',
          type: toast.TYPE.WARNING,
          message
        }
      };
      expect(actions.warning(message)).toEqual(expectedAction);
    });
  });

  describe('dismiss', () => {
    it('should create an action to dismiss a toast', () => {
      const expectedAction = {
        type: types.TOAST_DISMISS,
        payload: {
          id: 'toast1'
        }
      };
      expect(actions.dismiss('toast1')).toEqual(expectedAction);
    });
  });

  describe('update', () => {
    it('should create an action to update a toast', () => {
      const updateOptions = {
        message: 'Hello world',
        position: toast.POSITION.BOTTOM_CENTER
      };
      const expectedAction = {
        type: types.TOAST_UPDATE,
        payload: {
          id: 'toast1',
          options: {...updateOptions}
        }
      };
      expect(actions.update('toast1', updateOptions)).toEqual(expectedAction);
    });
  });

  describe('toastActionCreator', () => {
    it('should create an action to add a default toast', () => {
      const options = {
        title: 'Default message',
        message: 'Hello world',
        position: toast.POSITION.BOTTOM_CENTER
      };
      const expectedAction = {
        type: types.TOAST_MESSAGE,
        payload: {
          type: toast.TYPE.DEFAULT,
          id: 'toast6',
          ...options,
          message
        }
      };
      expect(actions.toastActionCreator(toast.TYPE.DEFAULT as ToastType)(message, options)).toEqual(expectedAction);
    });
  });
});