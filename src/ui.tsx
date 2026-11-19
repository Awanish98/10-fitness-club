import { useEffect, useRef, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

/** Anchor scrolling that respects the user's motion preference. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  className?: string;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

/** Small accessible dialog: Escape/backdrop close, Tab trap and focus restoration. */
export function Modal({ open, onClose, titleId, children, className = '', onArrowLeft, onArrowRight }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const callbacks = useRef({ onClose, onArrowLeft, onArrowRight });
  callbacks.current = { onClose, onArrowLeft, onArrowRight };

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        callbacks.current.onClose();
      } else if (event.key === 'ArrowLeft' && callbacks.current.onArrowLeft) {
        event.preventDefault();
        callbacks.current.onArrowLeft();
      } else if (event.key === 'ArrowRight' && callbacks.current.onArrowRight) {
        event.preventDefault();
        callbacks.current.onArrowRight();
      } else if (event.key === 'Tab') {
        const focusable = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        );
        if (focusable.length === 0) {
          event.preventDefault();
          panelRef.current?.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) callbacks.current.onClose();
      }}
    >
      <div
        ref={panelRef}
        className={`modal-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}

export interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const total = images.length;
  const current = images[index];
  const next = () => onIndexChange((index + 1) % total);
  const previous = () => onIndexChange((index - 1 + total) % total);

  return (
    <Modal
      open
      onClose={onClose}
      titleId="lightbox-title"
      className="lightbox-panel"
      onArrowLeft={previous}
      onArrowRight={next}
    >
      <h2 id="lightbox-title" className="sr-only">Photo gallery — use arrow keys to browse</h2>
      <div className="lightbox-frame">
        <img src={current.src} alt={current.alt} width={current.width} height={current.height} />
      </div>
      <div className="lightbox-bottom">
        <div>
          <p className="lightbox-caption">{current.caption}</p>
          <p className="lightbox-count">Photo {index + 1} of {total} · use ← → keys</p>
        </div>
        <div className="lightbox-buttons">
          <button type="button" onClick={previous} aria-label="Previous photo"><ArrowLeft size={18} aria-hidden="true" /> Prev</button>
          <button type="button" onClick={next} aria-label="Next photo">Next <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </Modal>
  );
}

/** Consistent inline disclosure for invented sample facts. */
export function SampleNote({ children }: { children: ReactNode }) {
  return <span className="sample-note">{children}</span>;
}
