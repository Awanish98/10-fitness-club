import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { EVENTS, FAQS, LIGHTBOX_IMAGES, type TrialPrefill } from '../data';
import { Lightbox, SampleNote, scrollToId } from '../ui';

interface CommunityProps {
  onRequestEvent: (title: string) => void;
}

export function CommunitySection({ onRequestEvent }: CommunityProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="community" className="section community-section" aria-labelledby="community-title">
      <div className="container">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">06 / Community</p>
            <h2 id="community-title">Good things happen after class.</h2>
          </div>
          <p className="section-lede">
            The club is as much about the people as the movement. Here are sample gatherings and a few
            snapshots of the atmosphere we are aiming for.
          </p>
        </div>

        <div className="event-grid">
          {EVENTS.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="event-image">
                <img src={event.image} alt={event.alt} width={event.width} height={event.height} loading="lazy" decoding="async" />
                <span className="event-tag">Sample event</span>
              </div>
              <div className="event-body">
                <p className="event-when"><CalendarDays size={15} aria-hidden="true" /> {event.when} · {event.time}</p>
                <h3>{event.title}</h3>
                <p>{event.blurb}</p>
                <button type="button" className="text-link" onClick={() => onRequestEvent(event.title)}>
                  Save my spot <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-block">
          <div className="gallery-intro">
            <h3>Inside the club</h3>
            <p>Open a photo for a larger view. Use the arrow keys or buttons to browse.</p>
          </div>
          <div className="gallery-grid">
            {LIGHTBOX_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`gallery-item gallery-item-${index + 1}`}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open sample photo ${index + 1} of ${LIGHTBOX_IMAGES.length}: ${image.caption}`}
              >
                <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
                <span>{image.caption}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="section-footnote"><SampleNote>Event dates and descriptions are illustrative samples, not a real calendar.</SampleNote></p>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={LIGHTBOX_IMAGES}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">07 / Good to know</p>
          <h2 id="faq-title">Questions, answered honestly.</h2>
          <p>These answers describe the demo. A real club should replace every sample detail with its own confirmed policy.</p>
          <a className="btn btn-outline btn-small" href="#trial" onClick={(event) => { event.preventDefault(); scrollToId('trial'); }}>
            Ask in the trial form <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="accordion">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="container contact-panel">
        <div className="contact-copy">
          <p className="eyebrow">08 / Contact</p>
          <h2 id="contact-title">Come say hello.</h2>
          <p>
            Everything below is a placeholder for this demo. No real club address, phone number or inbox is
            represented here.
          </p>
          <button type="button" className="btn btn-primary btn-large" onClick={() => scrollToId('trial')}>
            Request a trial session <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <dl className="contact-details">
          <div>
            <dt><MapPin size={18} aria-hidden="true" /> Studio address</dt>
            <dd>Sample studio address — replace with the client's verified location.</dd>
          </div>
          <div>
            <dt><Clock size={18} aria-hidden="true" /> Sample opening hours</dt>
            <dd>Mon–Fri, 07:00–20:00 · Sat, 08:00–14:00 · demo hours only</dd>
          </div>
          <div>
            <dt><Mail size={18} aria-hidden="true" /> Email placeholder</dt>
            <dd><a href="mailto:hello@example.com">hello@example.com</a> — replace with a client inbox</dd>
          </div>
          <div>
            <dt><MessageCircle size={18} aria-hidden="true" /> Messaging</dt>
            <dd>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demo WhatsApp link — replace with client number"
              >
                Demo WhatsApp link — replace with client number
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function Footer() {
  const explore = [
    { id: 'classes', label: 'Classes' },
    { id: 'coaches', label: 'Sample coaches' },
    { id: 'membership', label: 'Membership' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'community', label: 'Community' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-wordmark">pulse<span>.</span></p>
          <p>An optimistic community club concept — movement, conversation and a little room to breathe.</p>
          <p className="footer-demo"><SampleNote>Demo concept — sample information</SampleNote></p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>
            {explore.map((item) => (
              <li key={item.id}><a href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollToId(item.id); }}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="footer-visit">
          <h2>Visit &amp; contact</h2>
          <ul>
            <li><a href="#contact" onClick={(event) => { event.preventDefault(); scrollToId('contact'); }}>Contact details</a></li>
            <li><a href="#trial" onClick={(event) => { event.preventDefault(); scrollToId('trial'); }}>Trial request form</a></li>
            <li>
              <a
                href="https://wa.me/000000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demo WhatsApp link — replace with client number"
              >
                Demo WhatsApp link — replace with client number
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-note">
          <h2>Before launch</h2>
          <p>Replace sample prices, schedule times, coach names, event dates, address, email and WhatsApp number with client-approved details.</p>
          <button type="button" className="footer-top" onClick={() => scrollToId('home')}>Back to top <ArrowUpRight size={15} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} PULSE SOCIAL CLUB · Concept demo, not a real business</p>
        <p>All photography is local demo imagery; no fabricated reviews or credentials.</p>
      </div>
    </footer>
  );
}
