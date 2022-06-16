import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Root from '../renderer/root';

describe('App', () => {
	it('should render', () => {
		expect(render(<Root />)).toBeTruthy();
	});
});
