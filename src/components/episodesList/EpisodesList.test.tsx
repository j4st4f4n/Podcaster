import { render, screen } from '@testing-library/react';
import { DUMMY_EPISODES } from '../../data/dummyData';
import EpisodesList from './EpisodesList';

describe('EpisodesList', () => {
  test('renders correctly', () => {
    render(<EpisodesList episodes={DUMMY_EPISODES} onClick={() => {}} />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const rowHeaderElements = screen.getByRole('rowheader');
    expect(rowHeaderElements).toBeInTheDocument();
    const rowElements = screen.getAllByRole('rowgroup');
    expect(rowElements).toHaveLength(DUMMY_EPISODES.length);
  });
});
