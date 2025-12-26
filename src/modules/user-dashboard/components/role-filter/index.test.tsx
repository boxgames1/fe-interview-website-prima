import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RoleFilter } from './index';

describe('RoleFilter', () => {
  it('renders all role filter buttons', () => {
    render(<RoleFilter selectedRole={null} onRoleSelect={vi.fn()} />);
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editor/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /viewer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guest/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /owner/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /inactive/i })).toBeInTheDocument();
  });

  it('calls onRoleSelect when a role button is clicked', async () => {
    const handleRoleSelect = vi.fn();
    const user = userEvent.setup();
    render(<RoleFilter selectedRole={null} onRoleSelect={handleRoleSelect} />);

    const adminButton = screen.getByRole('button', { name: /admin/i });
    await user.click(adminButton);
    expect(handleRoleSelect).toHaveBeenCalledWith('ADMIN');
  });

  it('deselects role when clicking the same role again', async () => {
    const handleRoleSelect = vi.fn();
    const user = userEvent.setup();
    render(<RoleFilter selectedRole="ADMIN" onRoleSelect={handleRoleSelect} />);

    const adminButton = screen.getByRole('button', { name: /admin/i });
    await user.click(adminButton);
    expect(handleRoleSelect).toHaveBeenCalledWith(null);
  });

  it('shows active state for selected role', () => {
    render(<RoleFilter selectedRole="ADMIN" onRoleSelect={vi.fn()} />);
    const adminButton = screen.getByRole('button', { name: /admin/i });
    expect(adminButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('has proper accessibility attributes', () => {
    render(<RoleFilter selectedRole={null} onRoleSelect={vi.fn()} />);
    const group = screen.getByRole('group', { name: /filter users by role/i });
    expect(group).toBeInTheDocument();
  });
});

