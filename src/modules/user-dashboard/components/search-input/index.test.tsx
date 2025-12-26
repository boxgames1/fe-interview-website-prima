import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './index';

describe('SearchInput', () => {
  it('renders search input with placeholder', () => {
    render(<SearchInput value='' onChange={vi.fn()} onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it('displays the search label', () => {
    render(<SearchInput value='' onChange={vi.fn()} onSearch={vi.fn()} />);
    expect(screen.getByText(/what are you looking for/i)).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput value='' onChange={handleChange} onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search by name/i);
    await user.type(input, 'John');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const handleSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput value='John' onChange={vi.fn()} onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search by name/i);
    await user.type(input, '{Enter}');
    expect(handleSearch).toHaveBeenCalled();
  });

  it('calls onSearch when search button is clicked', async () => {
    const handleSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput value='John' onChange={vi.fn()} onSearch={handleSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);
    expect(handleSearch).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<SearchInput value='' onChange={vi.fn()} onSearch={vi.fn()} />);
    const input = screen.getByLabelText(/search users by name/i);
    expect(input).toHaveAttribute('id', 'user-search');
  });
});
