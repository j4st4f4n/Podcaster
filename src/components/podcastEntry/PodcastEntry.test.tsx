import { render, screen } from '@testing-library/react';

import PodcastEntry from './PodcastEntry';
import { DUMMY_ENTRY } from '../../data/dummyData';

describe('PodcastEntry', () => {
  test('renders correctly', () => {
    render(<PodcastEntry podcast={DUMMY_ENTRY} />);

    const imageElement = screen.getByAltText(DUMMY_ENTRY.name);
    expect(imageElement).toBeInTheDocument();
    const titleElement = screen.getByText(DUMMY_ENTRY.title);
    expect(titleElement).toHaveTextContent(DUMMY_ENTRY.title);
    const artistElement = screen.getByText(`Author: ${DUMMY_ENTRY.artist}`);
    expect(artistElement).toHaveTextContent(DUMMY_ENTRY.artist);
  });
});
