import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserDetailModal } from './index';
import { type User } from '../../../../infrastructure/models/user-model';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'ADMIN',
  title: 'Software Engineer',
  team: 'Engineering',
  otherDetails: 'Some additional details about the user.',
};

describe('UserDetailModal', () => {
  it('renders when isOpen is true and user is provided', () => {
    render(<UserDetailModal user={mockUser} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('does not render when user is null', () => {
    render(<UserDetailModal user={null} isOpen={true} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays all user information', () => {
    render(<UserDetailModal user={mockUser} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/engineering/i)).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText(/some additional details/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<UserDetailModal user={mockUser} isOpen={true} onClose={handleClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders email as a link', () => {
    render(<UserDetailModal user={mockUser} isOpen={true} onClose={vi.fn()} />);
    const emailLink = screen.getByRole('link', { name: /john.doe@example.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });
});

