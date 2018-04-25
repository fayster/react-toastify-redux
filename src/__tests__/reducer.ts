import * as types from '../types';
import {Toast} from "../definitions";
import reducer from '../reducer';

const initialState: Toast[] = [];

describe('reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {
			type: 'UNKNOWN_ACTION_TYPE',
			payload: null
		})).toEqual(initialState);
	});

	it('should handle TOAST_MESSAGE', () => {
		expect(reducer([], {
			type: types.TOAST_MESSAGE,
			payload: {
				id: 'toast1',
				message: 'foo bar'
			}
		})).toEqual([{
			id: 'toast1',
			message: 'foo bar',
		}]);
	});

	it('should handle TOAST_DISMISS', () => {
		expect(reducer([], {
			type: types.TOAST_DISMISS,
			payload: {
				id: 'toast1'
			}
		})).toEqual([]);

		expect(reducer([{
			id: 'toast1',
			message: 'foo bar'
		}], {
			type: types.TOAST_DISMISS,
			payload: {
				id: 'toast2'
			}
		})).toEqual([{
			id: 'toast1',
			message: 'foo bar',
		}]);

		expect(reducer([{
			id: 'toast1',
			message: 'foo bar'
		}], {
			type: types.TOAST_DISMISS,
			payload: {}
		})).toEqual([]);
	});

	it('should handle TOAST_UPDATE', () => {
		const state = [{
			id: 'toast1',
			message: 'foo bar',
		}];

		expect(reducer(state, {
			type: types.TOAST_UPDATE,
			payload: {
				id: 'toast1',
				options: {
					message: 'hello world',
					type: 'message'
				}
			}
		})).toEqual([{
			id: 'toast1',
			message: 'hello world',
			type: 'message'
		}]);

		expect(reducer(state, {
			type: types.TOAST_UPDATE,
			payload: {
				id: 'toast2',
				options: {
					message: 'hello world',
					type: 'message'
				}
			}
		})).toEqual([{
			id: 'toast1',
			message: 'foo bar',
		}]);
	});
});