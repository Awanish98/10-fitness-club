// All data in this file is illustrative sample content for the PULSE SOCIAL CLUB demo.
// Names, prices, times, availability and profiles are fictional and must be replaced.

export type ClassType = 'Yoga' | 'Cycle' | 'Mindful' | 'Strength' | 'Social';
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TrialPrefill {
  interest: ClassType;
  note: string;
  source: string;
}

export const CLASS_TYPES: ClassType[] = ['Yoga', 'Cycle', 'Mindful', 'Strength', 'Social'];

export const DAYS: { index: DayIndex; short: string; long: string }[] = [
  { index: 0, short: 'Mon', long: 'Monday' },
  { index: 1, short: 'Tue', long: 'Tuesday' },
  { index: 2, short: 'Wed', long: 'Wednesday' },
  { index: 3, short: 'Thu', long: 'Thursday' },
  { index: 4, short: 'Fri', long: 'Friday' },
  { index: 5, short: 'Sat', long: 'Saturday' },
  { index: 6, short: 'Sun', long: 'Sunday' },
];

export interface ClassInfo {
  id: string;
  type: ClassType;
  title: string;
  blurb: string;
  duration: string;
  level: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const CLASSES: ClassInfo[] = [
  {
    id: 'flow-yoga',
    type: 'Yoga',
    title: 'Flow & Breathe Yoga',
    blurb: 'A gentle, unhurried flow that leaves room to chat, pause and try things at your own pace.',
    duration: '50 min',
    level: 'All levels',
    image: 'images/class-yoga.jpg',
    alt: 'Sample photo representing a small-group yoga class',
    width: 1100,
    height: 733,
  },
  {
    id: 'rhythm-cycle',
    type: 'Cycle',
    title: 'Rhythm Cycle',
    blurb: 'Music-led indoor cycling with a friendly finish line. Bring water, leave with a playlist.',
    duration: '45 min',
    level: 'All levels',
    image: 'images/class-cycle.jpg',
    alt: 'Sample photo representing an indoor cycling class',
    width: 1100,
    height: 733,
  },
  {
    id: 'mindful-reset',
    type: 'Mindful',
    title: 'Mindful Reset',
    blurb: 'Slow movement, breathing and a quiet moment to reset before the rest of your day.',
    duration: '40 min',
    level: 'Beginner friendly',
    image: 'images/class-mindful.jpg',
    alt: 'Sample photo representing a mindful movement session',
    width: 1100,
    height: 1279,
  },
  {
    id: 'strength-stretch',
    type: 'Strength',
    title: 'Strength & Stretch',
    blurb: 'Simple, supportive strength work in good company, followed by a proper cool-down.',
    duration: '55 min',
    level: 'All levels',
    image: 'images/studio.jpg',
    alt: 'Sample photo of an open studio space used for strength sessions',
    width: 1100,
    height: 733,
  },
];

export interface Session {
  id: string;
  day: DayIndex;
  time: string;
  title: string;
  type: ClassType;
  coach: string;
  duration: string;
  places: number;
  room: string;
}

// "places" is demo availability, not live capacity.
export const SESSIONS: Session[] = [
  { id: 's1', day: 0, time: '07:30', title: 'Morning Flow', type: 'Yoga', coach: 'Maya (sample)', duration: '50 min', places: 6, room: 'Studio 1' },
  { id: 's2', day: 0, time: '12:15', title: 'Lunchtime Reset', type: 'Mindful', coach: 'Priya (sample)', duration: '40 min', places: 9, room: 'Studio 2' },
  { id: 's3', day: 0, time: '18:00', title: 'Rhythm Cycle', type: 'Cycle', coach: 'Leo (sample)', duration: '45 min', places: 4, room: 'Cycle room' },
  { id: 's4', day: 1, time: '08:00', title: 'Strength & Stretch', type: 'Strength', coach: 'Leo (sample)', duration: '55 min', places: 7, room: 'Studio 1' },
  { id: 's5', day: 1, time: '18:30', title: 'Flow & Breathe', type: 'Yoga', coach: 'Maya (sample)', duration: '50 min', places: 5, room: 'Studio 2' },
  { id: 's6', day: 1, time: '19:30', title: 'Community Walk Club', type: 'Social', coach: 'Host (sample)', duration: '45 min', places: 12, room: 'Meet at desk' },
  { id: 's7', day: 2, time: '07:30', title: 'Rhythm Cycle', type: 'Cycle', coach: 'Leo (sample)', duration: '45 min', places: 8, room: 'Cycle room' },
  { id: 's8', day: 2, time: '12:15', title: 'Mindful Reset', type: 'Mindful', coach: 'Priya (sample)', duration: '40 min', places: 10, room: 'Studio 2' },
  { id: 's9', day: 2, time: '18:00', title: 'Strength & Stretch', type: 'Strength', coach: 'Leo (sample)', duration: '55 min', places: 3, room: 'Studio 1' },
  { id: 's10', day: 3, time: '08:00', title: 'Morning Flow', type: 'Yoga', coach: 'Maya (sample)', duration: '50 min', places: 6, room: 'Studio 1' },
  { id: 's11', day: 3, time: '17:45', title: 'Rhythm Cycle', type: 'Cycle', coach: 'Leo (sample)', duration: '45 min', places: 5, room: 'Cycle room' },
  { id: 's12', day: 3, time: '19:00', title: 'Social Stretch & Tea', type: 'Social', coach: 'Host (sample)', duration: '45 min', places: 8, room: 'Lounge' },
  { id: 's13', day: 4, time: '07:30', title: 'Mindful Reset', type: 'Mindful', coach: 'Priya (sample)', duration: '40 min', places: 9, room: 'Studio 2' },
  { id: 's14', day: 4, time: '12:15', title: 'Lunchtime Cycle', type: 'Cycle', coach: 'Leo (sample)', duration: '45 min', places: 7, room: 'Cycle room' },
  { id: 's15', day: 4, time: '18:30', title: 'Flow & Breathe', type: 'Yoga', coach: 'Maya (sample)', duration: '50 min', places: 4, room: 'Studio 1' },
  { id: 's16', day: 5, time: '09:00', title: 'Weekend Long Flow', type: 'Yoga', coach: 'Maya (sample)', duration: '70 min', places: 6, room: 'Studio 1' },
  { id: 's17', day: 5, time: '10:30', title: 'Bring-a-friend Cycle', type: 'Cycle', coach: 'Leo (sample)', duration: '45 min', places: 10, room: 'Cycle room' },
  { id: 's18', day: 5, time: '12:00', title: 'Coffee & Community', type: 'Social', coach: 'Host (sample)', duration: '60 min', places: 14, room: 'Lounge' },
  { id: 's19', day: 6, time: '09:30', title: 'Slow Sunday', type: 'Mindful', coach: 'Priya (sample)', duration: '50 min', places: 8, room: 'Studio 2' },
  { id: 's20', day: 6, time: '17:00', title: 'Sunday Social Walk', type: 'Social', coach: 'Host (sample)', duration: '45 min', places: 12, room: 'Meet at desk' },
];

export interface Coach {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  short: string;
  bio: string;
  favorites: string[];
}

export const COACHES: Coach[] = [
  {
    id: 'coach-1',
    name: 'Maya Chen',
    role: 'Yoga & flow · sample profile',
    image: 'images/coach-1.jpg',
    alt: 'Sample portrait used for a fictional yoga coach profile',
    width: 900,
    height: 600,
    short: 'Calm, clear cues and space to make each pose your own.',
    bio: 'In this sample profile, Maya is the friendly face behind our morning flows. Expect unhurried sequences, plain-language guidance and an invitation to move at your own pace. This is a fictional identity created for the demo — no real instructor is represented.',
    favorites: ['Morning Flow', 'Weekend Long Flow', 'Beginner welcome'],
  },
  {
    id: 'coach-2',
    name: 'Leo Alvarez',
    role: 'Cycle & strength · sample profile',
    image: 'images/coach-2.jpg',
    alt: 'Sample portrait used for a fictional cycle and strength coach profile',
    width: 900,
    height: 601,
    short: 'Upbeat sessions with a zero-pressure finish line.',
    bio: 'This fictional sample profile places Leo on the bike and on the studio floor. His demo sessions focus on good form, well-chosen playlists and plenty of encouragement. Replace this profile with a real, client-approved coach biography before launch.',
    favorites: ['Rhythm Cycle', 'Strength & Stretch', 'Music-led'],
  },
  {
    id: 'coach-3',
    name: 'Priya Raman',
    role: 'Mindful movement · sample profile',
    image: 'images/coach-3.jpg',
    alt: 'Sample portrait used for a fictional mindful movement coach profile',
    width: 1100,
    height: 735,
    short: 'Gentle movement and a few quiet minutes that stay with you.',
    bio: 'Priya is a fictional sample profile for our mindful movement offering. The demo classes blend slow mobility, breathing and a short wind-down. No qualifications or real-world credentials are implied — supply verified details when the site goes live.',
    favorites: ['Mindful Reset', 'Slow Sunday', 'Breathwork basics'],
  },
];

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthlyRate: number;
  badge?: string;
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: 'drop-in',
    name: 'Drop-in',
    tagline: 'Try a class, no commitment.',
    monthlyRate: 18,
    features: ['One class at the sample rate', 'Book up to 7 days ahead', 'No joining fee in this demo', 'Guest pass on request'],
    cta: 'Ask about a drop-in',
  },
  {
    id: 'community',
    name: 'Community',
    tagline: 'A regular rhythm, made social.',
    monthlyRate: 89,
    badge: 'Most picked (sample)',
    features: ['8 group classes per month', 'Two guest passes per month', 'Social events invitations', 'Flexible 30-day notice'],
    cta: 'Request a trial',
  },
  {
    id: 'circle',
    name: 'Circle',
    tagline: 'For the club regular.',
    monthlyRate: 129,
    features: ['Unlimited group classes', 'Priority sample booking', 'Four guest passes per month', 'Bring-a-friend event invites'],
    cta: 'Request a trial',
  },
];

export const COMPARISON_ROWS: { label: string; values: [string, string, string] }[] = [
  { label: 'Group classes', values: ['1 at a time', '8 per month', 'Unlimited'] },
  { label: 'Guest passes', values: ['On request', '2 per month', '4 per month'] },
  { label: 'Social event invites', values: ['—', 'Included', 'Included + a friend'] },
  { label: 'Booking window', values: ['7 days', '14 days', '21 days'] },
  { label: 'Notice period', values: ['None', '30 days', '30 days'] },
];

export interface ClubEvent {
  id: string;
  title: string;
  when: string;
  time: string;
  blurb: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const EVENTS: ClubEvent[] = [
  {
    id: 'event-run',
    title: 'Sunrise Social Walk',
    when: 'Sample: first Saturday',
    time: '08:30',
    blurb: 'An easy-paced walk with a coffee stop after. All paces and plus-ones welcome.',
    image: 'images/community.jpg',
    alt: 'Sample photo of club members gathering together',
    width: 1100,
    height: 734,
  },
  {
    id: 'event-yoga',
    title: 'Bring-a-friend Yoga',
    when: 'Sample: second Saturday',
    time: '10:00',
    blurb: 'A relaxed flow designed for two, followed by a few minutes to linger and talk.',
    image: 'images/class-yoga.jpg',
    alt: 'Sample photo representing a friendly group yoga session',
    width: 1100,
    height: 733,
  },
  {
    id: 'event-tea',
    title: 'Mindful Sunday & Tea',
    when: 'Sample: last Sunday',
    time: '16:30',
    blurb: 'Slow movement, then tea in the lounge. Come as you are; stay as long as you like.',
    image: 'images/class-mindful.jpg',
    alt: 'Sample photo representing a calm mindful movement session',
    width: 1100,
    height: 1279,
  },
];

export const LIGHTBOX_IMAGES = [
  { src: 'images/community.jpg', alt: 'Sample photo of members gathering at the club', caption: 'The social side — sample community photo', width: 1100, height: 734 },
  { src: 'images/studio.jpg', alt: 'Sample photo of the studio space', caption: 'Our sample studio space', width: 1100, height: 733 },
  { src: 'images/class-cycle.jpg', alt: 'Sample photo representing a cycle class', caption: 'Cycle room — sample class photo', width: 1100, height: 733 },
  { src: 'images/class-yoga.jpg', alt: 'Sample photo representing a yoga class', caption: 'Yoga flow — sample class photo', width: 1100, height: 733 },
];

export const FAQS = [
  {
    q: 'Do I need to be fit or experienced to join?',
    a: 'No. The sample classes are written as all-levels sessions, with options to slow down or add intensity. Tell us what you are comfortable with in the trial request and we would tailor the recommendation. This wording is demo copy until a client confirms it.',
  },
  {
    q: 'Can I try a class before choosing a membership?',
    a: 'Yes — use the trial request form on this page. It is a demonstration only: nothing is sent, booked or charged. A real club would replace it with its confirmed booking process.',
  },
  {
    q: 'Are the timetable times and places guaranteed?',
    a: 'No. Every time, room, coach name and available-places figure in the timetable is sample data for this demo. Replace the schedule with client-approved availability before launch.',
  },
  {
    q: 'How do the sample prices work?',
    a: 'The rates shown are illustrative placeholders. The estimator multiplies a clearly labelled sample monthly rate by the number of months you choose; no payment is calculated or taken.',
  },
  {
    q: 'Can I bring a friend?',
    a: 'The sample membership comparison includes guest passes and bring-a-friend events. Actual guest policies are for the client to confirm.',
  },
  {
    q: 'Where is the club and how do I get in touch?',
    a: 'Contact details on this demo are placeholders: a sample address, a placeholder email and a demo WhatsApp link with no real number. Replace all three with verified client details.',
  },
];
