import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import PodcastSummary from './PodcastSummary';
import { DUMMY_SUMMARY } from '../../data/dummyData';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('PodcastSummary', () => {
  test('renders correctly', () => {
    render(<PodcastSummary {...DUMMY_SUMMARY} />, { wrapper: BrowserRouter });
    const imgElement = screen.getByAltText(DUMMY_SUMMARY.name);
    expect(imgElement).toBeInTheDocument();
    const headerTitleElement = screen.getByRole('heading', {
      level: 4,
      name: DUMMY_SUMMARY.title,
    });
    expect(headerTitleElement).toBeInTheDocument();
    const headerDescriptionElement = screen.getByRole('heading', {
      level: 5,
    });
    expect(headerTitleElement).toBeInTheDocument();
    const artistElement = screen.getByText(`by ${DUMMY_SUMMARY.artist}`);
    expect(artistElement).toBeInTheDocument();
    expect(headerDescriptionElement).toBeInTheDocument();
  });

  test('Redirects to correct URL on title element click', async () => {
    render(<PodcastSummary {...DUMMY_SUMMARY} />, { wrapper: BrowserRouter });

    const headerTitleElement = screen.getByRole('heading', {
      level: 4,
      name: DUMMY_SUMMARY.title,
    });
    await userEvent.click(headerTitleElement);
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/podcast/${DUMMY_SUMMARY.id}`
    );
  });

  test('Redirects to correct URL on artist element click', async () => {
    render(<PodcastSummary {...DUMMY_SUMMARY} />, { wrapper: BrowserRouter });

    const artistElement = screen.getByText(`by ${DUMMY_SUMMARY.artist}`);
    await userEvent.click(artistElement);
    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/podcast/${DUMMY_SUMMARY.id}`
    );
  });
});
