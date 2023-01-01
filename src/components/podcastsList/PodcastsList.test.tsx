import { render, screen } from '@testing-library/react';

import PodcastList from './PodcastsList';
import { DUMMY_PODCASTS } from '../../data/dummyData';

describe('PodcastList', () => {
  test('renders correctly', () => {
    render(<PodcastList podcasts={DUMMY_PODCASTS} />);

    const potcatsListElement = screen.getByRole('list');
    expect(potcatsListElement).toBeInTheDocument();
    const potcatsListItemElement = screen.getAllByRole('listitem');
    expect(potcatsListItemElement).toHaveLength(DUMMY_PODCASTS.length);
  });
});
