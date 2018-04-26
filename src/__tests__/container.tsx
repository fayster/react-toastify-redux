import * as React from 'react'
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ToastContainer} from '../container';
import {toast} from 'react-toastify';
import {Toast} from "../definitions";
import * as types from "../types";
import * as actions from "../actions";
import ConnectedToastContainer from "../container";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

jest.useFakeTimers();

Enzyme.configure({adapter: new Adapter()});

describe('container', () => {
  const toastList = [{
    id: 'toast1',
    message: 'Foo bar',
    type: toast.TYPE.DEFAULT
  }] as Toast[];

  const CustomComponent = ({message}) => (
    <div className='foo-bar'>{message}</div>
  );

  describe('unconnected component', () => {
    const dismiss = jest.fn();

    let wrapper;

    beforeEach(() => {
      dismiss.mockClear();
      wrapper = mount(<ToastContainer toastList={toastList} dismiss={dismiss}/>);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe('without custom component', () => {
      it('should render self and one toast', () => {
        expect(wrapper.find('div.Toastify__toast--default').length).toBe(0);

        jest.runAllTimers();

        wrapper.update();

        expect(wrapper.find('div.Toastify__toast--default').length).toBe(1);
      });

      it('should update toasts', () => {
        jest.runAllTimers();

        wrapper.setProps({
          toastList: [{
            id: 'toast1',
            message: 'Foo bar',
            type: toast.TYPE.WARNING,
          }, {
            id: 'toast2',
            message: 'Hello World',
            type: toast.TYPE.INFO
          }]
        });

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(2);
        expect(wrapper.find('div.Toastify__toast').at(0).find('div.Toastify__toast-body').text()).toBe('Foo bar');
        expect(wrapper.find('div.Toastify__toast').at(1).find('div.Toastify__toast-body').text()).toBe('Hello World');
      });

      it('should dismiss toast', () => {
        jest.runAllTimers();

        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(1);
        wrapper.find('div.Toastify__toast').at(0).find('button.Toastify__close-button').simulate('click');

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(0);
        expect(dismiss.mock.calls.length).toBe(1);
      });

      it('should dismiss toast without click', () => {
        jest.runAllTimers();

        wrapper.setProps({toastList: []});

        jest.runAllTimers();

        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(0);
        expect(dismiss.mock.calls.length).toBe(1);
      });
    });

    describe('with custom component', () => {
      it('should render custom toast', () => {
        jest.runAllTimers();

        wrapper.setProps({
          toastComponent: CustomComponent,
          toastList: [{...toastList[0], type: toast.TYPE.WARNING}]
        });

        jest.runAllTimers();

        wrapper.update();

        const toasts = wrapper.find('div.Toastify__toast');
        expect(toasts.length).toBe(1);
        expect(toasts.find('div.foo-bar').text()).toBe('Foo bar');

        wrapper.setProps({
          toastComponent: undefined,
          toastList: [{...toastList[0], type: toast.TYPE.WARNING}]
        });

        jest.runAllTimers();

        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').at(0).find('div.Toastify__toast-body').text()).toBe('Foo bar');
      });

      it('should update toasts', () => {
        jest.runAllTimers();

        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(1);

        wrapper.setProps({
          toastList: [{
            ...toastList[0],
            renderDefaultComponent: true,
            message: 'Bar foo'
          }]
        });

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(1);
        expect(wrapper.find('div.Toastify__toast').at(0).find('div.Toastify__toast-body').text()).toBe('Bar foo');

        wrapper.setProps({
          toastComponent: CustomComponent,
          renderDefaultComponent: true,
          toastList
        });

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('div.Toastify__toast').length).toBe(1);
        expect(wrapper.find('div.Toastify__toast').at(0).find('div.Toastify__toast-body').text()).toBe('Foo bar');
      });
    });
  });

  describe('unconnect component with init toast component', () => {
    const dismiss = jest.fn();

    let wrapper;

    beforeEach(() => {
      dismiss.mockClear();
      wrapper = mount(
        <ToastContainer
          toastList={toastList}
          dismiss={dismiss}
          toastComponent={CustomComponent}
        />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should render custom toast', () => {
      jest.runAllTimers();
      wrapper.update();

      const toasts = wrapper.find('div.Toastify__toast');
      expect(toasts.length).toBe(1);
      expect(toasts.find('div.foo-bar').text()).toBe('Foo bar');
    });
  });

  describe('connected component', () => {
    const initialState = {
      toasts: toastList
    };

    const mockStore = configureStore();
    let store;
    let providerWrapper;

    beforeEach(() => {
      store = mockStore(initialState);
      providerWrapper = mount(
        <Provider store={store}>
          <ConnectedToastContainer/>
        </Provider>
      );
    });

    afterEach(() => {
      providerWrapper.unmount();
    });

    it('should render the connected component', () => {
      expect(providerWrapper.find(ConnectedToastContainer).length).toEqual(1);
    });

    it('should check prop matches with initialState', () => {
      expect(providerWrapper.find(ToastContainer).prop('toastList')).toEqual(initialState.toasts);
    });

    it('should call dismiss action', () => {
      providerWrapper.find(ToastContainer).prop('dismiss')();

      expect(store.getActions()[0].type).toBe(types.TOAST_DISMISS);
    });

    it('should call actions ', () => {
      store.dispatch(actions.message('Foo bar'));
      store.dispatch(actions.dismiss('toast1'));

      const calledActions = store.getActions();

      expect(calledActions[0].type).toBe(types.TOAST_MESSAGE);
      expect(calledActions[1].type).toBe(types.TOAST_DISMISS);
    });
  });
});