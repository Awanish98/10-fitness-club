import { useState } from 'react';
import { Header } from './Header';
import { DAYS, type ClassType, type DayIndex, type Session, type TrialPrefill } from './data';
import { ClassesSection, CoachesSection, Hero, ValuesStrip, WhySection } from './sections/Intro';
import { MembershipSection, TimetableSection, TrialFormSection } from './sections/Plan';
import { CommunitySection, ContactSection, FAQSection, Footer } from './sections/Community';
import { scrollToId } from './ui';

export default function App() {
  const [typeFilter, setTypeFilter] = useState<ClassType | 'All'>('All');
  const [dayFilter, setDayFilter] = useState<DayIndex | 'all'>('all');
  const [view, setView] = useState<'cards' | 'compact'>('cards');
  const [trialPrefill, setTrialPrefill] = useState<TrialPrefill | null>(null);

  const requestSession = (session: Session) => {
    const day = DAYS.find((item) => item.index === session.day)?.long ?? '';
    setTrialPrefill({
      interest: session.type,
      note: `Interested in ${session.title} — sample session on ${day} at ${session.time}.`,
      source: 'timetable',
    });
    scrollToId('trial');
  };

  const requestEvent = (title: string) => {
    setTrialPrefill({ interest: 'Social', note: `Interested in the sample event: ${title}.`, source: 'community' });
    scrollToId('trial');
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ValuesStrip />
        <ClassesSection onChooseType={setTypeFilter} />
        <WhySection />
        <CoachesSection />
        <MembershipSection />
        <TimetableSection
          typeFilter={typeFilter}
          dayFilter={dayFilter}
          view={view}
          onTypeChange={setTypeFilter}
          onDayChange={setDayFilter}
          onViewChange={setView}
          onRequestSession={requestSession}
        />
        <TrialFormSection prefill={trialPrefill} />
        <CommunitySection onRequestEvent={requestEvent} />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
