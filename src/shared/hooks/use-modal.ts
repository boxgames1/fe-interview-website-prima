import { useEffect, useRef, useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const open = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    const handleTab = (event: KeyboardEvent) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as HTMLElement;

    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    modalRef,
  };
}
