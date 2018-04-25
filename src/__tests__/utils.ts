import compare from '../utils/compare';
import uniqueId from '../utils/uniqueId';

describe('compare', () => {
	const value = {foo: 'bar'};

	it('Should return true, with call equal objects', () => {
		const other = {...value};

		expect(compare(value, other)).toBeTruthy();
	});

	it('Should return false, with call not equal objects', () => {
		const other = {...value, hello: 'world' };

		expect(compare(value, other)).toBeFalsy();
	});

	it('Should return false, with call equal nested objects', () => {
		const anotherValue = {...value, bar: { foo: 'foobar' }};
		const other = {...value, bar: { foo: 'foobar' }};

		expect(compare(anotherValue, other)).toBeFalsy();
	});

	it('Should return true, with call equal by link objects', () => {
		expect(compare(value, value)).toBeTruthy();
	});
});

describe('uniqueId', () => {
	const testPrefix = 'test';

	it('Should return 1 with first call', () => {
		expect(uniqueId(testPrefix)).toBe('test1');
	});
});