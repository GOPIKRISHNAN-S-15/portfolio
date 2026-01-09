import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name GS', () => {
  render(<App />);
  const linkElement = screen.getByText(/gs\./i);
  expect(linkElement).toBeInTheDocument();
});
