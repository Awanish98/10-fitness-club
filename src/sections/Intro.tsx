import { useState } from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clock, Heart, Sparkles, Users } from 'lucide-react';
import { CLASSES, CLASS_TYPES, COACHES, type ClassType, type Coach } from '../data';
import { Modal, SampleNote, scrollToId } from '../ui';

interface IntroProps {
  onChooseType: (type: ClassType | 'All') => void;
}

function jumpToTimetable(type: ClassType | 'All', onChooseType: IntroProps['onChooseType']) {
  onChooseType(type);
  scrollToId('timetable');
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" /> A neighbourhood club for moving &amp; mingling</p>
          <h1 id="hero-title">Move together.<br /><em>Feel better.</em> Stay a while.</h1>
          <p className="hero-lede">
            Friendly group classes, mindful movement and people who save you a spot. PULSE SOCIAL CLUB is a
            demo of a warmer kind of fitness club — built around community, not personal bests.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-large" href="#trial" onClick={(event) => { event.preventDefault(); scrollToId('trial'); }}>
              Request a trial session <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn-quiet btn-large" href="#timetable" onClick={(event) => { event.preventDefault(); scrollToId('timetable'); }}>
              See the timetable
            </a>
          </div>
          <p className="hero-fineprint">
            <SampleNote>Demo schedule, sample prices and fictional coaches</SampleNote> · nothing is booked or charged.
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-blob" aria-hidden="true" />
          <div className="hero-photo-frame">
            <img
              src="images/hero.jpg"
              alt="Sample photo of a group fitness class in a bright studio"
              width={1800}
              height={2700}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="hero-inset">
            <img
              src="images/community.jpg"
              alt="Sample photo of members gathering at the club"
              width={1100}
              height={734}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="hero-float">
            <p className="hero-float-label">Today at the club <SampleNote>demo</SampleNote></p>
            <p><span>07:30</span> Morning Flow</p>
            <p><span>18:00</span> Rhythm Cycle</p>
            <button type="button" onClick={() => scrollToId('timetable')}>Full sample schedule <ArrowRight size={14} aria-hidden="true" /></button>
          </div>
          <div className="hero-seal" aria-hidden="true"><span>move</span><span>meet</span><span>repeat</span></div>
        </div>
      </div>
    </section>
  );
}

export function ValuesStrip() {
  const values = [
    { icon: Users, label: 'Small, friendly groups' },
    { icon: Heart, label: 'Every level welcome' },
    { icon: Sparkles, label: 'Movement that feels good' },
    { icon: CalendarDays, label: 'A rhythm that fits your week' },
  ];
  return (
    <div className="values-strip" aria-label="Club values">
      <div className="container values-inner">
        {values.map(({ icon: Icon, label }) => (
          <p key={label}><Icon size={19} aria-hidden="true" /> {label}</p>
        ))}
      </div>
    </div>
  );
}

export function ClassesSection({ onChooseType }: IntroProps) {
  return (
    <section id="classes" className="section classes-section" aria-labelledby="classes-title">
      <div className="container">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">01 / Classes</p>
            <h2 id="classes-title">Find your kind of moving.</h2>
          </div>
          <p className="section-lede">
            Five sample formats, all designed to be approachable. Pick what sounds good — the timetable below
            is where you can filter times and days.
          </p>
        </div>

        <div className="filter-intro">
          <span className="filter-intro-label">Jump to the timetable:</span>
          <div className="chip-row" role="group" aria-label="Filter the timetable by class type">
            <button type="button" className="chip" onClick={() => jumpToTimetable('All', onChooseType)}>All classes</button>
            {CLASS_TYPES.map((type) => (
              <button key={type} type="button" className="chip" onClick={() => jumpToTimetable(type, onChooseType)}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="class-grid">
          {CLASSES.map((item, index) => (
            <article className={`class-card class-card-${index + 1}`} key={item.id}>
              <div className="class-image">
                <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
                <span className={`type-pill type-${item.type.toLowerCase()}`}>{item.type}</span>
              </div>
              <div className="class-body">
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
                <div className="class-meta">
                  <span><Clock size={15} aria-hidden="true" /> {item.duration}</span>
                  <span><Users size={15} aria-hidden="true" /> {item.level}</span>
                </div>
                <button type="button" className="text-link" onClick={() => jumpToTimetable(item.type, onChooseType)}>
                  See sample dates <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="section-footnote"><SampleNote>Class descriptions and format names are sample content.</SampleNote></p>
      </div>
    </section>
  );
}

export function WhySection() {
  const items = [
    {
      icon: Users,
      title: 'Small by design',
      text: 'Groups stay intimate so a familiar face is never far away. No crowded floor, no waiting for a machine.',
    },
    {
      icon: Heart,
      title: 'Come exactly as you are',
      text: 'Every session offers a gentler option and a bigger challenge. You choose the version that fits today.',
    },
    {
      icon: Sparkles,
      title: 'The good part after class',
      text: 'We build in time to linger, ask questions and head out together. The chat is part of the club.',
    },
  ];
  return (
    <section id="why" className="section why-section" aria-labelledby="why-title">
      <div className="container why-grid">
        <div className="why-copy">
          <p className="eyebrow">The club difference</p>
          <h2 id="why-title">A club, not a checkbox.</h2>
          <p>
            Fitness can feel like a solo sport. This demo flips it: welcoming rooms, unhurried coaching and
            a timetable that leaves space for real life.
          </p>
          <div className="why-figures">
            <div><strong>5</strong><span>sample formats</span></div>
            <div><strong>20</strong><span>sample sessions / week</span></div>
            <div><strong>3</strong><span>fictional coach profiles</span></div>
          </div>
          <p className="why-disclaimer"><SampleNote>Illustrative sample figures — not real club statistics.</SampleNote></p>
        </div>
        <div className="why-cards">
          {items.map(({ icon: Icon, title, text }) => (
            <article key={title} className="why-card">
              <span className="why-icon"><Icon size={20} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CoachesSection() {
  const [selected, setSelected] = useState<Coach | null>(null);

  return (
    <section id="coaches" className="section coaches-section" aria-labelledby="coaches-title">
      <div className="container">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">02 / Coaches</p>
            <h2 id="coaches-title">Faces you would recognise.</h2>
          </div>
          <p className="section-lede">
            Meet the fictional profiles used to populate this demo. Select a card for a short sample bio —
            every name and background here is invented.
          </p>
        </div>

        <div className="coach-grid">
          {COACHES.map((coach) => (
            <article className="coach-card" key={coach.id}>
              <div className="coach-photo">
                <img src={coach.image} alt={coach.alt} width={coach.width} height={coach.height} loading="lazy" decoding="async" />
                <SampleNote>Sample profile</SampleNote>
              </div>
              <div className="coach-body">
                <h3>{coach.name}</h3>
                <p className="coach-role">{coach.role}</p>
                <p className="coach-short">{coach.short}</p>
                <button type="button" className="btn btn-outline btn-small" onClick={() => setSelected(coach)}>
                  View sample profile <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="section-footnote"><SampleNote>No real instructor identities, qualifications or credentials are represented.</SampleNote></p>
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} titleId="coach-dialog-title" className="coach-modal">
        {selected && (
          <>
            <div className="coach-modal-image">
              <img src={selected.image} alt={selected.alt} width={selected.width} height={selected.height} />
            </div>
            <div className="coach-modal-body">
              <p className="eyebrow">Sample coach profile</p>
              <h2 id="coach-dialog-title">{selected.name}</h2>
              <p className="coach-role">{selected.role}</p>
              <p>{selected.bio}</p>
              <h3>In this sample schedule</h3>
              <ul className="tick-list">
                {selected.favorites.map((item) => <li key={item}><Check size={16} aria-hidden="true" /> {item}</li>)}
              </ul>
              <button type="button" className="btn btn-primary btn-small" onClick={() => { setSelected(null); scrollToId('trial'); }}>
                Request a trial session <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
