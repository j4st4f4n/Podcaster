import { render, screen } from '@testing-library/react';
import EpisodesCounter from './EpisodesCounter';

describe('EpisodesCounter', () => {
  test('renders counter correctly', () => {
    const testNumber = 25;
    render(<EpisodesCounter counter={testNumber} />);
    const counterElement = screen.getByRole('heading', { level: 2 });
    expect(counterElement).toBeInTheDocument();
    expect(counterElement).toHaveTextContent(
      `Episodes: ${testNumber.toString()}`
    );
  });
});
