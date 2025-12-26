import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--primary');
  });

  it('applies secondary variant when specified', () => {
    render(<Button variant='secondary'>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--secondary');
  });

  it('supports aria-label', () => {
    render(<Button aria-label='Close dialog'>×</Button>);
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });
});
