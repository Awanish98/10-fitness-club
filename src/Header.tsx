import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowUpRight, Menu, X } from 'lucide-react';
import { scrollToId } from './ui';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'classes', label: 'Classes' },
  { id: 'coaches', label: 'Coaches' },
  { id: 'membership', label: 'Membership' },
  { id: 'timetable', label: 'Timetable' },
  { id: 'community', label: 'Community' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    scrollToId(id);
  };

  return (
    <>
      <div className="demo-strip">
        <div className="container demo-strip-inner">
          <p>Demo concept — sample information throughout</p>
          <p>Times, prices, profiles &amp; contact details are placeholders</p>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner" ref={wrapRef}>
          <a className="brand" href="#home" onClick={(event) => goTo(event, 'home')} aria-label="Pulse Social Club — back to top">
            <span className="brand-mark" aria-hidden="true"><Activity size={22} strokeWidth={2.4} /></span>
            <span className="brand-text">
              <strong>pulse</strong>
              <small>social club</small>
            </span>
          </a>

          <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(event) => goTo(event, item.id)}>
                {item.label}
              </a>
            ))}
            <a className="nav-trial-mobile" href="#trial" onClick={(event) => goTo(event, 'trial')}>
              Request a trial
            </a>
          </nav>

          <div className="header-actions">
            <a className="btn btn-primary btn-small header-cta" href="#trial" onClick={(event) => goTo(event, 'trial')}>
              Book a trial <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="main-navigation"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
