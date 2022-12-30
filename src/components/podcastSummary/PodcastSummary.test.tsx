import { render, screen } from '@testing-library/react';
import PodcastSummary from './PodcastSummary';
import { DUMMY_SUMMARY } from '../../data/dummyData';

describe('PodcastSummary', () => {
  test('renders correctly', () => {
    render(<PodcastSummary {...DUMMY_SUMMARY} />);
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
    expect(headerDescriptionElement).toBeInTheDocument();
  });
});
