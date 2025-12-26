import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserGrid } from './index';
import { type User } from '../../../../infrastructure/models/user-model';
import { EmptyState } from '../empty-state';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    title: 'Software Engineer',
    team: 'Engineering',
    otherDetails: 'Details',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'EDITOR',
    title: 'Product Manager',
    team: 'Product',
    otherDetails: 'Details',
  },
];

describe('UserGrid', () => {
  it('renders user cards for each user', () => {
    render(<UserGrid users={mockUsers} onUserSelect={vi.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders empty state when no users', () => {
    render(<UserGrid users={[]} onUserSelect={vi.fn()} />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<UserGrid users={mockUsers} onUserSelect={vi.fn()} />);
    const list = screen.getByRole('list', { name: /user list/i });
    expect(list).toBeInTheDocument();
  });
});

