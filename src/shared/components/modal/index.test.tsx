import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './index';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title='Test Modal'>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title='Test Modal'>
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking outside', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen={true} onClose={handleClose} title='Test Modal'>
        <p>Modal content</p>
      </Modal>,
    );

    const overlay = screen.getByRole('dialog').parentElement;
    if (overlay) {
      await user.click(overlay);
      expect(handleClose).toHaveBeenCalled();
    }
  });

  it('has proper ARIA attributes', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title='Test Modal'>
        <p>Modal content</p>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });
});
