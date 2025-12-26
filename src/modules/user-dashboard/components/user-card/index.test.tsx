import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserCard } from './index';
import { type User } from '../../../../infrastructure/models/user-model';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'ADMIN',
  title: 'Software Engineer',
  team: 'Engineering',
  otherDetails: 'Some details',
};

describe('UserCard', () => {
  it('renders user information', () => {
    render(<UserCard user={mockUser} onViewDetails={vi.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/engineering/i)).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('displays role tag', () => {
    render(<UserCard user={mockUser} onViewDetails={vi.fn()} />);
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });

  it('calls onViewDetails when view details button is clicked', async () => {
    const handleViewDetails = vi.fn();
    const user = userEvent.setup();
    render(<UserCard user={mockUser} onViewDetails={handleViewDetails} />);

    const button = screen.getByRole('button', { name: /view details/i });
    await user.click(button);
    expect(handleViewDetails).toHaveBeenCalledWith(mockUser);
  });

  it('renders email as a link', () => {
    render(<UserCard user={mockUser} onViewDetails={vi.fn()} />);
    const emailLink = screen.getByRole('link', {
      name: /john.doe@example.com/i,
    });
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });

  it('has proper accessibility attributes', () => {
    render(<UserCard user={mockUser} onViewDetails={vi.fn()} />);
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-label', 'User card for John Doe');
  });
});
