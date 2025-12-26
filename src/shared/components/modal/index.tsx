import { type ReactNode, useEffect, useRef } from 'react';
import { trapFocus } from '../../utils/accessibility-utils';
import './modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  'aria-labelledby'?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  'aria-labelledby': ariaLabelledBy,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      const handleTab = (event: KeyboardEvent) => {
        if (modalRef.current && event.key === 'Tab') {
          trapFocus(modalRef.current, event);
        }
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';

      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;

      firstFocusable?.focus();

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = '';
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='modal-overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby={ariaLabelledBy || 'modal-title'}
    >
      <div className='modal-content' ref={modalRef}>
        <h2 id={ariaLabelledBy || 'modal-title'} className='modal-title'>
          {title}
        </h2>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
}
