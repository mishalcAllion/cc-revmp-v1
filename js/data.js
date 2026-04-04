/* ============================================================
   Maestro Command Centre — Mock Data Store
   All screens pull from this single data source
   ============================================================ */

function clientAvatarSVG() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`;
}

const AGENTS = [
  { id: 'a1', name: 'Angua von Uberwald', initials: 'AU', color: '#f97316' },
  { id: 'a2', name: 'Carrot Ironfoundersson', initials: 'CI', color: '#8b5cf6' },
  { id: 'a3', name: 'Magrat Garlick',   initials: 'MG', color: '#06b6d4' },
  { id: 'a4', name: 'Cheery Littlebottom', initials: 'CL', color: '#10b981' },
  { id: 'a5', name: 'Tiffany Aching',   initials: 'TA', color: '#ec4899' },
];

const CLIENTS = [
  {
    id: 'c1', name: 'Samuel Vimes', householdId: 'h1',
    phone: '+1 (720) 555-0411', email: 'samuel.vimes@yahoo.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#6366f1', initials: 'SV',
    points: { amex: 320000, chase: 185000 },
    preferences: {
      airlines: 'Delta One, Singapore Suites',
      hotels: 'Aman, Four Seasons',
      seating: 'Window',
      dining: 'Farm-to-table, local cuisine',
      budget: '$15,000-25,000 per trip',
      pace: 'Relaxed, max 2 activities/day'
    },
    createdAt: '2025-11-12'
  },
  {
    id: 'c2', name: 'Sybil Ramkin', householdId: 'h1',
    phone: '+1 (720) 555-0412', email: 'sybil.ramkin@yahoo.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#ec4899', initials: 'SR',
    points: { marriott: 94000 },
    preferences: {
      airlines: 'Delta One, Emirates First',
      hotels: 'Small luxury boutiques',
      seating: 'Window, next to Samuel',
      dining: 'No shellfish, farm-to-table',
      budget: '$15,000-25,000 per trip',
      pace: 'Relaxed'
    },
    createdAt: '2025-11-12'
  },
  {
    id: 'c3', name: 'Juliana Ridcully', householdId: 'h2',
    phone: '+1 (415) 555-0298', email: 'juliana.ridcully@gmail.com',
    status: 'Active', tier: 'Standard',
    avatarColor: '#f59e0b', initials: 'JR',
    points: { amex: 210000 },
    preferences: {
      airlines: 'United Polaris, Air France La Premiere',
      hotels: 'Relais & Chateaux, wine estate properties',
      seating: 'Aisle',
      dining: 'Fine dining, wine pairings, vegetarian options',
      budget: '$12,000-18,000 per trip',
      pace: 'Moderate'
    },
    createdAt: '2025-12-03'
  },
  {
    id: 'c4', name: 'Mustrum Ridcully', householdId: 'h2',
    phone: '+1 (415) 555-0299', email: 'mustrum.ridcully@gmail.com',
    status: 'Active', tier: 'Standard',
    avatarColor: '#8b5cf6', initials: 'MR',
    points: { united: 155000 },
    preferences: {
      airlines: 'United Polaris',
      hotels: 'Relais & Chateaux',
      seating: 'Window',
      dining: 'Fine dining, open to everything',
      budget: '$12,000-18,000 per trip',
      pace: 'Moderate'
    },
    createdAt: '2025-12-03'
  },
  {
    id: 'c5', name: 'Havelock Vetinari', householdId: 'h3',
    phone: '+1 (650) 555-0177', email: 'havelock.vetinari@outlook.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#10b981', initials: 'HV',
    points: { chase: 450000, amex: 280000 },
    preferences: {
      airlines: 'Singapore Airlines Suites, Qatar QSuites',
      hotels: 'Soneva, Aman, One&Only',
      seating: 'Together with Margolotta, bulkhead',
      dining: 'Seafood, Japanese',
      budget: '$20,000-35,000 per trip',
      pace: 'Very relaxed, beach-focused'
    },
    createdAt: '2025-09-28'
  },
  {
    id: 'c6', name: 'Margolotta Vetinari', householdId: 'h3',
    phone: '+1 (650) 555-0178', email: 'margolotta.vetinari@outlook.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#06b6d4', initials: 'MV',
    points: { hyatt: 120000 },
    preferences: {
      airlines: 'Singapore Airlines, Qatar',
      hotels: 'Six Senses, Soneva',
      seating: 'Together with Havelock',
      dining: 'Open to everything',
      budget: '$20,000-35,000 per trip',
      pace: 'Very relaxed'
    },
    createdAt: '2025-09-28'
  },
  {
    id: 'c7', name: 'Jason Ogg', householdId: 'h4',
    phone: '+1 (312) 555-0456', email: 'jason.ogg@proton.me',
    status: 'Active', tier: 'Standard',
    avatarColor: '#ef4444', initials: 'JO',
    points: { amex: 175000 },
    preferences: {
      airlines: 'Delta One, JetBlue Mint',
      hotels: 'Four Seasons, Rosewood (kid programs)',
      seating: 'Row together, kids between parents',
      dining: 'Family-friendly',
      budget: '$18,000-28,000 per trip (family)',
      pace: 'Active, daily excursions'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'c8', name: 'Millie Ogg', householdId: 'h4',
    phone: '+1 (312) 555-0457', email: 'millie.ogg@proton.me',
    status: 'Active', tier: 'Standard',
    avatarColor: '#f97316', initials: 'MO',
    points: { delta: 92000 },
    preferences: {
      airlines: 'Delta One',
      hotels: 'Four Seasons',
      seating: 'Next to Jason',
      dining: 'Family-friendly, kids eat early',
      budget: '$18,000-28,000 per trip (family)',
      pace: 'Active'
    },
    createdAt: '2026-01-15'
  },
  {
    id: 'c9', name: 'Brenda Selachii', householdId: 'h5',
    phone: '+1 (917) 555-0833', email: 'brenda.selachii@me.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#8b5cf6', initials: 'BS',
    points: { chase: 380000, amex: 520000 },
    preferences: {
      airlines: 'Emirates First, Etihad Apartments, Singapore Suites',
      hotels: 'Aman, Bulgari, Mandarin Oriental',
      seating: 'First class only, adjacent suites',
      dining: 'Michelin-starred, private chef experiences',
      budget: '$30,000-50,000 per trip',
      pace: 'Leisurely, quality over quantity'
    },
    createdAt: '2025-08-07'
  },
  {
    id: 'c10', name: 'Ronaldo Selachii', householdId: 'h5',
    phone: '+1 (917) 555-0834', email: 'ronaldo.selachii@me.com',
    status: 'Active', tier: 'VIP',
    avatarColor: '#d946ef', initials: 'RS',
    points: { marriott: 210000, hilton: 340000 },
    preferences: {
      airlines: 'Emirates First, Singapore Suites',
      hotels: 'St. Regis, Bulgari',
      seating: 'Adjacent to Brenda',
      dining: 'Italian fine dining, wine connoisseur',
      budget: '$30,000-50,000 per trip',
      pace: 'Leisurely'
    },
    createdAt: '2025-08-07'
  },
  {
    id: 'c11', name: 'Mort Sto Helit', householdId: 'h6',
    phone: '+1 (202) 555-0612', email: 'mort.stohelit@gmail.com',
    status: 'Active', tier: 'Standard',
    avatarColor: '#06b6d4', initials: 'MS',
    points: { amex: 145000 },
    preferences: {
      airlines: 'Lufthansa First, Swiss Business',
      hotels: 'Historic properties, palazzo-style',
      seating: 'Window preferred',
      dining: 'Italian, local trattorias, cooking classes',
      budget: '$10,000-16,000 per trip',
      pace: 'Moderate, walking-heavy'
    },
    createdAt: '2026-02-01'
  },
  {
    id: 'c12', name: 'Ysabell Sto Helit', householdId: 'h6',
    phone: '+1 (202) 555-0613', email: 'ysabell.stohelit@gmail.com',
    status: 'Active', tier: 'Standard',
    avatarColor: '#14b8a6', initials: 'YS',
    points: { united: 78000 },
    preferences: {
      airlines: 'Lufthansa, Swiss',
      hotels: 'Boutique historic',
      seating: 'Window',
      dining: 'Italian, cooking classes',
      budget: '$10,000-16,000 per trip',
      pace: 'Moderate'
    },
    createdAt: '2026-02-01'
  }
];

const HOUSEHOLDS = [
  { id: 'h1', name: 'Vimes', primaryClientId: 'c1', members: ['c1','c2'], dependents: [] },
  { id: 'h2', name: 'Ridcully', primaryClientId: 'c3', members: ['c3','c4'], dependents: [] },
  { id: 'h3', name: 'Vetinari', primaryClientId: 'c5', members: ['c5','c6'], dependents: [] },
  { id: 'h4', name: 'Ogg', primaryClientId: 'c7', members: ['c7','c8'], dependents: [{name:'Pewsey Ogg', age:12}, {name:'Shawn Ogg', age:9}] },
  { id: 'h5', name: 'Selachii', primaryClientId: 'c9', members: ['c9','c10'], dependents: [] },
  { id: 'h6', name: 'Sto Helit', primaryClientId: 'c11', members: ['c11','c12'], dependents: [] },
];

const TRIPS = [
  {
    id: 'tr1', householdId: 'h1', name: 'Athens, Mykonos & Santorini',
    destinations: 'Athens, Mykonos, Santorini', dates: 'May 10 - 24, 2026',
    status: 'Active', stage: 'booking', agentId: 'a1',
    travelers: ['c1','c2'],
    guests: [{name:'Nobby Nobbs', age:39}, {name:'Rosamund Nobbs', age:37}],
    budget: '$22,000'
  },
  {
    id: 'tr2', householdId: 'h2', name: 'Paris & French Riviera Anniversary',
    destinations: 'Paris, Nice, Saint-Tropez', dates: 'Jun 15 - 28, 2026',
    status: 'Active', stage: 'planning', agentId: 'a1',
    travelers: ['c3','c4'],
    budget: '$16,000'
  },
  {
    id: 'tr3', householdId: 'h3', name: 'Maldives Escape',
    destinations: 'Male, North Ari Atoll', dates: 'Apr 20 - 28, 2026',
    status: 'Confirmed', stage: 'confirmed', agentId: 'a2',
    travelers: ['c5','c6'],
    budget: '$28,000'
  },
  {
    id: 'tr4', householdId: 'h4', name: 'Panama & Costa Rica Family Adventure',
    destinations: 'Panama City, Manuel Antonio', dates: 'Jul 5 - 15, 2026',
    status: 'Active', stage: 'planning', agentId: 'a2',
    travelers: ['c7','c8'],
    dependents: [{name:'Pewsey Ogg', age:12}, {name:'Shawn Ogg', age:9}],
    budget: '$24,000'
  },
  {
    id: 'tr5', householdId: 'h5', name: 'Bali & Singapore Luxury',
    destinations: 'Ubud, Seminyak, Singapore', dates: 'Aug 1 - 14, 2026',
    status: 'Active', stage: 'lead', agentId: 'a3',
    travelers: ['c9','c10'],
    budget: '$42,000'
  },
  {
    id: 'tr6', householdId: 'h6', name: 'Amalfi Coast & Rome',
    destinations: 'Amalfi, Ravello, Rome', dates: 'Sep 8 - 18, 2026',
    status: 'Active', stage: 'planning', agentId: 'a1',
    travelers: ['c11','c12'],
    budget: '$14,000'
  },
  {
    id: 'tr7', householdId: 'h3', name: 'Japan Cherry Blossom',
    destinations: 'Tokyo, Kyoto, Osaka', dates: 'Mar 25 - Apr 6, 2027',
    status: 'Active', stage: 'lead', agentId: 'a4',
    travelers: ['c5','c6'],
    budget: '$22,000'
  },
  {
    id: 'tr8', householdId: 'h5', name: 'Italy 2026',
    destinations: 'Lake Como, Florence, Amalfi', dates: 'Oct 5 - 19, 2026',
    status: 'Active', stage: 'booking', agentId: 'a5',
    travelers: ['c9','c10'],
    budget: '$38,000'
  }
];

const PIPELINE_STAGES = [
  { id: 'lead',       label: 'Lead',       color: '#94a3b8' },
  { id: 'planning',   label: 'Planning',   color: '#6366f1' },
  { id: 'booking',    label: 'Booking',    color: '#f59e0b' },
  { id: 'confirmed',  label: 'Confirmed',  color: '#10b981' },
  { id: 'active',     label: 'Active Travel', color: '#06b6d4' },
  { id: 'completed',  label: 'Completed',  color: '#8b5cf6' },
  { id: 'archived',   label: 'Archived',   color: '#64748b' },
];

const COMPONENTS = [
  // ── tr1: Athens, Mykonos & Santorini (Vimes) ──────────────────────────
  {
    id: 'comp1', tripId: 'tr1', name: 'Hotel Grande Bretagne, Athens', category: 'hotel',
    clientFacingStatus: 'Booked', clientDecision: 'Approved', decidedBy: 'Samuel Vimes', clientDecisionDate: '2026-03-20',
    priceCash: '$850/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 10 - 13, 2026', nights: 3, duration: null, keyTime: '3:00 PM',
    advisorReasoning: 'Top-tier location on Syntagma Square with Acropolis views. Matches preference for luxury boutiques. Rooftop restaurant is one of the best in Athens.',
    websiteUrl: 'https://www.marriott.com/hotels/travel/athgb-hotel-grande-bretagne-a-luxury-collection-hotel-athens/', imageUrl: null,
    optionGroup: null, displayOrder: 1,
    score: 93, internalNotes: 'Client stayed here before and loved it. Loyalty rate applied.',
    comments: [], updatedAt: 'Mar 25'
  },
  {
    id: 'comp2', tripId: 'tr1', name: 'Delta DL-401 (JFK-ATH)', category: 'flight',
    clientFacingStatus: 'Booked', clientDecision: 'Approved', decidedBy: 'Samuel Vimes', clientDecisionDate: '2026-03-18',
    priceCash: null, pricePoints: '86,000 pts', recommendedPayment: 'Points',
    dates: 'May 10, 2026', nights: null, duration: '12h 20m', keyTime: '5:30 PM',
    advisorReasoning: 'Delta One suite with flat-bed and direct aisle access. Non-stop JFK to ATH. Best points value at 1.8 cpp.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 2,
    score: 86, internalNotes: 'Transferred 86K Amex MR during 30% bonus promo.',
    comments: [], updatedAt: 'Mar 22'
  },
  {
    id: 'comp3', tripId: 'tr1', name: 'Cavo Tagoo Mykonos', category: 'hotel',
    clientFacingStatus: 'Confirmed', clientDecision: 'Approved', decidedBy: 'Sybil Ramkin', clientDecisionDate: '2026-03-19',
    priceCash: '$1,200/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 13 - 18, 2026', nights: 5, duration: null, keyTime: '2:00 PM',
    advisorReasoning: 'Iconic cave-style suites with private pools. Ideal for a relaxed Mykonos stay away from party scene. Matches their "max 2 activities/day" pace preference.',
    websiteUrl: 'https://cavotagoo.com/', imageUrl: null,
    optionGroup: null, displayOrder: 3,
    score: 95, internalNotes: null,
    comments: [
      { id: 'cmt1', message: 'Can we get a suite with a private pool? Sybil really wants one.', author: 'Samuel Vimes', commentType: 'client', source: 'app', createdAt: '2026-03-20T10:00:00', reviewStatus: 'Addressed' },
      { id: 'cmt2', message: 'Confirmed — booked the Tagoo Suite with private infinity pool overlooking caldera.', author: 'Angua von Uberwald', commentType: 'ops', source: 'manual', createdAt: '2026-03-20T14:30:00', reviewStatus: null }
    ],
    updatedAt: 'Mar 23'
  },
  {
    id: 'comp4', tripId: 'tr1', name: 'Private Yacht Day - Mykonos', category: 'experience',
    clientFacingStatus: 'Confirmed', clientDecision: 'Approved', decidedBy: 'Samuel Vimes', clientDecisionDate: '2026-03-25',
    priceCash: '$3,200', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 15, 2026', nights: null, duration: null, keyTime: '9:00 AM',
    advisorReasoning: 'Full-day private yacht charter around Delos and Rhenia islands. Captain + chef included. Perfect for their group of 4.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 4,
    score: 95, internalNotes: 'Vendor: Mykonos Yachting. Deposit paid.',
    comments: [], updatedAt: 'Mar 30'
  },
  {
    id: 'comp5', tripId: 'tr1', name: 'Canaves Oia Suites', category: 'hotel',
    clientFacingStatus: 'Ready for approval', clientDecision: 'Approved', decidedBy: 'Samuel Vimes', clientDecisionDate: '2026-03-29',
    priceCash: '$1,400/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 18 - 22, 2026', nights: 4, duration: null, keyTime: '3:00 PM',
    advisorReasoning: 'Best sunset views in Oia. Private plunge pool suites. Consistently ranked #1 on Santorini. Matches their luxury boutique preference perfectly.',
    websiteUrl: 'https://canaves.com/', imageUrl: null,
    optionGroup: 'santorini-hotel', displayOrder: 5,
    score: 97, internalNotes: 'Waitlisted — expected confirmation by Apr 5. Priority #1.',
    comments: [
      { id: 'cmt3', message: 'This is our top pick! How likely is the waitlist to clear?', author: 'Samuel Vimes', commentType: 'client', source: 'app', createdAt: '2026-03-29T09:00:00', reviewStatus: 'Reviewing' },
      { id: 'cmt4', message: 'Very likely — I have a contact at Canaves and they expect a cancellation by Apr 3. Will update immediately.', author: 'Angua von Uberwald', commentType: 'ops', source: 'manual', createdAt: '2026-03-29T11:00:00', reviewStatus: null }
    ],
    updatedAt: 'Mar 28'
  },
  {
    id: 'comp6', tripId: 'tr1', name: 'Grace Hotel Santorini', category: 'hotel',
    clientFacingStatus: 'On hold', clientDecision: 'Pending', decidedBy: null, clientDecisionDate: null,
    priceCash: '$980/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 18 - 22, 2026', nights: 4, duration: null, keyTime: '3:00 PM',
    advisorReasoning: 'Excellent backup option in Oia with champagne bar and infinity pool. Slightly smaller rooms than Canaves but superb service.',
    websiteUrl: 'https://gracehotels.com/santorini/', imageUrl: null,
    optionGroup: 'santorini-hotel', displayOrder: 6,
    score: 91, internalNotes: 'Holding as backup until Canaves confirms. Release by Apr 10.',
    comments: [], updatedAt: 'Mar 29'
  },
  {
    id: 'comp7', tripId: 'tr1', name: 'Scorpios Mykonos - Private Dinner', category: 'dining',
    clientFacingStatus: 'Ready for approval', clientDecision: 'Pending', decidedBy: null, clientDecisionDate: null,
    priceCash: '$480', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 16, 2026', nights: null, duration: null, keyTime: '7:30 PM',
    advisorReasoning: 'Exclusive beachside dining at Mykonos\' most iconic sunset venue. Private table reserved on the cliff terrace. Mediterranean tasting menu with local wine pairing.',
    websiteUrl: 'https://scorpiosmykonos.com/', imageUrl: null,
    optionGroup: null, displayOrder: 7,
    score: null, internalNotes: 'Reservation via concierge connection. Dress code: resort casual.',
    comments: [
      { id: 'cmt5', message: 'Is this suitable for our shellfish allergy? Sybil can\'t have shellfish.', author: 'Samuel Vimes', commentType: 'client', source: 'app', createdAt: '2026-03-31T08:00:00', reviewStatus: null },
    ],
    updatedAt: 'Mar 31'
  },
  {
    id: 'comp8', tripId: 'tr1', name: 'Athens Food & Wine Walking Tour', category: 'dining',
    clientFacingStatus: 'Need your input', clientDecision: 'Needs Changes', decidedBy: 'Sybil Ramkin', clientDecisionDate: '2026-03-30',
    priceCash: '$220', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 11, 2026', nights: null, duration: null, keyTime: '10:00 AM',
    advisorReasoning: 'Guided walk through Plaka and Central Market with 6 tastings including local cheeses, olives, and Greek wine. Small group (max 8).',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 8,
    score: null, internalNotes: null,
    comments: [
      { id: 'cmt6', message: 'Sybil prefers a private tour, not a group one. Can this be arranged privately?', author: 'Samuel Vimes', commentType: 'client', source: 'app', createdAt: '2026-03-30T15:00:00', reviewStatus: null },
    ],
    updatedAt: 'Mar 30'
  },
  {
    id: 'comp9', tripId: 'tr1', name: 'VIP Airport Lounge - JFK', category: 'vip_touch',
    clientFacingStatus: 'Confirmed', clientDecision: 'Approved', decidedBy: 'Samuel Vimes', clientDecisionDate: '2026-03-22',
    priceCash: '$150', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 10, 2026', nights: null, duration: null, keyTime: '3:00 PM',
    advisorReasoning: 'Private suite in the Delta Sky Club reserved section. Complimentary champagne and catering pre-flight. Smooth transition to boarding.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 9,
    score: null, internalNotes: 'Booked via Delta Amex Centurion access.',
    comments: [], updatedAt: 'Mar 22'
  },
  {
    id: 'comp10', tripId: 'tr1', name: 'Helicopter Transfer Mykonos - Santorini', category: 'transfer',
    clientFacingStatus: 'Working on it', clientDecision: null, decidedBy: null, clientDecisionDate: null,
    priceCash: '$2,800', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'May 18, 2026', nights: null, duration: '25m', keyTime: '11:00 AM',
    advisorReasoning: null,
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 10,
    score: null, internalNotes: 'Checking availability with 2 providers. Backup: fast ferry.',
    comments: [], updatedAt: 'Mar 28'
  },
  // ── tr2: Paris & French Riviera Anniversary (Ridcully) ────────────────
  {
    id: 'comp11', tripId: 'tr2', name: 'Le Bristol Paris', category: 'hotel',
    clientFacingStatus: 'Booked', clientDecision: 'Approved', decidedBy: 'Juliana Ridcully', clientDecisionDate: '2026-03-15',
    priceCash: '$1,100/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'Jun 15 - 19, 2026', nights: 4, duration: null, keyTime: '3:00 PM',
    advisorReasoning: 'Palace hotel on Rue du Faubourg Saint-Honore. Epicure restaurant (3 Michelin stars) on-site. Matches their fine dining + wine preference.',
    websiteUrl: 'https://www.oetkercollection.com/hotels/le-bristol-paris/', imageUrl: null,
    optionGroup: null, displayOrder: 1,
    score: 94, internalNotes: null,
    comments: [], updatedAt: 'Mar 18'
  },
  {
    id: 'comp12', tripId: 'tr2', name: 'Air France AF-23 (SFO-CDG)', category: 'flight',
    clientFacingStatus: 'Booked', clientDecision: 'Approved', decidedBy: 'Mustrum Ridcully', clientDecisionDate: '2026-03-12',
    priceCash: null, pricePoints: '95,000 pts', recommendedPayment: 'Points',
    dates: 'Jun 15, 2026', nights: null, duration: '10h 45m', keyTime: '4:15 PM',
    advisorReasoning: 'La Premiere cabin with lie-flat suite and multi-course French menu. Non-stop SFO to CDG. Excellent points redemption at 2.1 cpp.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 2,
    score: 88, internalNotes: 'Transferred 95K United to Flying Blue.',
    comments: [], updatedAt: 'Mar 15'
  },
  {
    id: 'comp13', tripId: 'tr2', name: 'TGV Paris - Nice', category: 'train',
    clientFacingStatus: 'Ready for approval', clientDecision: 'Pending', decidedBy: null, clientDecisionDate: null,
    priceCash: '$180', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'Jun 19, 2026', nights: null, duration: '5h 36m', keyTime: '9:15 AM',
    advisorReasoning: 'First class TGV with panoramic views through Provence. Much more scenic than flying — perfect for their pace preference. Arrives Nice in time for sunset dinner.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 3,
    score: null, internalNotes: 'Tickets not yet on sale. Opens Apr 10.',
    comments: [
      { id: 'cmt7', message: 'Can we get seats on the left side for the coastal views?', author: 'Juliana Ridcully', commentType: 'client', source: 'app', createdAt: '2026-03-30T16:00:00', reviewStatus: 'Reviewing' }
    ],
    updatedAt: 'Mar 30'
  },
  // ── tr3: Maldives Escape (Vetinari) ───────────────────────────────────
  {
    id: 'comp14', tripId: 'tr3', name: 'Soneva Fushi Water Villa', category: 'hotel',
    clientFacingStatus: 'Booked', clientDecision: 'Approved', decidedBy: 'Havelock Vetinari', clientDecisionDate: '2026-03-05',
    priceCash: '$2,800/night', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'Apr 20 - 28, 2026', nights: 8, duration: null, keyTime: '2:00 PM',
    advisorReasoning: 'Overwater villa with private pool, slide to ocean, and glass floor. Soneva is their preferred brand. Best match for "very relaxed, beach-focused" pace.',
    websiteUrl: 'https://soneva.com/soneva-fushi/', imageUrl: null,
    optionGroup: null, displayOrder: 1,
    score: 98, internalNotes: 'Upgrade request pending — villa #14 preferred (sunrise side).',
    comments: [], updatedAt: 'Mar 10'
  },
  // ── tr4: Panama & Costa Rica Family Adventure (Ogg) ───────────────────
  {
    id: 'comp15', tripId: 'tr4', name: 'Delta DL-619 (ORD-PTY)', category: 'flight',
    clientFacingStatus: 'Confirmed', clientDecision: 'Approved', decidedBy: 'Jason Ogg', clientDecisionDate: '2026-03-18',
    priceCash: null, pricePoints: '55,000 pts', recommendedPayment: 'Points',
    dates: 'Jul 5, 2026', nights: null, duration: '5h 30m', keyTime: '8:00 AM',
    advisorReasoning: 'Direct ORD to Panama City. Delta One for the family — kids get amenity kits.',
    websiteUrl: null, imageUrl: null,
    optionGroup: null, displayOrder: 1,
    score: 82, internalNotes: 'Need passport copies for all 4 pax. Chase by Jun 14.',
    comments: [], updatedAt: 'Mar 20'
  },
  // ── tr8: Italy 2026 (Selachii) ────────────────────────────────────────
  {
    id: 'comp16', tripId: 'tr8', name: 'Castello di Ama - Private Wine Tasting', category: 'experience',
    clientFacingStatus: 'Working on it', clientDecision: null, decidedBy: null, clientDecisionDate: null,
    priceCash: '$760', pricePoints: null, recommendedPayment: 'Cash',
    dates: 'Oct 12, 2026', nights: null, duration: null, keyTime: '10:00 AM',
    advisorReasoning: null,
    websiteUrl: 'https://castellodiama.com/', imageUrl: null,
    optionGroup: null, displayOrder: 5,
    score: null, internalNotes: 'Reached out to estate. Waiting on private group availability for Oct dates.',
    comments: [], updatedAt: 'Mar 29'
  },
];

// Backward-compatible alias
const BOOKINGS = COMPONENTS;

const CONVERSATIONS = [
  {
    id: 'conv1', householdId: 'h1', tripId: 'tr1', threadType: 'trip', channel: 'whatsapp',
    status: 'open', assignedTo: 'a1', collaborators: ['a3'], lastActivity: '2:30 PM',
    lastMessage: 'Got the image! Looks like a restaurant recommendation...',
    unread: 0, slaStatus: 'healthy', slaMinutes: 45,
    updatedAt: '2026-03-30T14:30:00'
  },
  {
    id: 'conv2', householdId: 'h2', tripId: 'tr2', threadType: 'trip', channel: 'whatsapp',
    status: 'open', assignedTo: 'a1', collaborators: [], lastActivity: '2:00 PM',
    lastMessage: "Booking confirmed! I'll put together some anniversary dinner options...",
    unread: 1, slaStatus: 'warning', slaMinutes: 28,
    updatedAt: '2026-03-30T14:00:00'
  },
  {
    id: 'conv3', householdId: 'h3', tripId: 'tr3', threadType: 'trip', channel: 'stream',
    status: 'open', assignedTo: 'a2', collaborators: [], lastActivity: '11:30 AM',
    lastMessage: "Still pending -- I followed up with the resort this morning...",
    unread: 0, slaStatus: 'healthy', slaMinutes: 90,
    updatedAt: '2026-03-30T11:30:00'
  },
  {
    id: 'conv4', householdId: 'h4', tripId: 'tr4', threadType: 'trip', channel: 'whatsapp',
    status: 'open', assignedTo: 'a2', collaborators: [], lastActivity: '11:00 AM',
    lastMessage: "I'll have a shortlist of 3 options with pricing, family-friendly activities...",
    unread: 1, slaStatus: 'critical', slaMinutes: 8,
    updatedAt: '2026-03-30T11:00:00'
  },
  {
    id: 'conv5', householdId: 'h5', tripId: 'tr5', threadType: 'trip', channel: 'stream',
    status: 'open', assignedTo: 'a3', collaborators: [], lastActivity: '10:15 AM',
    lastMessage: "We're looking at Ubud for the first week, then Seminyak beach...",
    unread: 2, slaStatus: 'breached', slaMinutes: -15,
    updatedAt: '2026-03-30T10:15:00'
  },
  {
    id: 'conv6', householdId: 'h6', tripId: 'tr6', threadType: 'trip', channel: 'whatsapp',
    status: 'open', assignedTo: 'a1', collaborators: [], lastActivity: '9:45 AM',
    lastMessage: "Belmond Caruso in Ravello looks perfect! Can we lock that in?",
    unread: 0, slaStatus: 'healthy', slaMinutes: 120,
    updatedAt: '2026-03-30T09:45:00'
  },
  {
    id: 'conv7', householdId: 'h3', tripId: 'tr7', threadType: 'trip', channel: 'stream',
    status: 'snoozed', assignedTo: 'a4', collaborators: ['a2'], lastActivity: 'Yesterday',
    lastMessage: "Just starting to think about cherry blossom season...",
    unread: 0, slaStatus: 'healthy', slaMinutes: 240,
    updatedAt: '2026-03-29T15:00:00'
  },
  {
    id: 'conv8', householdId: 'h5', tripId: 'tr8', threadType: 'trip', channel: 'stream',
    status: 'open', assignedTo: 'a5', collaborators: [], lastActivity: 'Yesterday',
    lastMessage: "Ronaldo wants to add a private wine tasting in Chianti...",
    unread: 1, slaStatus: 'warning', slaMinutes: 22,
    updatedAt: '2026-03-29T16:30:00'
  },
  // General threads (not trip-related)
  {
    id: 'conv9', householdId: 'h1', tripId: null, threadType: 'general', channel: 'whatsapp',
    status: 'open', assignedTo: 'a1', collaborators: [], lastActivity: '1:00 PM',
    lastMessage: "Quick question about transferring Amex points to Delta...",
    unread: 1, slaStatus: 'healthy', slaMinutes: 60,
    updatedAt: '2026-03-30T13:00:00'
  },
  {
    id: 'conv10', householdId: 'h5', tripId: null, threadType: 'general', channel: 'stream',
    status: 'open', assignedTo: null, collaborators: [], lastActivity: '3:15 PM',
    lastMessage: "Hi, we'd like to discuss our membership tier and benefits...",
    unread: 3, slaStatus: 'breached', slaMinutes: -25,
    updatedAt: '2026-03-30T15:15:00'
  },
  // Multi-agent trip thread
  {
    id: 'conv11', householdId: 'h3', tripId: 'tr7', threadType: 'trip', channel: 'stream',
    status: 'open', assignedTo: 'a4', collaborators: ['a2'], lastActivity: '12:30 PM',
    lastMessage: "Looking at ryokan options in Kyoto for cherry blossom week...",
    unread: 0, slaStatus: 'healthy', slaMinutes: 80,
    updatedAt: '2026-03-30T12:30:00'
  },
  // Unassigned general thread
  {
    id: 'conv12', householdId: 'h4', tripId: null, threadType: 'general', channel: 'whatsapp',
    status: 'open', assignedTo: null, collaborators: [], lastActivity: '8:30 AM',
    lastMessage: "Millie here -- need to update passport info for the kids...",
    unread: 2, slaStatus: 'warning', slaMinutes: 18,
    updatedAt: '2026-03-30T08:30:00'
  }
];

const MESSAGES = {
  conv1: [
    { id: 'm1', sender: 'client', senderName: 'Samuel', time: 'Mar 28, 10:00 AM', text: 'Hey, is there any update on Canaves Oia? We really want Santorini to be special.' },
    { id: 'm2', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 28, 11:00 AM', text: "Still on the waitlist, but I'm pushing hard. I've also identified Grace Hotel Santorini as a backup -- equally stunning, caldera views, excellent service. Want me to hold a room there just in case?" },
    { id: 'm3', sender: 'client', senderName: 'Samuel', time: 'Mar 29, 10:00 AM', text: "Yes, please hold the backup. But fingers crossed for Canaves. Also -- Nobby keeps asking about a helicopter transfer from Mykonos to Santorini instead of the ferry. Is that a thing?" },
    { id: 'm4', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 29, 11:30 AM', text: "Great, I'll hold Grace Hotel. And yes, helicopter transfers are absolutely a thing! It's about 30 minutes vs 2.5 hours by ferry. I'll get you pricing -- typically runs $2,500-3,500 for a private charter for your group of 4." },
    { id: 'm5', sender: 'client', senderName: 'Samuel', time: 'Mar 30, 9:00 AM', text: "Nobby is sold on the helicopter. Can you also look into a private yacht day in Mykonos?" },
    { id: 'm6', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 30, 11:00 AM', text: "Yacht day is confirmed! May 15, 10am-6pm, includes captain, chef, and stops at Delos and Rhenia for swimming. Lunch on board. It's going to be incredible." },
    { id: 'm7', sender: 'client', senderName: 'Samuel', time: 'Mar 30, 2:00 PM', text: '[Image: Restaurant recommendation screenshot]' },
    { id: 'm8', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 30, 2:30 PM', text: "Got the image! Looks like a restaurant recommendation? Let me look into it for your Mykonos nights." },
    { id: 'm9', sender: 'internal', senderName: 'Angua', agentId: 'a1', time: 'Mar 30, 2:35 PM', text: "Note: Client sent screenshot of Scorpios Mykonos -- upscale beach club/restaurant. Check availability for May 14 or 16 evening. Group of 4." },
    { id: 'm10', sender: 'ai-draft', time: 'Now', text: "I've looked into Scorpios Mykonos -- it's one of the best sunset dining spots on the island. I've put in a reservation request for May 14th for your group. They typically book up fast in May, so I've also noted May 16th as backup. I'll confirm as soon as I hear back. In the meantime, I've added it to your trip itinerary!", confidence: 'high' },
  ],

  conv2: [
    { id: 'c2m1', sender: 'client', senderName: 'Juliana', time: 'Mar 27, 9:00 AM', text: "Hi Angua! Just confirmed our Paris flights -- we land June 15th. Any updates on Le Bristol? Also want to think about a special anniversary dinner, something really memorable." },
    { id: 'c2m2', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 27, 10:30 AM', text: "Le Bristol is confirmed for June 15-19 -- you're in a Superior Room overlooking the inner courtyard. For the anniversary dinner, I'm thinking Le Cinq at Four Seasons George V or the Eiffel Tower restaurant Jules Verne. Both are extraordinary. Any preference?" },
    { id: 'c2m3', sender: 'client', senderName: 'Mustrum', time: 'Mar 28, 8:00 AM', text: "Jules Verne sounds incredible -- views of Paris on our anniversary would be perfect. Can we do a private table?" },
    { id: 'c2m4', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 28, 11:00 AM', text: "I've reached out to Jules Verne for June 20th -- they have a window table available. Booking confirmed! I'll put together some anniversary dinner options for the Riviera leg as well, since you're in Nice June 19-24." },
    { id: 'c2m5', sender: 'internal', senderName: 'Angua', agentId: 'a1', time: 'Mar 28, 11:15 AM', text: "Note: Jules Verne confirmed for Jun 20, 8pm. Window table for 2. Need to arrange transport from Le Bristol -- suggest private car ~45min. Add to itinerary." },
    { id: 'c2m6', sender: 'ai-draft', time: 'Now', text: "I've secured your Jules Verne reservation for June 20th at 8pm -- a window table with full Eiffel Tower views. I'm arranging a private car from Le Bristol (45 min). For your Nice stay, I'm also looking at Mirazur in Menton, rated #1 restaurant in the world -- it's a 45-min drive from Nice and would make a stunning finale to your trip.", confidence: 'high' },
  ],

  conv3: [
    { id: 'c3m1', sender: 'client', senderName: 'Havelock', time: 'Mar 26, 7:00 AM', text: "Morning! Quick question -- any chance we can upgrade to the overwater villa at Soneva Fushi? Margolotta has been dreaming about it. I know it's probably impossible last minute but figured I'd ask." },
    { id: 'c3m2', sender: 'ops', senderName: 'Carrot', agentId: 'a2', time: 'Mar 26, 9:00 AM', text: "I'm on it! Soneva Fushi actually had a cancellation in the water villa category last week, so there may be a window. I've called the GM directly and am waiting to hear back. No promises, but it's worth a shot." },
    { id: 'c3m3', sender: 'client', senderName: 'Margolotta', time: 'Mar 27, 10:00 AM', text: "Oh fingers crossed!! That would be the most amazing surprise. Havelock doesn't know I've been researching it for months 😂" },
    { id: 'c3m4', sender: 'ops', senderName: 'Carrot', agentId: 'a2', time: 'Mar 30, 11:30 AM', text: "Still pending -- I followed up with the resort this morning and they're checking availability. The GM said there's one villa that may open up due to a booking change. Should know by end of day." },
    { id: 'c3m5', sender: 'ai-draft', time: 'Now', text: "Update on the Soneva Fushi overwater villa: the resort confirmed availability for 6 of your 8 nights (Apr 22-28). For the first two nights (Apr 20-22) you'll be in the Crusoe Residence as originally booked -- equally stunning, just on the beach rather than over water. I've put together a comparison so you can decide. Total upgrade cost is $4,200.", confidence: 'medium' },
  ],

  conv4: [
    { id: 'c4m1', sender: 'client', senderName: 'Jason', time: 'Mar 28, 8:00 AM', text: "Hey Carrot -- kids are asking about what activities we'll do in Panama. Pewsey is 12, Shawn is 9. What do you recommend? They love wildlife and outdoor stuff." },
    { id: 'c4m2', sender: 'ops', senderName: 'Carrot', agentId: 'a2', time: 'Mar 28, 10:00 AM', text: "Perfect age for Panama! Top picks for the kids: Panama Canal Miraflores locks (Shawn will love watching the ships), Gamboa Rainforest canopy tour, and night turtle watching at Playa Blanca in Costa Rica. I'll build a day-by-day itinerary with options at each activity level." },
    { id: 'c4m3', sender: 'client', senderName: 'Millie', time: 'Mar 29, 9:00 AM', text: "The turtle watching sounds amazing! Also -- we still need to send you passport copies for the Panama visa. I'll get those over today." },
    { id: 'c4m4', sender: 'ops', senderName: 'Carrot', agentId: 'a2', time: 'Mar 30, 11:00 AM', text: "I'll have a shortlist of 3 options with pricing, family-friendly activities, and timing ready for you by tomorrow. And yes, please do send those passport copies -- visas need to be processed at least 3 weeks before travel, so July 5 gives us just enough time." },
    { id: 'c4m5', sender: 'internal', senderName: 'Carrot', agentId: 'a2', time: 'Mar 30, 11:10 AM', text: "URGENT: Passport copies still not received for Ogg family (4 pax: Jason, Millie, Pewsey, Shawn). Panama requires tourist cards in advance. Deadline: Jun 14. Chase Millie by EOD." },
  ],

  conv5: [
    { id: 'c5m1', sender: 'client', senderName: 'Brenda', time: 'Mar 29, 6:00 PM', text: "Magrat -- we're really excited about Bali! Ronaldo wants maximum privacy. Any chance we can get a full villa rather than hotel rooms? Preferably with a private pool and staff." },
    { id: 'c5m2', sender: 'ops', senderName: 'Magrat', agentId: 'a3', time: 'Mar 29, 8:00 PM', text: "Absolutely -- a private villa is the right call for you. We're looking at Ubud for the first week, then Seminyak beach for the second. For Ubud I have COMO Uma Ubud or a standalone 4-bedroom estate villa with butler service. Ronaldo will love the rice terrace views." },
    { id: 'c5m3', sender: 'client', senderName: 'Ronaldo', time: 'Mar 30, 7:00 AM', text: "The private estate sounds perfect. What about Singapore -- are we doing a hotel there or villa too?" },
    { id: 'c5m4', sender: 'ops', senderName: 'Magrat', agentId: 'a3', time: 'Mar 30, 10:15 AM', text: "For Singapore I'd recommend The Capella on Sentosa Island -- it's a resort but with incredible villa suites, each with a private plunge pool. 3 nights there would be a perfect end to the trip." },
    { id: 'c5m5', sender: 'ai-draft', time: 'Now', text: "I've put together two Bali villa options side by side: (1) COMO Uma Ubud -- 2BR pool villa, full spa access, $1,850/night; (2) Private Estate Villa -- 4BR, private chef + butler, rice terrace views, $2,400/night. Given your preference for privacy and the group size, the estate gives you significantly more space. Singapore: Capella Sentosa Manor Suite at $2,100/night. Full proposal attached.", confidence: 'high' },
  ],

  conv6: [
    { id: 'c6m1', sender: 'client', senderName: 'Mort', time: 'Mar 28, 11:00 AM', text: "Angua, we've been going back and forth on Amalfi Coast hotels. A friend recommended Belmond Caruso in Ravello -- have you stayed there? Is it worth the price?" },
    { id: 'c6m2', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 28, 1:00 PM', text: "Belmond Caruso is one of my absolute favorites on the entire coast. It's on a clifftop above Ravello with an infinity pool overlooking the Tyrrhenian Sea. Quiet, romantic, no beach crowd -- just spectacular views. I think it suits you and Ysabell perfectly given you mentioned wanting somewhere peaceful for walking." },
    { id: 'c6m3', sender: 'client', senderName: 'Ysabell', time: 'Mar 29, 9:00 AM', text: "Oh that sounds incredible. And the cooking classes -- are those something they offer?" },
    { id: 'c6m4', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 29, 11:00 AM', text: "Yes! Belmond runs a famous culinary program -- pasta making, market tours, wood-fired dinners. I can book a private session for just the two of you. They also partner with a local trattoria in Ravello village for a hidden-gem dinner most guests never find." },
    { id: 'c6m5', sender: 'client', senderName: 'Mort', time: 'Mar 30, 9:45 AM', text: "Belmond Caruso in Ravello looks perfect! Can we lock that in?" },
    { id: 'c6m6', sender: 'ai-draft', time: 'Now', text: "Confirmed: Belmond Caruso, Ravello -- Superior Sea View Room, July 7-12 (5 nights) at €1,180/night. I've also provisionally booked the private cooking class for July 9th (Tuesday) -- they'll confirm within 24h. I'll add the hidden trattoria dinner for July 10th as well. Total Amalfi leg: €6,400 + activities.", confidence: 'high' },
  ],

  conv7: [
    { id: 'c7m1', sender: 'client', senderName: 'Havelock', time: 'Mar 29, 8:00 AM', text: "Hey Cheery, I know this is early but Margolotta and I are just starting to think about cherry blossom season. We did Kyoto two years ago -- want to try Tokyo this time. Late March or early April?" },
    { id: 'c7m2', sender: 'ops', senderName: 'Cheery', agentId: 'a4', time: 'Mar 29, 10:00 AM', text: "Great timing -- cherry blossom forecasts usually come out in January and things move fast. Tokyo peak bloom is typically Mar 25 - Apr 5. For hotels, Park Hyatt Shinjuku and Aman Tokyo are both exceptional. Aman in particular has a rooftop view of the Imperial Palace moat with the blossoms -- it's extraordinary." },
    { id: 'c7m3', sender: 'client', senderName: 'Margolotta', time: 'Mar 29, 2:00 PM', text: "Aman Tokyo sounds like a dream. Should we book early given peak season?" },
    { id: 'c7m4', sender: 'ops', senderName: 'Cheery', agentId: 'a4', time: 'Mar 29, 3:00 PM', text: "Yes -- I'd recommend blocking dates now even before full trip planning. Aman Tokyo books out 6-9 months in advance for cherry blossom. I can put a soft hold on dates while we nail down the full itinerary. Just starting to think about cherry blossom season -- it's going to be magical." },
  ],

  conv9: [
    { id: 'c9m1', sender: 'client', senderName: 'Samuel', time: 'Mar 30, 10:00 AM', text: "Hey Angua, quick one -- I have about 320K Amex MR points and want to transfer to Delta for our next trip. What's the best transfer ratio right now? Also wondering if there's a bonus promo running." },
    { id: 'c9m2', sender: 'ops', senderName: 'Angua', agentId: 'a1', time: 'Mar 30, 11:30 AM', text: "Great question! Amex MR to Delta is a 1:1 transfer, but there's currently a 30% bonus running through April 15 -- so your 320K would become 416K Delta miles. That's enough for 2 Delta One round trips to Europe. Want me to lock in a transfer?" },
    { id: 'c9m3', sender: 'client', senderName: 'Samuel', time: 'Mar 30, 1:00 PM', text: "Quick question about transferring Amex points to Delta -- should we do the full 320K or hold some back for Marriott?" },
    { id: 'c9m4', sender: 'ai-draft', time: 'Now', text: "I'd recommend transferring 250K Amex to Delta during the 30% bonus (giving you 325K Delta miles) and keeping 70K for Marriott hotel bookings. That gives you flexibility for both flights and 2-3 hotel nights at luxury Marriott properties. The Delta miles cover your Greece flights with room to spare.", confidence: 'high' },
  ],

  conv10: [
    { id: 'c10m1', sender: 'client', senderName: 'Brenda', time: 'Mar 30, 2:45 PM', text: "Hi there -- Brenda Selachii here. Ronaldo and I have been with Maestro for about 8 months now and we'd like to discuss our membership tier. We've spent over $120K in bookings this year and feel we should be getting more concierge perks." },
    { id: 'c10m2', sender: 'client', senderName: 'Ronaldo', time: 'Mar 30, 3:15 PM', text: "Hi, we'd like to discuss our membership tier and benefits -- specifically priority booking access and the complimentary planning sessions. Are these available at our level?" },
  ],

  conv11: [
    { id: 'c11m1', sender: 'ops', senderName: 'Cheery', agentId: 'a4', time: 'Mar 30, 9:00 AM', text: "Havelock, I've been researching ryokan options in Kyoto for your cherry blossom dates. Found three gems: Tawaraya (oldest ryokan in Kyoto, ultra-traditional), Hoshinoya Kyoto (boat arrival, modern luxury), and Gora Kadan (mountain setting, private onsen)." },
    { id: 'c11m2', sender: 'client', senderName: 'Havelock', time: 'Mar 30, 11:00 AM', text: "Cheery, these all sound incredible. Margolotta loves onsen -- is Gora Kadan doable as a day trip from Kyoto or should we stay overnight?" },
    { id: 'c11m3', sender: 'internal', senderName: 'Carrot', agentId: 'a2', time: 'Mar 30, 11:45 AM', text: "Note: Gora Kadan is in Hakone, ~3hrs from Kyoto. Better as a 1-2 night stay. Suggest adding to Osaka leg. I've worked with their GM before -- can get preferred rates for VIP clients." },
    { id: 'c11m4', sender: 'ops', senderName: 'Cheery', agentId: 'a4', time: 'Mar 30, 12:30 PM', text: "Looking at ryokan options in Kyoto for cherry blossom week -- Carrot actually has connections at Gora Kadan and suggests we slot it in near Osaka instead. Great tip. I'll restructure the itinerary to include a 2-night Hakone stopover between Tokyo and Kyoto." },
  ],

  conv12: [
    { id: 'c12m1', sender: 'client', senderName: 'Millie', time: 'Mar 30, 8:00 AM', text: "Hi team -- Millie Ogg here. Need to update passport info for the kids. Pewsey's passport was renewed last month and Shawn's expires in September. Can someone help us get the new details on file?" },
    { id: 'c12m2', sender: 'client', senderName: 'Millie', time: 'Mar 30, 8:30 AM', text: "Millie here -- need to update passport info for the kids. Also wondering if Shawn's passport will be valid long enough for our July Panama trip -- some countries need 6 months validity, right?" },
  ],

  conv8: [
    { id: 'c8m1', sender: 'client', senderName: 'Ronaldo', time: 'Mar 29, 10:00 AM', text: "Tiffany, we're thinking about extending the Italy 2026 trip to include Tuscany. Brenda has always wanted to do a private wine tasting in Chianti -- something really immersive, not a tourist thing." },
    { id: 'c8m2', sender: 'ops', senderName: 'Tiffany', agentId: 'a5', time: 'Mar 29, 12:00 PM', text: "Love this idea for you both. There are a few family-owned estates in Greve in Chianti that do private half-day experiences -- barrel room access, meeting the winemaker, seated lunch in the vineyard. One in particular, Castello di Ama, is world-class and very exclusive. Interested?" },
    { id: 'c8m3', sender: 'client', senderName: 'Brenda', time: 'Mar 29, 4:00 PM', text: "Castello di Ama sounds absolutely perfect. Ronaldo is a huge Sangiovese fan -- he'd be in heaven." },
    { id: 'c8m4', sender: 'ops', senderName: 'Tiffany', agentId: 'a5', time: 'Mar 29, 5:00 PM', text: "Ronaldo wants to add a private wine tasting in Chianti -- I'll reach out to Castello di Ama first thing tomorrow and see what exclusive access looks like for a private group of 2. Also looking at a stay in Siena before or after." },
    { id: 'c8m5', sender: 'ai-draft', time: 'Now', text: "Reached out to Castello di Ama -- they offer a private half-day experience: estate tour, barrel tasting with winemaker, 4-course lunch in the vineyard, €380pp. Available dates in Oct 2026 include Oct 8, 12, 15. I'd suggest combining with a 2-night stay at Castel Monastero in Castelnuovo Berardenga -- a 5-star Curio Collection estate 20 min from Ama, full spa, Michelin-starred restaurant.", confidence: 'medium' },
  ],
};

const TASKS = [
  { id: 'tk1', title: 'Confirm shellfish-free tasting menu with Eden-Roc for anniversary dinner', householdId: 'h2', tripId: 'tr2', status: 'In Progress', priority: 'High', assignedTo: 'a1', dueIn: '2d', source: 'auto', venue: 'Eden-Roc Private Dining' },
  { id: 'tk2', title: 'Resolve Canaves Oia waitlist -- need alternate hotel confirmation by May 1', householdId: 'h1', tripId: 'tr1', status: 'Blocked', priority: 'Urgent', assignedTo: 'a1', dueIn: '1d', source: 'auto', venue: 'Canaves Oia Suites', componentId: 'comp5' },
  { id: 'tk3', title: 'Follow up on Soneva Fushi overwater villa upgrade request', householdId: 'h3', tripId: 'tr3', status: 'In Progress', priority: 'High', assignedTo: 'a2', dueIn: 'Due today', source: 'manual', venue: 'Soneva Fushi Water Resort' },
  { id: 'tk4', title: 'Negotiate Mulia Bali suite rate for Selachii 2-week stay', householdId: 'h5', tripId: 'tr5', status: 'Not Started', priority: 'Normal', assignedTo: 'a3', dueIn: '2d overdue', source: 'auto', venue: 'The Mulia Bali' },
  { id: 'tk5', title: 'Hold Singapore Airlines Suites SFO-SIN for Selachii', householdId: 'h5', tripId: 'tr5', status: 'Blocked', priority: 'High', assignedTo: 'a2', dueIn: '2d', source: 'auto', venue: 'SQ Suites SFO-SIN' },
  { id: 'tk6', title: 'Secure Belmond Caruso Ravello for Amalfi Coast stay', householdId: 'h6', tripId: 'tr6', status: 'Waiting', priority: 'Normal', assignedTo: 'a1', dueIn: '3d', source: 'manual', venue: 'Belmond Caruso Ravello' },
  { id: 'tk7', title: 'Research award availability SFO-MLE for Vetinari Maldives trip', householdId: 'h3', tripId: 'tr3', status: 'Not Started', priority: 'Normal', assignedTo: 'a4', dueIn: '5d', source: 'auto', venue: 'Maldives 2026' },
  { id: 'tk8', title: 'Arrange private wine tasting in Chianti for Sto Helit Italy trip', householdId: 'h6', tripId: 'tr6', status: 'Waiting', priority: 'Low', assignedTo: 'a5', dueIn: '7d', source: 'manual', venue: 'Italy 2026' },
  { id: 'tk9', title: 'Collect passport copies from Ogg family for Panama visa check', householdId: 'h4', tripId: 'tr4', status: 'Blocked', priority: 'High', assignedTo: 'a2', dueIn: '1d overdue', source: 'auto', venue: 'Panama & Costa Rica' },
  { id: 'tk10', title: 'Book helicopter transfer Mykonos to Santorini for Vimes group', householdId: 'h1', tripId: 'tr1', status: 'In Progress', priority: 'Normal', assignedTo: 'a1', dueIn: '4d', source: 'auto', venue: 'Mykonos-Santorini', componentId: 'comp10' },
  { id: 'tk11', title: 'Athens Food Tour -- Client requested private tour instead of group', householdId: 'h1', tripId: 'tr1', status: 'Not Started', priority: 'High', assignedTo: 'a1', dueIn: '2d', source: 'client-action', venue: 'Athens', componentId: 'comp8' },
  { id: 'tk12', title: 'Scorpios dinner -- Confirm shellfish-free options for Sybil', householdId: 'h1', tripId: 'tr1', status: 'Not Started', priority: 'Normal', assignedTo: 'a1', dueIn: '3d', source: 'client-action', venue: 'Scorpios Mykonos', componentId: 'comp7' },
];

const ALERTS = [
  { id: 'al1', route: 'SFO - ATH', dates: 'May 8-12', cabin: 'Business', maxPoints: '90,000', clientId: 'c1', status: 'Active', lastCheck: '2h ago', triggered: 3, program: 'Delta SkyMiles' },
  { id: 'al2', route: 'SFO - CDG', dates: 'Jun 13-17', cabin: 'First', maxPoints: '120,000', clientId: 'c3', status: 'Active', lastCheck: '4h ago', triggered: 1, program: 'Air France Flying Blue' },
  { id: 'al3', route: 'SFO - MLE', dates: 'Apr 18-22', cabin: 'Business', maxPoints: '85,000', clientId: 'c5', status: 'Triggered', lastCheck: '1h ago', triggered: 5, program: 'Singapore KrisFlyer' },
  { id: 'al4', route: 'ORD - PTY', dates: 'Jul 3-7', cabin: 'Business', maxPoints: '65,000', clientId: 'c7', status: 'Active', lastCheck: '6h ago', triggered: 0, program: 'Delta SkyMiles' },
  { id: 'al5', route: 'JFK - DPS', dates: 'Jul 28 - Aug 3', cabin: 'First', maxPoints: '150,000', clientId: 'c9', status: 'Paused', lastCheck: '2d ago', triggered: 2, program: 'Singapore KrisFlyer' },
];

// ---- Helper functions ----
function getClient(id) { return CLIENTS.find(c => c.id === id); }
function getAgent(id) { return AGENTS.find(a => a.id === id); }
function getTrip(id) { return TRIPS.find(t => t.id === id); }
function getHousehold(id) { return HOUSEHOLDS.find(h => h.id === id); }
function getClientsByHousehold(householdId) { return CLIENTS.filter(c => c.householdId === householdId); }
function getTripsByHousehold(householdId) { return TRIPS.filter(t => t.householdId === householdId); }
function getConversationsByHousehold(householdId) { return CONVERSATIONS.filter(c => c.householdId === householdId); }
function getComponentsByTrip(tripId) { return COMPONENTS.filter(c => c.tripId === tripId); }
function getBookingsByTrip(tripId) { return getComponentsByTrip(tripId); } // backward-compat alias
function getComponentsByOptionGroup(tripId, groupName) { return COMPONENTS.filter(c => c.tripId === tripId && c.optionGroup === groupName); }
function getComponentsNeedingAttention(tripId) {
  return COMPONENTS.filter(c => c.tripId === tripId && (
    c.clientDecision === 'Declined' || c.clientDecision === 'Needs Changes' ||
    (c.comments && c.comments.some(cmt => cmt.commentType === 'client' && !cmt.reviewStatus))
  ));
}
function getComponentStats(tripId) {
  const comps = getComponentsByTrip(tripId);
  return {
    total: comps.length,
    confirmed: comps.filter(c => c.clientFacingStatus === 'Confirmed').length,
    booked: comps.filter(c => c.clientFacingStatus === 'Booked').length,
    approved: comps.filter(c => c.clientDecision === 'Approved').length,
    needsAttention: getComponentsNeedingAttention(tripId).length,
    unreviewed: comps.reduce((n, c) => n + (c.comments || []).filter(cmt => cmt.commentType === 'client' && !cmt.reviewStatus).length, 0),
  };
}
function getTasksByTrip(tripId) { return TASKS.filter(t => t.tripId === tripId); }
function getTasksByHousehold(householdId) { return TASKS.filter(t => t.householdId === householdId); }
function getTripsByStage(stage) { return TRIPS.filter(t => t.stage === stage); }
function getHouseholdByClient(clientId) { const c = getClient(clientId); return c ? getHousehold(c.householdId) : null; }

// Agent + thread helpers
function getConversationAgents(convId) {
  const conv = CONVERSATIONS.find(c => c.id === convId);
  if (!conv) return [];
  const agents = [];
  if (conv.assignedTo) agents.push(getAgent(conv.assignedTo));
  (conv.collaborators || []).forEach(id => { const a = getAgent(id); if (a) agents.push(a); });
  return agents;
}
function getUnassignedConversations() { return CONVERSATIONS.filter(c => !c.assignedTo); }
function getConversationsByAgent(agentId) {
  return CONVERSATIONS.filter(c => c.assignedTo === agentId || (c.collaborators || []).includes(agentId));
}
function getConversationsByThreadType(type) { return CONVERSATIONS.filter(c => c.threadType === type); }
function getGeneralThread(householdId) { return CONVERSATIONS.find(c => c.householdId === householdId && c.threadType === 'general'); }
function getTripThreads(householdId) { return CONVERSATIONS.filter(c => c.householdId === householdId && c.threadType === 'trip'); }
function getPipelineStage(stageId) { return PIPELINE_STAGES.find(s => s.id === stageId); }

// Backward-compatible aliases (use household lookups behind the scenes)
function getTripsByClient(clientId) { const c = getClient(clientId); return c ? getTripsByHousehold(c.householdId) : []; }
function getConversationsByClient(clientId) { const c = getClient(clientId); return c ? getConversationsByHousehold(c.householdId) : []; }

// ---- Stats ----
function getDashboardStats() {
  return {
    totalClients: CLIENTS.length,
    totalHouseholds: HOUSEHOLDS.length,
    activeTrips: TRIPS.filter(t => !['completed','archived'].includes(t.stage)).length,
    openConversations: CONVERSATIONS.filter(c => c.status === 'open').length,
    slaBreached: CONVERSATIONS.filter(c => c.slaStatus === 'breached').length,
    slaWarning: CONVERSATIONS.filter(c => c.slaStatus === 'warning').length,
    slaCritical: CONVERSATIONS.filter(c => c.slaStatus === 'critical').length,
    slaHealthy: CONVERSATIONS.filter(c => c.slaStatus === 'healthy').length,
    openTasks: TASKS.filter(t => t.status !== 'Done').length,
    urgentTasks: TASKS.filter(t => t.priority === 'Urgent').length,
    activeAlerts: ALERTS.filter(a => a.status === 'Active').length,
    triggeredAlerts: ALERTS.filter(a => a.status === 'Triggered').length,
    unassignedConversations: CONVERSATIONS.filter(c => !c.assignedTo).length,
  };
}

function getInboxStats() {
  const open = CONVERSATIONS.filter(c => c.status === 'open').length;
  const unread = CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0);
  const breached = CONVERSATIONS.filter(c => c.slaStatus === 'breached').length;
  const warning = CONVERSATIONS.filter(c => c.slaStatus === 'warning' || c.slaStatus === 'critical').length;
  return { open, unread, breached, warning };
}

function getTaskStats() {
  const open = TASKS.filter(t => t.status !== 'Done').length;
  const urgent = TASKS.filter(t => t.priority === 'Urgent').length;
  const blocked = TASKS.filter(t => t.status === 'Blocked').length;
  const overdue = TASKS.filter(t => t.dueIn && t.dueIn.includes('overdue')).length;
  const myTasks = TASKS.filter(t => t.assignedTo === 'a1').length; // Default to Angua
  return { open, urgent, blocked, overdue, myTasks };
}

// ============================================================
// AI CHAT THREADS
// ============================================================

const AI_THREADS = [
  {
    id: 'ait1',
    title: 'Research anniversary dinner venues in Paris',
    agentId: 'a1',
    contextType: 'trip',
    tripId: 'tr2',
    householdId: 'h2',
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'completed',
    starred: false,
    messageCount: 6,
    createdAt: '2026-04-01T09:15:00Z',
    updatedAt: '2026-04-01T09:42:00Z'
  },
  {
    id: 'ait2',
    title: 'Compare Santorini hotel alternatives',
    agentId: 'a1',
    contextType: 'trip',
    tripId: 'tr1',
    householdId: 'h1',
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'active',
    starred: true,
    messageCount: 8,
    createdAt: '2026-04-02T14:08:00Z',
    updatedAt: '2026-04-03T08:55:00Z'
  },
  {
    id: 'ait3',
    title: 'Maldives villa upgrade negotiation strategy',
    agentId: 'a2',
    contextType: 'trip',
    tripId: 'tr3',
    householdId: 'h3',
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'completed',
    starred: false,
    messageCount: 5,
    createdAt: '2026-03-30T11:20:00Z',
    updatedAt: '2026-03-30T11:54:00Z'
  },
  {
    id: 'ait4',
    title: 'SLA breach triage and priority analysis',
    agentId: 'a1',
    contextType: 'global',
    tripId: null,
    householdId: null,
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'completed',
    starred: false,
    messageCount: 4,
    createdAt: '2026-03-29T10:05:00Z',
    updatedAt: '2026-03-29T10:28:00Z'
  },
  {
    id: 'ait5',
    title: 'Amex points transfer strategy for Vimes',
    agentId: 'a1',
    contextType: 'conversation',
    tripId: null,
    householdId: 'h1',
    clientId: null,
    conversationId: 'conv9',
    taskId: null,
    status: 'active',
    starred: false,
    messageCount: 6,
    createdAt: '2026-04-02T08:30:00Z',
    updatedAt: '2026-04-03T09:10:00Z'
  },
  {
    id: 'ait6',
    title: 'Family-friendly Panama activities research',
    agentId: 'a2',
    contextType: 'trip',
    tripId: 'tr4',
    householdId: 'h4',
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'completed',
    starred: true,
    messageCount: 5,
    createdAt: '2026-03-28T13:45:00Z',
    updatedAt: '2026-03-28T14:12:00Z'
  },
  {
    id: 'ait7',
    title: 'Japan cherry blossom ryokan comparison',
    agentId: 'a4',
    contextType: 'trip',
    tripId: 'tr7',
    householdId: 'h3',
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'active',
    starred: false,
    messageCount: 6,
    createdAt: '2026-04-03T07:50:00Z',
    updatedAt: '2026-04-03T08:25:00Z'
  },
  {
    id: 'ait8',
    title: 'End-of-day summary Mar 29',
    agentId: 'a1',
    contextType: 'global',
    tripId: null,
    householdId: null,
    clientId: null,
    conversationId: null,
    taskId: null,
    status: 'completed',
    starred: false,
    messageCount: 4,
    createdAt: '2026-03-29T17:00:00Z',
    updatedAt: '2026-03-29T17:18:00Z'
  }
];

const AI_THREAD_MESSAGES = {
  ait1: [
    {
      id: 'aim1-1',
      role: 'user',
      contentType: 'text',
      text: 'I need to find a great anniversary dinner spot for the Ridcullys in Paris. They\'re staying near the Eiffel Tower area. Any recommendations?',
      timestamp: '2026-04-01T09:15:00Z',
      cards: null
    },
    {
      id: 'aim1-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Happy to help with that. A few quick questions to narrow it down: What\'s the budget per person, and do they have a preferred cuisine style? Also, is this a lunch or dinner reservation, and do they have a date in mind so I can check availability?',
      timestamp: '2026-04-01T09:16:00Z',
      cards: null
    },
    {
      id: 'aim1-3',
      role: 'user',
      contentType: 'text',
      text: 'Dinner. French cuisine, classic but elevated. Budget is around $300-500 per person. Their anniversary is May 14th so availability around that date.',
      timestamp: '2026-04-01T09:19:00Z',
      cards: null
    },
    {
      id: 'aim1-4',
      role: 'assistant',
      contentType: 'results',
      text: 'Here are three top picks for a classic French anniversary dinner in the 7th/8th arrondissement. All three hold Michelin stars and are known for exceptional anniversary experiences.',
      timestamp: '2026-04-01T09:21:00Z',
      cards: [
        {
          name: 'Le Jules Verne',
          description: 'Michelin-starred restaurant inside the Eiffel Tower, second floor. Iconic setting with sweeping views of Paris. Chef Frederic Anton oversees the kitchen. Exceptional for milestone anniversaries.',
          price: '$380-450pp',
          rating: '4.8/5',
          status: 'Bookable'
        },
        {
          name: 'L\'Ambroisie',
          description: 'Three Michelin stars, Place des Vosges. One of Paris\'s most revered dining rooms — intimate, hushed, impeccably formal. Bernard Pacaud\'s cooking is timeless French haute cuisine. Very hard to book.',
          price: '$420-500pp',
          rating: '4.9/5',
          status: 'Limited availability'
        },
        {
          name: 'Le Cinq — Four Seasons George V',
          description: 'Three Michelin stars in the George V\'s grand dining room. Chef Christian Le Squer. Lavish Belle Epoque setting, world-class wine cellar. Popular anniversary choice with white-glove service.',
          price: '$350-440pp',
          rating: '4.8/5',
          status: 'Bookable'
        }
      ]
    },
    {
      id: 'aim1-5',
      role: 'user',
      contentType: 'text',
      text: 'The Jules Verne looks perfect for the occasion. Can you check if they can do a reservation for 2 on May 14th around 8pm?',
      timestamp: '2026-04-01T09:35:00Z',
      cards: null
    },
    {
      id: 'aim1-6',
      role: 'assistant',
      contentType: 'text',
      text: 'Le Jules Verne shows availability for 2 guests on May 14th at 20:00 and 20:30. The restaurant\'s concierge team recommends booking directly through their site or via a luxury travel agent line — they do hold tables for trade partners. I\'d suggest noting the anniversary in the booking notes, they\'ll typically arrange a small surprise. Want me to draft the reservation request?',
      timestamp: '2026-04-01T09:42:00Z',
      cards: null
    }
  ],

  ait2: [
    {
      id: 'aim2-1',
      role: 'user',
      contentType: 'text',
      text: 'The Vimes trip to Santorini — Samuel flagged that Canaves Oia is fully booked for their dates. I need alternatives that are in a similar tier. What are my options?',
      timestamp: '2026-04-02T14:08:00Z',
      cards: null
    },
    {
      id: 'aim2-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Noted. Before I pull alternatives, a couple of questions: What\'s the priority for Samuel and Sybil — infinity pool, caldera/sunset view, spa, or a combination? And are they flexible on the location within Santorini, or specifically set on the Oia area?',
      timestamp: '2026-04-02T14:09:00Z',
      cards: null
    },
    {
      id: 'aim2-3',
      role: 'user',
      contentType: 'text',
      text: 'Sunset view is non-negotiable. Pool is important too. They\'re open to anywhere on the caldera rim — not locked to Oia specifically.',
      timestamp: '2026-04-02T14:12:00Z',
      cards: null
    },
    {
      id: 'aim2-4',
      role: 'assistant',
      contentType: 'results',
      text: 'All three options below are caldera-facing with private or semi-private pools and strong sunset positioning. These are the closest match to Canaves Oia\'s profile.',
      timestamp: '2026-04-02T14:14:00Z',
      cards: [
        {
          name: 'Grace Hotel Santorini',
          description: 'Perched on the caldera rim in Imerovigli, arguably the best sunset vantage point on the island. Infinity pool, Michelin-recognized restaurant, and cave suite rooms. Adults-only, intimate scale.',
          price: 'From $1,100/night',
          rating: '4.8/5',
          status: 'Check availability'
        },
        {
          name: 'Mystique — Autograph Collection',
          description: 'Carved into the volcanic cliff in Oia with direct caldera views. Iconic cave suites with private plunge pools. Raw, dramatic aesthetic. One of Marriott\'s flagship luxury properties in Greece.',
          price: 'From $950/night',
          rating: '4.7/5',
          status: 'Check availability'
        },
        {
          name: 'Andronis Luxury Suites',
          description: 'Cave-style boutique in Oia with panoramic caldera pool and award-winning Lauda restaurant. Very quiet and exclusive — only 18 suites. Strong choice for a couple seeking privacy.',
          price: 'From $1,050/night',
          rating: '4.9/5',
          status: 'Limited availability'
        }
      ]
    },
    {
      id: 'aim2-5',
      role: 'user',
      contentType: 'text',
      text: 'These all look strong. What\'s the price difference vs. Canaves Oia? Canaves was coming in around $1,200/night for the cave suite.',
      timestamp: '2026-04-02T14:22:00Z',
      cards: null
    },
    {
      id: 'aim2-6',
      role: 'assistant',
      contentType: 'text',
      text: 'Grace and Andronis are slightly below Canaves at peak season rates — roughly $1,100-1,150/night for comparable suite categories. Mystique runs $950-1,050 depending on the room tier but sits slightly behind on suite size. If matching the exact experience level is the priority, Grace or Andronis are the closer substitutes. Andronis has the edge on privacy; Grace wins on restaurant quality.',
      timestamp: '2026-04-02T14:26:00Z',
      cards: null
    },
    {
      id: 'aim2-7',
      role: 'user',
      contentType: 'text',
      text: 'Samuel\'s trip is June 18-25. Can you check Grace Hotel availability for those dates?',
      timestamp: '2026-04-03T08:48:00Z',
      cards: null
    },
    {
      id: 'aim2-8',
      role: 'assistant',
      contentType: 'text',
      text: 'Grace Hotel shows availability for June 18-25 (7 nights). The Caldera Junior Suite with private plunge pool is available at $1,140/night, totaling approximately $7,980 before taxes. They have a preferred partner contact — I can draft an inquiry with Vimes\'s profile details and request their trade rate. Should I go ahead?',
      timestamp: '2026-04-03T08:55:00Z',
      cards: null
    }
  ],

  ait3: [
    {
      id: 'aim3-1',
      role: 'user',
      contentType: 'text',
      text: 'The Vetinaris are booked into a beach villa at Soneva Fushi but they want to explore upgrading to a water villa. What\'s the best negotiation angle here?',
      timestamp: '2026-03-30T11:20:00Z',
      cards: null
    },
    {
      id: 'aim3-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Good timing to raise this — Soneva is generally flexible with repeat guests and partner-referred bookings. The strongest angles are: (1) loyalty status if the Vetinaris have stayed at any Soneva property before, (2) your agency\'s partner rate tier which may include a complimentary upgrade policy, and (3) low-season leverage if their dates fall outside peak Maldives season (typically mid-November to March is peak; April-May shoulders are more negotiable).',
      timestamp: '2026-03-30T11:24:00Z',
      cards: null
    },
    {
      id: 'aim3-3',
      role: 'user',
      contentType: 'text',
      text: 'They\'re traveling in late April so that works in our favour. What\'s the typical rate difference between a beach villa and a water villa at Soneva Fushi?',
      timestamp: '2026-03-30T11:35:00Z',
      cards: null
    },
    {
      id: 'aim3-4',
      role: 'assistant',
      contentType: 'text',
      text: 'For late April, Soneva Fushi beach villas typically run $2,200-2,800/night while water villas (overwater) are $3,400-4,200/night — roughly a $1,200-1,500/night premium. Given the shoulder timing and a multi-night stay (assuming 7+ nights), there\'s a real case for requesting a complimentary category upgrade or a reduced differential. The ask is legitimate and Soneva\'s reservations team is known to work with preferred partners on this.',
      timestamp: '2026-03-30T11:44:00Z',
      cards: null
    },
    {
      id: 'aim3-5',
      role: 'user',
      contentType: 'text',
      text: 'Let\'s go with that. Can you draft a polite upgrade request for me to send to their reservations team?',
      timestamp: '2026-03-30T11:50:00Z',
      cards: null
    }
  ],

  ait4: [
    {
      id: 'aim4-1',
      role: 'user',
      contentType: 'text',
      text: 'I just started my shift. What should I be prioritizing right now?',
      timestamp: '2026-03-29T10:05:00Z',
      cards: null
    },
    {
      id: 'aim4-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Based on current inbox state, here\'s what needs immediate attention:\n\n**SLA Breached (2):**\n• Ridcully thread (conv2) — Paris trip, unanswered 4h 22m. Client asked about flight upgrade options.\n• Ogg thread (conv4) — Panama trip, unanswered 3h 58m. Pending activity confirmation.\n\n**SLA Warning (1):**\n• Vetinari thread (conv3) — Maldives, 2h 10m since last response. Client shared villa preferences.\n\n**Recommended priority order:** Ridcully → Ogg → Vetinari. Ridcully has the longest breach and is a Standard tier client with an active booking decision pending.',
      timestamp: '2026-03-29T10:08:00Z',
      cards: null
    },
    {
      id: 'aim4-3',
      role: 'user',
      contentType: 'text',
      text: 'What exactly did Ridcully ask about? Give me a quick summary so I can respond.',
      timestamp: '2026-03-29T10:18:00Z',
      cards: null
    },
    {
      id: 'aim4-4',
      role: 'assistant',
      contentType: 'text',
      text: 'Juliana Ridcully asked whether it\'s worth paying to upgrade their outbound flight from United Polaris to Air France La Premiere for the Paris leg. She mentioned they have 210,000 Amex MR points and wants to know if transferring to Flying Blue to cover the upgrade makes sense vs. paying cash. The household profile shows she prefers aisle seating and fine dining — La Premiere would align well. I can draft a response with a brief points vs. cash breakdown if helpful.',
      timestamp: '2026-03-29T10:28:00Z',
      cards: null
    }
  ],

  ait5: [
    {
      id: 'aim5-1',
      role: 'user',
      contentType: 'text',
      text: 'Samuel Vimes is asking about the best way to use his Amex MR points for their upcoming trip. He has 320,000 MR and wants to maximise value on flights. What are the best transfer options right now?',
      timestamp: '2026-04-02T08:30:00Z',
      cards: null
    },
    {
      id: 'aim5-2',
      role: 'assistant',
      contentType: 'text',
      text: 'For maximising MR value on premium cabin flights, the top transfer partners right now are ANA Mileage Club, Singapore KrisFlyer, and Virgin Atlantic Flying Club. The sweet spot depends on the route. Where are Samuel and Sybil flying, and are they flexible on airlines or set on Delta One (which isn\'t a direct MR partner)?',
      timestamp: '2026-04-02T08:32:00Z',
      cards: null
    },
    {
      id: 'aim5-3',
      role: 'user',
      contentType: 'text',
      text: 'They\'re going to Athens via Europe. Open to airlines as long as it\'s business or first. Preferably non-stop from JFK if possible.',
      timestamp: '2026-04-02T08:38:00Z',
      cards: null
    },
    {
      id: 'aim5-4',
      role: 'assistant',
      contentType: 'text',
      text: 'For JFK-Athens in business/first, the strongest MR transfer plays are:\n\n• **ANA → Lufthansa First** via Star Alliance: JFK-MUC-ATH, ~88,000 ANA miles roundtrip per person in First. Outstanding value at ~2.8 cpp.\n• **Virgin Atlantic → ANA The Room** (if routed via Tokyo, complex but exceptional product): not practical for Athens routing.\n• **Singapore KrisFlyer → Lufthansa Business**: ~78,000 miles RT per person. More available awards than First.\n\nWith 320K MR, Samuel could cover 2 First Class roundtrips via ANA (176K points) with points remaining. There\'s also a current 30% transfer bonus to ANA running until April 15.',
      timestamp: '2026-04-02T08:44:00Z',
      cards: null
    },
    {
      id: 'aim5-5',
      role: 'user',
      contentType: 'text',
      text: 'Wait — there\'s a transfer bonus to ANA active right now? When does it end?',
      timestamp: '2026-04-02T08:50:00Z',
      cards: null
    },
    {
      id: 'aim5-6',
      role: 'assistant',
      contentType: 'text',
      text: 'Yes — Amex is running a 30% transfer bonus to ANA Mileage Club through April 15, 2026. This means 320,000 MR would transfer as 416,000 ANA miles. At the standard Lufthansa First redemption rate (~88,000 miles RT per person), that covers 4 roundtrip First Class tickets — well beyond what Samuel needs. I\'d strongly recommend acting before April 15 to capture the bonus. Want me to walk through the transfer and award booking steps?',
      timestamp: '2026-04-03T09:10:00Z',
      cards: null
    }
  ],

  ait6: [
    {
      id: 'aim6-1',
      role: 'user',
      contentType: 'text',
      text: 'The Oggs are heading to Panama City and Bocas del Toro. They have two kids. I need ideas for family-friendly activities that still feel premium — not too touristy.',
      timestamp: '2026-03-28T13:45:00Z',
      cards: null
    },
    {
      id: 'aim6-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Great trip. How old are the kids? It makes a big difference between what\'s engaging vs. just tolerated at 6 vs. 12.',
      timestamp: '2026-03-28T13:46:00Z',
      cards: null
    },
    {
      id: 'aim6-3',
      role: 'user',
      contentType: 'text',
      text: 'Ages 9 and 12. Both active, the older one is really into wildlife. Parents want experiences that feel exclusive, not tour bus stuff.',
      timestamp: '2026-03-28T13:49:00Z',
      cards: null
    },
    {
      id: 'aim6-4',
      role: 'assistant',
      contentType: 'results',
      text: 'Perfect ages for Panama. Here are three curated options — all can be arranged as private experiences to keep it exclusive.',
      timestamp: '2026-03-28T13:52:00Z',
      cards: [
        {
          name: 'Panama Canal — Private Expert Tour',
          description: 'Private guided tour of Miraflores Locks with a canal historian. Watch cargo ships transit live, access the observation deck, and visit the museum. Can be arranged outside peak crowd hours. The 12-year-old wildlife enthusiast will love the surrounding rainforest birds.',
          price: 'From $280 (private group)',
          rating: '4.7/5',
          status: 'Available'
        },
        {
          name: 'Zip-lining & Canopy Tour — Boquete Highlands',
          description: 'High-altitude zip-line through cloud forest canopy above Boquete — 14 platforms, coffee farm visit included. Both ages are well within the weight/height limits. Private booking available for just the four of them. 3-hour drive from Panama City but worth it for the landscape.',
          price: 'From $195/person',
          rating: '4.8/5',
          status: 'Available'
        },
        {
          name: 'Private Island Hopping — Bocas del Toro Archipelago',
          description: 'Private speedboat charter around the Bocas archipelago — snorkeling at Starfish Beach, dolphin watching in Dolphin Bay, lunch at a floating restaurant. Full day, tailored pace. Perfect for active families who don\'t want a group tour environment.',
          price: 'From $620 (private boat)',
          rating: '4.9/5',
          status: 'Available'
        }
      ]
    },
    {
      id: 'aim6-5',
      role: 'user',
      contentType: 'text',
      text: 'The island hopping and the canal tour are both going in. Can you add these as task notes on the Ogg trip so I remember to book them?',
      timestamp: '2026-03-28T14:12:00Z',
      cards: null
    }
  ],

  ait7: [
    {
      id: 'aim7-1',
      role: 'user',
      contentType: 'text',
      text: 'Working on the Vetinari Japan trip. They want to stay in a traditional ryokan in Kyoto during cherry blossom season. Can you compare the top options?',
      timestamp: '2026-04-03T07:50:00Z',
      cards: null
    },
    {
      id: 'aim7-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Cherry blossom season in Kyoto is late March to early April — extremely high demand. A couple of questions: How many guests, and what\'s the budget tier? Also, is the priority the onsen experience, location (central vs. garden setting), or a specific aesthetic?',
      timestamp: '2026-04-03T07:52:00Z',
      cards: null
    },
    {
      id: 'aim7-3',
      role: 'user',
      contentType: 'text',
      text: '2 adults. High-end, no real budget ceiling — the Vetinaris are VIP clients. They want authenticity but not at the expense of comfort. Private onsen would be ideal.',
      timestamp: '2026-04-03T07:56:00Z',
      cards: null
    },
    {
      id: 'aim7-4',
      role: 'assistant',
      contentType: 'results',
      text: 'These are the three most prestigious traditional ryokans in Kyoto. All three are registered as important cultural properties and offer private onsen.',
      timestamp: '2026-04-03T07:59:00Z',
      cards: [
        {
          name: 'Tawaraya',
          description: 'Founded 1716, the most revered ryokan in Japan. Extremely private — only 18 rooms. Every Japanese prime minister and foreign dignitary stays here. Garden kaiseki dinners, private onsen baths per room. Reservations require introduction in advance but Maestro\'s contacts can arrange.',
          price: 'From ¥120,000/night (~$790)',
          rating: '5.0/5',
          status: 'Very limited — inquire'
        },
        {
          name: 'Hiiragiya',
          description: 'Founded 1818, sits in the heart of central Kyoto near Nijo Castle. Blend of traditional and modern — the new wing offers larger rooms with private indoor/outdoor onsen. Known for its seasonal kaiseki cuisine and immaculate service.',
          price: 'From ¥95,000/night (~$625)',
          rating: '4.9/5',
          status: 'Available'
        },
        {
          name: 'Gora Kadan',
          description: 'Technically in Hakone rather than Kyoto — former Imperial villa, extraordinary onsen, forest setting. If the Vetinaris are open to splitting the trip (Kyoto + Hakone), this pairs beautifully and is easier to book for peak season.',
          price: 'From ¥88,000/night (~$580)',
          rating: '4.9/5',
          status: 'Available'
        }
      ]
    },
    {
      id: 'aim7-5',
      role: 'user',
      contentType: 'text',
      text: 'Tawaraya is the obvious choice for them. Is the private onsen in every room or just certain categories?',
      timestamp: '2026-04-03T08:18:00Z',
      cards: null
    },
    {
      id: 'aim7-6',
      role: 'assistant',
      contentType: 'text',
      text: 'At Tawaraya, the private in-room onsen (hinoki cypress bath with natural spring water) is available in their premium room categories — approximately 8 of the 18 rooms. The entry rooms have private baths but not onsen-fed water. For the Vetinaris, I\'d specify requesting a room with the private onsen feed when making the inquiry. It\'s worth noting that Tawaraya does not take direct bookings from individuals — reservations are typically handled through a connected travel agent or concierge service, which puts Maestro in a strong position to secure a room.',
      timestamp: '2026-04-03T08:25:00Z',
      cards: null
    }
  ],

  ait8: [
    {
      id: 'aim8-1',
      role: 'user',
      contentType: 'text',
      text: 'Give me my end of day summary.',
      timestamp: '2026-03-29T17:00:00Z',
      cards: null
    },
    {
      id: 'aim8-2',
      role: 'assistant',
      contentType: 'text',
      text: 'Here\'s your summary for March 29:\n\n**Conversations:** 8 handled today, 6 closed, 2 still open (Selachii — waiting on hotel confirmation; Sto Helit — pending client reply).\n\n**SLA:** 2 breaches earlier today — Ridcully and Ogg — both resolved within 45 minutes of shift start. No active breaches at EOD.\n\n**Bookings confirmed:** 3 — Vetinari Maldives villa deposit, Vimes flight itinerary locked, Ogg hotel in Panama City.\n\n**Tasks:** 5 active today, 3 completed. 2 still open: (1) Selachii — source Bali spa options; (2) Vimes — confirm Santorini hotel backup.',
      timestamp: '2026-03-29T17:06:00Z',
      cards: null
    },
    {
      id: 'aim8-3',
      role: 'user',
      contentType: 'text',
      text: 'What do I need to pick up tomorrow morning when I start?',
      timestamp: '2026-03-29T17:12:00Z',
      cards: null
    },
    {
      id: 'aim8-4',
      role: 'assistant',
      contentType: 'text',
      text: 'Priority items for tomorrow morning:\n\n1. **Selachii thread** — Bali spa shortlist is overdue. Client expects options by Monday EOD.\n2. **Vimes Santorini backup** — Canaves is fully booked for their dates, need an alternative confirmed and presented to Samuel.\n3. **Sto Helit** — no client reply yet on the Amalfi itinerary draft sent yesterday. If no response by 10am, send a gentle follow-up.\n4. **Ridcully flight upgrade** — Juliana asked about Air France La Premiere vs. points transfer. Brief analysis still outstanding.\n\nNothing else is time-critical overnight.',
      timestamp: '2026-03-29T17:18:00Z',
      cards: null
    }
  ]
};

// ---- AI Thread helpers ----
function getAIThread(id) { return AI_THREADS.find(t => t.id === id); }
function getAIThreadsByAgent(agentId) { return AI_THREADS.filter(t => t.agentId === agentId).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)); }
function getAIThreadsByTrip(tripId) { return AI_THREADS.filter(t => t.tripId === tripId).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)); }
function getAIThreadsByClient(clientId) {
  const client = getClient(clientId);
  return client ? getAIThreadsByHousehold(client.householdId) : [];
}
function getAIThreadsByHousehold(householdId) { return AI_THREADS.filter(t => t.householdId === householdId).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)); }
function getAIThreadsByContext(contextType) { return AI_THREADS.filter(t => t.contextType === contextType).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)); }
function getAIThreadMessages(threadId) { return AI_THREAD_MESSAGES[threadId] || []; }
function searchAIThreads(query, agentId) {
  const q = query.toLowerCase();
  return AI_THREADS.filter(t => {
    if (agentId && t.agentId !== agentId) return false;
    if (t.title.toLowerCase().includes(q)) return true;
    const msgs = getAIThreadMessages(t.id);
    return msgs.some(m => m.text.toLowerCase().includes(q));
  }).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

// ---- AI Thread localStorage persistence ----
const AI_STORAGE_KEYS = {
  threads: 'maestro-ai-threads',
  messages: 'maestro-ai-messages',
  activeThread: 'maestro-ai-active-thread'
};

function loadAIThreadsFromStorage() {
  try {
    const stored = localStorage.getItem(AI_STORAGE_KEYS.threads);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge: localStorage wins, add any new mock threads not in storage
      const storedIds = new Set(parsed.map(t => t.id));
      const newMocks = AI_THREADS.filter(t => !storedIds.has(t.id));
      AI_THREADS.length = 0;
      AI_THREADS.push(...parsed, ...newMocks);
    }
    const storedMsgs = localStorage.getItem(AI_STORAGE_KEYS.messages);
    if (storedMsgs) {
      const parsed = JSON.parse(storedMsgs);
      // Merge: localStorage wins for existing, keep mock for new
      Object.keys(parsed).forEach(k => { AI_THREAD_MESSAGES[k] = parsed[k]; });
    }
  } catch (e) { console.warn('Failed to load AI threads from storage:', e); }
}

function saveAIThreads() {
  try { localStorage.setItem(AI_STORAGE_KEYS.threads, JSON.stringify(AI_THREADS)); }
  catch (e) { console.warn('Failed to save AI threads:', e); }
}

function saveAIMessages() {
  try { localStorage.setItem(AI_STORAGE_KEYS.messages, JSON.stringify(AI_THREAD_MESSAGES)); }
  catch (e) { console.warn('Failed to save AI messages:', e); }
}

function saveActiveThreadId(threadId) {
  try { localStorage.setItem(AI_STORAGE_KEYS.activeThread, threadId || ''); }
  catch (e) { console.warn('Failed to save active thread:', e); }
}

function getActiveThreadId() {
  return localStorage.getItem(AI_STORAGE_KEYS.activeThread) || null;
}

// Boot: load from localStorage on page load
loadAIThreadsFromStorage();
