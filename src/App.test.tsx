import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('src/pages/Index', () => () => <div data-testid="index" />);

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByTestId(/index/)).toBeInTheDocument();
});
