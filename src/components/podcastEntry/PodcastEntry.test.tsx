import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import PodcastEntry from './PodcastEntry';
import { DUMMY_ENTRY } from '../../data/dummyData';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('PodcastEntry', () => {
  test('renders correctly', () => {
    render(<PodcastEntry podcast={DUMMY_ENTRY} />, { wrapper: BrowserRouter });

    const imageElement = screen.getByAltText(DUMMY_ENTRY.name);
    expect(imageElement).toBeInTheDocument();
    const titleElement = screen.getByText(DUMMY_ENTRY.title);
    expect(titleElement).toHaveTextContent(DUMMY_ENTRY.title);
    const artistElement = screen.getByText(`Author: ${DUMMY_ENTRY.artist}`);
    expect(artistElement).toHaveTextContent(DUMMY_ENTRY.artist);
  });

  test('clickeable div reidirects correctly', async () => {
    render(<PodcastEntry podcast={DUMMY_ENTRY} />, { wrapper: BrowserRouter });

    const clickableDivElement = await screen.findByTitle(DUMMY_ENTRY.title);
    await userEvent.click(clickableDivElement);
    expect(mockHistoryPush).toHaveBeenCalledWith(`/podcast/${DUMMY_ENTRY.id}`);
  });
});
