import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, CalendarDays, Check, Clock, Info, Users } from 'lucide-react';
import {
  CLASS_TYPES,
  COMPARISON_ROWS,
  DAYS,
  PLANS,
  SESSIONS,
  type ClassType,
  type DayIndex,
  type Session,
  type TrialPrefill,
} from '../data';
import { SampleNote, scrollToId } from '../ui';

type DayFilter = DayIndex | 'all';
type TimetableView = 'cards' | 'compact';

export function MembershipSection() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [months, setMonths] = useState(3);
  const [estimatePlanId, setEstimatePlanId] = useState('community');
  const estimatePlan = PLANS.find((plan) => plan.id === estimatePlanId) ?? PLANS[1];
  const estimateTotal = estimatePlan.monthlyRate * months;

  return (
    <section id="membership" className="section membership-section" aria-labelledby="membership-title">
      <div className="container">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">03 / Membership</p>
            <h2 id="membership-title">Pick a rhythm, not a contract.</h2>
          </div>
          <p className="section-lede">
            Three illustrative ways to take part. All rates are sample placeholders — real pricing and terms
            need client approval before launch.
          </p>
        </div>

        <div className="billing-toggle" role="group" aria-label="Sample billing view">
          <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Monthly view</button>
          <button type="button" aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>Annual view</button>
          <p><SampleNote>Illustrative only — no payment is taken</SampleNote></p>
        </div>

        <div className="plan-grid">
          {PLANS.map((plan) => (
            <article className={`plan-card ${plan.badge ? 'plan-featured' : ''}`} key={plan.id}>
              {plan.badge && <p className="plan-badge">{plan.badge}</p>}
              <h3>{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>
              <p className="plan-price">
                <strong>{billing === 'monthly' ? `$${plan.monthlyRate}` : `$${plan.monthlyRate * 10}`}</strong>
                <span>{billing === 'monthly' ? '/ month' : '/ year'}</span>
              </p>
              <p className="plan-rate-note">
                <SampleNote>Sample rate</SampleNote>
                {billing === 'annual' && ` · ${plan.monthlyRate} × 10 months shown`}
              </p>
              <ul className="tick-list">
                {plan.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" /> {feature}</li>)}
              </ul>
              <button
                type="button"
                className={`btn ${plan.badge ? 'btn-primary' : 'btn-outline'} btn-full`}
                onClick={() => scrollToId('trial')}
              >
                {plan.cta} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <div className="compare-and-estimate">
          <div className="compare-wrap">
            <h3>Side-by-side sample comparison</h3>
            <div className="table-scroll" role="region" aria-label="Membership feature comparison, sample values" tabIndex={0}>
              <table className="compare-table">
                <caption>Sample comparison — confirm all features and rates with the client.</caption>
                <thead>
                  <tr>
                    <th scope="col">What is included</th>
                    {PLANS.map((plan) => <th scope="col" key={plan.id}>{plan.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => <td key={`${row.label}-${index}`}>{value}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="estimator">
            <h3>Sample cost estimator</h3>
            <p>Uses the clearly labelled sample monthly rate. No payment is calculated or taken.</p>
            <label htmlFor="estimate-plan">Plan (sample rate)</label>
            <select id="estimate-plan" value={estimatePlanId} onChange={(event) => setEstimatePlanId(event.target.value)}>
              {PLANS.map((plan) => <option key={plan.id} value={plan.id}>{plan.name} — ${plan.monthlyRate}/mo</option>)}
            </select>
            <label htmlFor="estimate-months">Number of months (sample term)</label>
            <input
              id="estimate-months"
              type="number"
              min={1}
              max={12}
              value={months}
              onChange={(event) => {
                const parsed = Number(event.target.value);
                setMonths(Number.isFinite(parsed) ? Math.min(12, Math.max(1, Math.round(parsed))) : 1);
              }}
            />
            <p className="formula">
              Formula: ${estimatePlan.monthlyRate} × {months} {months === 1 ? 'month' : 'months'}
            </p>
            <output className="estimate-output" aria-live="polite">${estimateTotal} sample total</output>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimetableProps {
  typeFilter: ClassType | 'All';
  dayFilter: DayFilter;
  view: TimetableView;
  onTypeChange: (type: ClassType | 'All') => void;
  onDayChange: (day: DayFilter) => void;
  onViewChange: (view: TimetableView) => void;
  onRequestSession: (session: Session) => void;
}

export function TimetableSection({ typeFilter, dayFilter, view, onTypeChange, onDayChange, onViewChange, onRequestSession }: TimetableProps) {
  const dayTabs: { value: DayFilter; short: string; long: string }[] = [
    { value: 'all', short: 'All week', long: 'All week' },
    ...DAYS.map((day) => ({ value: day.index as DayFilter, short: day.short, long: day.long })),
  ];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filtered = useMemo(
    () => SESSIONS
      .filter((session) => typeFilter === 'All' || session.type === typeFilter)
      .filter((session) => dayFilter === 'all' || session.day === dayFilter)
      .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time)),
    [typeFilter, dayFilter],
  );

  const grouped = useMemo(
    () => DAYS
      .map((day) => ({ day, sessions: filtered.filter((session) => session.day === day.index) }))
      .filter((group) => group.sessions.length > 0),
    [filtered],
  );

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % dayTabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + dayTabs.length) % dayTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = dayTabs.length - 1;
    else return;
    event.preventDefault();
    onDayChange(dayTabs[next].value);
    tabRefs.current[next]?.focus();
  };

  const clearFilters = () => {
    onTypeChange('All');
    onDayChange('all');
  };

  return (
    <section id="timetable" className="section timetable-section" aria-labelledby="timetable-title">
      <div className="container">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">04 / Timetable</p>
            <h2 id="timetable-title">Your week, at a glance.</h2>
          </div>
          <p className="section-lede">
            Filter by day and format, then switch between a detailed card view and a compact list.
            <SampleNote> Demo timetable — all times, rooms, coaches and places are sample data.</SampleNote>
          </p>
        </div>

        <div className="timetable-controls">
          <div className="day-tabs" role="tablist" aria-label="Filter timetable by day" onKeyDown={(event) => handleTabKeyDown(event, dayTabs.findIndex((tab) => tab.value === dayFilter))}>
            {dayTabs.map((tab, index) => (
              <button
                key={String(tab.value)}
                ref={(element) => { tabRefs.current[index] = element; }}
                type="button"
                role="tab"
                id={`day-tab-${index}`}
                aria-controls="timetable-panel"
                aria-selected={dayFilter === tab.value}
                className={`day-tab ${dayFilter === tab.value ? 'is-selected' : ''}`}
                tabIndex={dayFilter === tab.value ? 0 : -1}
                onClick={() => onDayChange(tab.value)}
              >
                <span>{tab.short}</span>
              </button>
            ))}
          </div>

          <div className="timetable-secondary">
            <div className="chip-row" role="group" aria-label="Filter timetable by class type">
              <button type="button" className={`chip ${typeFilter === 'All' ? 'is-selected' : ''}`} aria-pressed={typeFilter === 'All'} onClick={() => onTypeChange('All')}>All formats</button>
              {CLASS_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`chip ${typeFilter === type ? 'is-selected' : ''}`}
                  aria-pressed={typeFilter === type}
                  onClick={() => onTypeChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="view-toggle" role="group" aria-label="Timetable view">
              <button type="button" aria-pressed={view === 'cards'} className={view === 'cards' ? 'is-selected' : ''} onClick={() => onViewChange('cards')}>Cards</button>
              <button type="button" aria-pressed={view === 'compact'} className={view === 'compact' ? 'is-selected' : ''} onClick={() => onViewChange('compact')}>Compact</button>
            </div>
          </div>
        </div>

        <div
          id="timetable-panel"
          role="tabpanel"
          aria-labelledby={`day-tab-${dayTabs.findIndex((tab) => tab.value === dayFilter)}`}
          className="timetable-panel"
        >
          <p className="results-line" aria-live="polite">
            Showing {filtered.length} sample {filtered.length === 1 ? 'session' : 'sessions'}
            {typeFilter !== 'All' && ` · ${typeFilter}`}
            {dayFilter !== 'all' && ` · ${DAYS.find((day) => day.index === dayFilter)?.long}`}
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <CalendarDays size={28} aria-hidden="true" />
              <h3>No sample sessions match this combination</h3>
              <p>Try a different day or format — the sample schedule has quieter days.</p>
              <button type="button" className="btn btn-outline btn-small" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : view === 'cards' ? (
            <div className="day-groups">
              {grouped.map(({ day, sessions }) => (
                <div className="day-group" key={day.index}>
                  <h3><span>{day.short}</span> {day.long}</h3>
                  <div className="session-list">
                    {sessions.map((session) => (
                      <article className="session-card" key={session.id}>
                        <div className="session-time"><strong>{session.time}</strong><span>{session.duration}</span></div>
                        <div className="session-main">
                          <p className="session-type"><span className={`dot dot-${session.type.toLowerCase()}`} aria-hidden="true" />{session.type}</p>
                          <h4>{session.title}</h4>
                          <p className="session-meta"><Users size={14} aria-hidden="true" /> {session.coach} · {session.room}</p>
                        </div>
                        <div className="session-side">
                          <p className="places"><SampleNote>{session.places} sample places</SampleNote></p>
                          <div className="places-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, session.places * 7)}%` }} /></div>
                          <button type="button" className="text-link" onClick={() => onRequestSession(session)}>
                            Request this class <ArrowRight size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="table-scroll" role="region" aria-label="Compact sample timetable" tabIndex={0}>
              <table className="compact-table">
                <caption>Compact sample timetable — no live availability</caption>
                <thead>
                  <tr><th scope="col">Day</th><th scope="col">Time</th><th scope="col">Class</th><th scope="col">Format</th><th scope="col">Coach</th><th scope="col">Sample places</th><th scope="col"><span className="sr-only">Action</span></th></tr>
                </thead>
                <tbody>
                  {filtered.map((session) => (
                    <tr key={session.id}>
                      <td>{DAYS.find((day) => day.index === session.day)?.short}</td>
                      <td><strong>{session.time}</strong></td>
                      <td>{session.title}</td>
                      <td>{session.type}</td>
                      <td>{session.coach}</td>
                      <td>{session.places}</td>
                      <td><button type="button" className="text-link" onClick={() => onRequestSession(session)}>Request <ArrowRight size={14} aria-hidden="true" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface FieldValues {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  day: string;
  timeWindow: string;
  startDate: string;
  notes: string;
  consent: boolean;
}

type FieldName = keyof FieldValues;

const EMPTY_VALUES: FieldValues = {
  fullName: '',
  email: '',
  phone: '',
  interest: '',
  day: 'Any day',
  timeWindow: '',
  startDate: '',
  notes: '',
  consent: false,
};

const DEMO_SUCCESS = 'Demo enquiry received — no real booking/payment is made. Replace this demo flow with your client\'s confirmed process before launch.';

interface TrialFormProps {
  prefill: TrialPrefill | null;
}

export function TrialFormSection({ prefill }: TrialFormProps) {
  const [values, setValues] = useState<FieldValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<FieldValues>(EMPTY_VALUES);
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>>({});
  const [minDate] = useState(() => new Date(Date.now() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 10));

  useEffect(() => {
    if (!prefill) return;
    setValues((current) => ({ ...current, interest: prefill.interest, notes: prefill.note }));
    setSubmitted(false);
  }, [prefill]);

  const validate = (all: FieldValues) => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!all.fullName.trim()) next.fullName = 'Please enter your name.';
    if (!all.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(all.email.trim())) next.email = 'Enter a valid email address, for example name@example.com.';
    if (all.phone.trim() && !/^[+()\-\s\d]{7,20}$/.test(all.phone.trim())) next.phone = 'Use 7–20 digits, spaces or + ( ) - only.';
    if (!all.interest) next.interest = 'Choose a class format.';
    if (!all.timeWindow) next.timeWindow = 'Choose a preferred time.';
    if (!all.startDate) next.startDate = 'Choose a preferred start date.';
    else if (all.startDate < minDate) next.startDate = 'Choose today or a later date.';
    if (!all.consent) next.consent = 'Please confirm you understand this is a demo request.';
    return next;
  };

  const setField = <K extends FieldName>(field: K, value: FieldValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      const updated = { ...values, [field]: value };
      setErrors((current) => ({ ...current, [field]: validate(updated)[field] }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setErrors((current) => ({ ...current, [field]: validate(values)[field] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(EMPTY_VALUES) as FieldName[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setSubmittedValues(values);
    setSubmitted(true);
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSubmitted(false);
    fieldRefs.current.fullName?.focus();
  };

  const fieldClass = (field: FieldName) => `field ${errors[field] ? 'has-error' : ''}`;
  const described = (field: FieldName) => errors[field] ? `${field}-error` : undefined;

  return (
    <section id="trial" className="section trial-section" aria-labelledby="trial-title">
      <div className="container trial-grid">
        <div className="trial-copy">
          <p className="eyebrow">05 / Try it out</p>
          <h2 id="trial-title">Come once. See if it feels like yours.</h2>
          <p>
            Tell us what sounds good and we will show you a demo confirmation. This form is a front-end
            prototype only: it never sends, stores or books anything.
          </p>
          <ul className="tick-list trial-points">
            <li><Check size={16} aria-hidden="true" /> No payment details, no account, no commitment</li>
            <li><Check size={16} aria-hidden="true" /> Pick a format, day and time that suit you</li>
            <li><Check size={16} aria-hidden="true" /> Clearly labelled sample availability throughout</li>
          </ul>
          <p className="trial-what"><Info size={16} aria-hidden="true" /> A real club would connect this to its confirmed booking process.</p>
        </div>

        <div className="trial-card">
          {submitted ? (
            <div className="success-panel" role="status">
              <span className="success-icon"><Check size={26} aria-hidden="true" /></span>
              <h3>Demo confirmation</h3>
              <p className="success-verbatim">{DEMO_SUCCESS}</p>
              <div className="success-summary">
                <h4>Your sample request</h4>
                <dl>
                  <div><dt>Name</dt><dd>{submittedValues.fullName}</dd></div>
                  <div><dt>Email</dt><dd>{submittedValues.email}</dd></div>
                  <div><dt>Format</dt><dd>{submittedValues.interest}</dd></div>
                  <div><dt>Day</dt><dd>{submittedValues.day}</dd></div>
                  <div><dt>Start date</dt><dd>{submittedValues.startDate}</dd></div>
                </dl>
              </div>
              <p className="success-caveat">Nothing was transmitted. These details stay in this browser session only.</p>
              <button type="button" className="btn btn-primary btn-small" onClick={reset}>Send another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-heading">
                <h3>Request a trial session</h3>
                <p><SampleNote>Demo form — no data is sent</SampleNote></p>
              </div>
              <div className="form-row">
                <div className={fieldClass('fullName')}>
                  <label htmlFor="fullName">Your name <span aria-hidden="true">*</span></label>
                  <input
                    id="fullName"
                    ref={(element) => { fieldRefs.current.fullName = element ?? undefined; }}
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={(event) => setField('fullName', event.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={described('fullName')}
                    required
                  />
                  {errors.fullName && <span id="fullName-error" className="field-error" role="alert">{errors.fullName}</span>}
                </div>
                <div className={fieldClass('email')}>
                  <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                  <input
                    id="email"
                    ref={(element) => { fieldRefs.current.email = element ?? undefined; }}
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => setField('email', event.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={described('email')}
                    required
                  />
                  {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className={fieldClass('phone')}>
                  <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
                  <input
                    id="phone"
                    ref={(element) => { fieldRefs.current.phone = element ?? undefined; }}
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(event) => setField('phone', event.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={described('phone')}
                  />
                  {errors.phone && <span id="phone-error" className="field-error" role="alert">{errors.phone}</span>}
                </div>
                <div className={fieldClass('interest')}>
                  <label htmlFor="interest">Class format <span aria-hidden="true">*</span></label>
                  <select
                    id="interest"
                    ref={(element) => { fieldRefs.current.interest = element ?? undefined; }}
                    value={values.interest}
                    onChange={(event) => setField('interest', event.target.value)}
                    onBlur={() => handleBlur('interest')}
                    aria-invalid={Boolean(errors.interest)}
                    aria-describedby={described('interest')}
                    required
                  >
                    <option value="">Choose a format</option>
                    {CLASS_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                  {errors.interest && <span id="interest-error" className="field-error" role="alert">{errors.interest}</span>}
                </div>
              </div>
              <div className="form-row form-row-three">
                <div className={fieldClass('day')}>
                  <label htmlFor="day">Preferred day</label>
                  <select
                    id="day"
                    ref={(element) => { fieldRefs.current.day = element ?? undefined; }}
                    value={values.day}
                    onChange={(event) => setField('day', event.target.value)}
                    onBlur={() => handleBlur('day')}
                  >
                    <option>Any day</option>
                    {DAYS.map((day) => <option key={day.index} value={day.long}>{day.long}</option>)}
                  </select>
                </div>
                <div className={fieldClass('timeWindow')}>
                  <label htmlFor="timeWindow">Preferred time <span aria-hidden="true">*</span></label>
                  <select
                    id="timeWindow"
                    ref={(element) => { fieldRefs.current.timeWindow = element ?? undefined; }}
                    value={values.timeWindow}
                    onChange={(event) => setField('timeWindow', event.target.value)}
                    onBlur={() => handleBlur('timeWindow')}
                    aria-invalid={Boolean(errors.timeWindow)}
                    aria-describedby={described('timeWindow')}
                    required
                  >
                    <option value="">Choose a time</option>
                    <option>Morning — before 12:00</option>
                    <option>Lunchtime</option>
                    <option>Evening — after 17:00</option>
                    <option>Weekend</option>
                  </select>
                  {errors.timeWindow && <span id="timeWindow-error" className="field-error" role="alert">{errors.timeWindow}</span>}
                </div>
                <div className={fieldClass('startDate')}>
                  <label htmlFor="startDate">Preferred start date <span aria-hidden="true">*</span></label>
                  <input
                    id="startDate"
                    ref={(element) => { fieldRefs.current.startDate = element ?? undefined; }}
                    type="date"
                    min={minDate}
                    value={values.startDate}
                    onChange={(event) => setField('startDate', event.target.value)}
                    onBlur={() => handleBlur('startDate')}
                    aria-invalid={Boolean(errors.startDate)}
                    aria-describedby={described('startDate')}
                    required
                  />
                  {errors.startDate && <span id="startDate-error" className="field-error" role="alert">{errors.startDate}</span>}
                </div>
              </div>
              <div className={fieldClass('notes')}>
                <label htmlFor="notes">Anything else? <span className="optional">(optional)</span></label>
                <textarea
                  id="notes"
                  ref={(element) => { fieldRefs.current.notes = element ?? undefined; }}
                  rows={3}
                  value={values.notes}
                  onChange={(event) => setField('notes', event.target.value)}
                  onBlur={() => handleBlur('notes')}
                  placeholder="Questions, accessibility needs, or a class you spotted in the sample timetable."
                />
              </div>
              <div className={`consent ${errors.consent ? 'has-error' : ''}`}>
                <input
                  id="consent"
                  ref={(element) => { fieldRefs.current.consent = element ?? undefined; }}
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => setField('consent', event.target.checked)}
                  onBlur={() => handleBlur('consent')}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  required
                />
                <label htmlFor="consent">I understand this is a demo request and no booking or payment is made.</label>
                {errors.consent && <span id="consent-error" className="field-error" role="alert">{errors.consent}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-large btn-full">Send demo request <ArrowRight size={18} aria-hidden="true" /></button>
              <p className="form-footnote"><Clock size={14} aria-hidden="true" /> Sample form only — nothing leaves your browser.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
