import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PodcastContext } from '../../context/podcast-context';
import Header from './Header';

describe('Header', () => {
  test('renders correctly', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Podcaster');
  });

  test('shows loadingElement when podcastContext is loading', () => {
    const contextValue = {
      podcastsList: [],
      selectedPodcast: undefined,
      loading: true,
      selectPodcast: () => {},
      setLoading: () => {},
    };

    render(
      <PodcastContext.Provider value={contextValue}>
        <Header />
      </PodcastContext.Provider>,
      { wrapper: BrowserRouter }
    );

    const loadingElement = screen.getByTitle(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
