import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchBox from './SearchBox';

describe('SearchBox', () => {
  const testNumber = 100;
  test('renders correcly', () => {
    render(
      <SearchBox
        resultsNumber={testNumber}
        value=""
        onSearchChangeHandler={() => {}}
      />
    );

    const resultsElement = screen.getByText(`${testNumber}`);
    expect(resultsElement).toBeInTheDocument();
    expect(resultsElement).toHaveTextContent(`${testNumber}`);

    const searchElement = screen.getByRole('textbox');
    expect(searchElement).toBeInTheDocument();
    expect(searchElement).toHaveTextContent('');
  });

  test('texbox should be focuseable and useable', async () => {
    const testWord = 'Test!';
    render(
      <SearchBox
        resultsNumber={testNumber}
        value=""
        onSearchChangeHandler={() => {}}
      />
    );
    const searchElement = screen.getByRole('textbox');
    await userEvent.tab();
    expect(searchElement).toHaveFocus();
    await userEvent.keyboard(testWord);
    expect(searchElement).toHaveValue(testWord);
    await userEvent.clear(searchElement);
    expect(searchElement).toHaveValue('');
  });
});
