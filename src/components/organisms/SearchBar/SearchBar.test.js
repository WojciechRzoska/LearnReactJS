import { render, screen, fireEvent } from 'test-utils';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { handlers } from 'mocks/handlers';

const server = setupServer(...handlers);

describe('Search Bar', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  it('Render the component', () => {
    render(<SearchBar />);
    screen.getByText('Teacher');
    screen.getByPlaceholderText('Search');
  });
  it('Display users when search phrase is matching', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'ad' } });
    await screen.findByText(/Adam Romański/);
  });

  it('Hiding when search phrase is empty', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'ad' } });
    await screen.findByText(/Adam Romański/);

    fireEvent.change(input, { target: { value: '' } });
    const result = screen.queryByLabelText('result');
    expect(result).not.toBeInTheDocument();
  });
});
